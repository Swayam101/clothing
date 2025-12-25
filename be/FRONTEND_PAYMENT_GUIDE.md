# 💳 Frontend Payment Integration Guide

## Simple Payment Flow in 5 Steps

---

## 🎯 **Overview**

```
Step 1: Load Cashfree SDK
   ↓
Step 2: User selects products & enters delivery details
   ↓
Step 3: Create order via backend API
   ↓
Step 4: Initialize Cashfree checkout
   ↓
Step 5: Verify payment status
```

---

## 📦 **Step 1: Load Cashfree SDK**

Add the Cashfree SDK to your HTML:

```html
<script src="https://sdk.cashfree.com/js/v3/cashfree.js"></script>
```

**Or load dynamically:**

```javascript
const loadCashfreeSDK = () => {
  return new Promise((resolve, reject) => {
    if (window.Cashfree) {
      resolve(window.Cashfree);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
    script.onload = () => resolve(window.Cashfree);
    script.onerror = reject;
    document.head.appendChild(script);
  });
};
```

---

## 🛒 **Step 2: Prepare Cart Data**

Collect the required information:

```javascript
// Your cart (just product IDs)
const cartItems = [
  '60d5ec49f1b2c72b8c8e4a1b',
  '60d5ec49f1b2c72b8c8e4a1c'
];

// Delivery details from form
const deliveryAddress = {
  street: '123 Main Street, Apt 4B',
  city: 'Mumbai',           // Required
  state: 'Maharashtra',
  zipCode: '400001',
  country: 'India'          // Required
};

const phone = '9876543210';
```

---

## 📤 **Step 3: Create Order**

Call your backend to create the order:

```javascript
const createOrder = async (productIds, deliveryAddress, phone) => {
  try {
    // Get Firebase auth token
    const user = firebase.auth().currentUser;
    if (!user) {
      throw new Error('Please login to continue');
    }
    
    const token = await user.getIdToken();

    // Call backend API
    const response = await fetch('http://localhost:4000/api/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: productIds,        // Just product IDs!
        deliveryAddress,
        phone
      })
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Failed to create order');
    }

    return result.data;
  } catch (error) {
    console.error('Order creation error:', error);
    throw error;
  }
};
```

### ✅ Backend Response:

```javascript
{
  success: true,
  data: {
    orderId: "ORD1766661579316ODMY4IF",  // ← Your internal order ID (use this!)
    totalAmount: 2998,
    items: [...],
    paymentSession: {
      payment_session_id: "session_abc123xyz",
      order_id: "ORD_1766661579623_3A3MHV8HZ"  // Cashfree's order ID
    }
  }
}
```

---

## 💳 **Step 4: Start Cashfree Payment**

Use the `payment_session_id` to initialize checkout:

```javascript
const startPayment = async (orderData) => {
  try {
    // Load Cashfree SDK
    const Cashfree = await loadCashfreeSDK();

    // Initialize Cashfree
    const cashfree = Cashfree({
      mode: "sandbox" // Use "production" for live
    });

    // Start checkout
    cashfree.checkout({
      paymentSessionId: orderData.paymentSession.payment_session_id,
      returnUrl: `${window.location.origin}/payment-success?order_id=${orderData.orderId}`,
      // ☝️ IMPORTANT: Use YOUR internal orderId, not Cashfree's order_id
    }).then((result) => {
      if (result.error) {
        console.error('Payment error:', result.error);
        alert('Payment failed. Please try again.');
      }
    });

  } catch (error) {
    console.error('Payment initialization error:', error);
    alert('Failed to start payment. Please try again.');
  }
};
```

---

## ✅ **Step 5: Verify Payment**

Create a payment success page:

```javascript
// On payment success page
const verifyPayment = async () => {
  try {
    // Get YOUR internal order ID from URL (not Cashfree's!)
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('order_id');

    if (!orderId) {
      throw new Error('No order ID found');
    }

    // Show loading
    showLoading('Verifying payment...');

    // Get Firebase token
    const token = await firebase.auth().currentUser.getIdToken();
    
    // Verify with YOUR internal order ID
    const response = await fetch(`http://localhost:4000/api/orders/verify/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const result = await response.json();

    // Check payment status
    if (result.data.order_status === 'PAID') {
      showSuccess('✅ Payment successful! Your order is confirmed.');
      setTimeout(() => {
        window.location.href = `/orders/${orderId}`;
      }, 2000);
    } else if (result.data.order_status === 'ACTIVE') {
      showWarning('⏳ Payment is being processed...');
      // Retry verification after 3 seconds
      setTimeout(verifyPayment, 3000);
    } else {
      showError('❌ Payment failed. Please try again.');
    }

  } catch (error) {
    console.error('Verification error:', error);
    showError('Failed to verify payment.');
  }
};

// Call when page loads
window.addEventListener('load', verifyPayment);
```

---

## 🎨 **Complete React Example**

```jsx
import { useState } from 'react';
import { getAuth } from 'firebase/auth';

function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [cart] = useState([
    { _id: '60d5ec49f1b2c72b8c8e4a1b', name: 'Blue T-Shirt', price: 999 },
    { _id: '60d5ec49f1b2c72b8c8e4a1c', name: 'Black Jeans', price: 1999 }
  ]);
  
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  });
  
  const [phone, setPhone] = useState('');

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Get Firebase token
      const auth = getAuth();
      const user = auth.currentUser;
      
      if (!user) {
        alert('Please login to continue');
        return;
      }

      const token = await user.getIdToken();

      // 2. Create order
      const response = await fetch('http://localhost:4000/api/orders', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          items: cart.map(item => item._id),
          deliveryAddress,
          phone
        })
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error);
      }

      // 3. Load Cashfree SDK
      const Cashfree = await loadCashfreeSDK();
      const cashfree = Cashfree({ mode: "sandbox" });

      // 4. Start payment with YOUR internal orderId
      cashfree.checkout({
        paymentSessionId: result.data.paymentSession.payment_session_id,
        returnUrl: `${window.location.origin}/payment-success?order_id=${result.data.orderId}`
        // ☝️ Use YOUR orderId, not Cashfree's!
      });

    } catch (error) {
      console.error('Checkout error:', error);
      alert(error.message || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleCheckout}>
      {/* Cart Summary */}
      <div className="cart-summary">
        <h2>Your Cart</h2>
        {cart.map(item => (
          <div key={item._id} className="cart-item">
            <span>{item.name}</span>
            <span>₹{item.price}</span>
          </div>
        ))}
        <div className="total">
          <strong>Total: ₹{cart.reduce((sum, item) => sum + item.price, 0)}</strong>
        </div>
      </div>

      {/* Delivery Form */}
      <div className="delivery-form">
        <h2>Delivery Details</h2>
        
        <input
          type="text"
          placeholder="Street Address"
          value={deliveryAddress.street}
          onChange={(e) => setDeliveryAddress({...deliveryAddress, street: e.target.value})}
          required
        />
        
        <input
          type="text"
          placeholder="City"
          value={deliveryAddress.city}
          onChange={(e) => setDeliveryAddress({...deliveryAddress, city: e.target.value})}
          required
        />
        
        <input
          type="text"
          placeholder="State"
          value={deliveryAddress.state}
          onChange={(e) => setDeliveryAddress({...deliveryAddress, state: e.target.value})}
          required
        />
        
        <input
          type="text"
          placeholder="Pin Code (6 digits)"
          value={deliveryAddress.zipCode}
          onChange={(e) => setDeliveryAddress({...deliveryAddress, zipCode: e.target.value})}
          pattern="[0-9]{6}"
          required
        />
        
        <input
          type="tel"
          placeholder="Phone (10 digits)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          pattern="[0-9]{10}"
          required
        />
      </div>

      {/* Checkout Button */}
      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Proceed to Payment'}
      </button>
    </form>
  );
}

// Helper to load SDK
const loadCashfreeSDK = () => {
  return new Promise((resolve, reject) => {
    if (window.Cashfree) {
      resolve(window.Cashfree);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
    script.onload = () => resolve(window.Cashfree);
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

export default CheckoutPage;
```

---

## 🎯 **Payment Success Page (React)**

```jsx
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('Verifying your payment...');

  useEffect(() => {
    verifyPayment();
  }, []);

  const verifyPayment = async () => {
    try {
      // Get YOUR internal order ID from URL
      const orderId = searchParams.get('order_id');
      
      if (!orderId) {
        setStatus('error');
        setMessage('No order ID found');
        return;
      }

      // Get Firebase token
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken();

      // Verify payment
      const response = await fetch(`http://localhost:4000/api/orders/verify/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();

      if (result.success) {
        if (result.data.order_status === 'PAID') {
          setStatus('success');
          setMessage('✅ Payment successful! Your order is confirmed.');
          setTimeout(() => {
            window.location.href = `/orders/${orderId}`;
          }, 2000);
        } else if (result.data.order_status === 'ACTIVE') {
          setStatus('processing');
          setMessage('⏳ Payment is being processed...');
          setTimeout(verifyPayment, 3000); // Retry after 3 seconds
        } else {
          setStatus('failed');
          setMessage('❌ Payment failed. Please try again.');
        }
      } else {
        setStatus('error');
        setMessage(result.error || 'Failed to verify payment');
      }

    } catch (error) {
      console.error('Verification error:', error);
      setStatus('error');
      setMessage('Failed to verify payment. Please contact support.');
    }
  };

  return (
    <div className="payment-status">
      <div className={`status-icon ${status}`}>
        {status === 'success' && '✅'}
        {status === 'processing' && '⏳'}
        {status === 'failed' && '❌'}
        {status === 'verifying' && '🔄'}
        {status === 'error' && '⚠️'}
      </div>
      <h2>{message}</h2>
      {status === 'processing' && <p>Please wait while we confirm your payment...</p>}
    </div>
  );
}

export default PaymentSuccessPage;
```

---

## 🧪 **Testing with Sandbox**

### Test Cards:

| Card Number | CVV | Expiry | Result |
|------------|-----|--------|---------|
| 4111 1111 1111 1111 | 123 | Any future | Success |
| 4012 0010 3714 1112 | 123 | Any future | 3DS Success |
| 5555 5555 5555 4444 | 123 | Any future | Failed |

### Test UPI:
- **Success**: `success@upi`
- **Failure**: `failure@upi`

### Test OTP:
- Any 6 digits (e.g., `123456`)

---

## 🔑 **Key Points**

### ⚠️ **IMPORTANT: Two Order IDs**

Your system uses **TWO** order IDs:

1. **Your Internal Order ID**: `ORD1766661579316ODMY4IF`
   - Generated by your backend
   - Stored in your database as `orderId`
   - **Use this in URLs and frontend**

2. **Cashfree Order ID**: `ORD_1766661579623_3A3MHV8HZ`
   - Generated by Cashfree
   - Stored in your database as `cashfreeOrderId`
   - **Backend uses this to verify with Cashfree**

### ✅ **What to Use Where:**

```javascript
// ✅ CORRECT: Use YOUR internal orderId
returnUrl: `${origin}/payment-success?order_id=${orderData.orderId}`

// ❌ WRONG: Don't use Cashfree's order_id
returnUrl: `${origin}/payment-success?order_id=${orderData.paymentSession.order_id}`
```

### **Why This Matters:**

When you verify payment:
1. Frontend sends **YOUR internal orderId** 
2. Backend looks up the order in database
3. Backend gets the **Cashfree orderId** from database
4. Backend verifies with Cashfree using **their orderId**

---

## 🚨 **Common Issues**

### Issue 1: "Order not found" during verification
**Cause**: Using Cashfree's order_id instead of your internal orderId  
**Fix**: Always use `orderData.orderId` (not `paymentSession.order_id`)

### Issue 2: "Cashfree is not defined"
**Cause**: SDK not loaded before calling `Cashfree()`  
**Fix**: Use `loadCashfreeSDK()` helper function

### Issue 3: Payment session expired
**Cause**: Sessions expire after 30 minutes  
**Fix**: Create a new order if user waits too long

### Issue 4: CORS errors
**Cause**: Backend not configured for CORS  
**Fix**: Check backend CORS configuration

---

## 📱 **Mobile Considerations**

```javascript
// Detect mobile device
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Use appropriate return URL
const returnUrl = isMobile
  ? `${window.location.origin}/mobile-payment-success` 
  : `${window.location.origin}/payment-success`;
```

---

## 🎉 **Summary**

**Your complete flow:**

1. ✅ Load Cashfree SDK
2. ✅ User fills delivery form
3. ✅ Create order → Get `orderId` + `payment_session_id`
4. ✅ Call `Cashfree.checkout()` with `payment_session_id`
5. ✅ Use **YOUR orderId** in return URL
6. ✅ Verify payment with **YOUR orderId**
7. ✅ Backend handles Cashfree orderId automatically

**Simple! 🚀**

---

## 📚 **Related Files**

- Backend Order Creation: `src/services/orders/createOrder.ts`
- Payment Verification: `src/controllers/payments/verifyOrder.ts`
- Order Model: `src/models/Order.ts`
- Routes: `src/routes/orders.ts`

---

**Need help? Check the backend logs for detailed error messages!**

