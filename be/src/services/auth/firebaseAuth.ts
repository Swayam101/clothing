import { verifyFirebaseToken } from '../../config/firebase';
import { generateToken } from './generateToken';
import { findUserByFirebaseUid, findUserByEmail, createUser } from '../../dao/userDao';
import { IUserDocument } from '../../models/User';

interface FirebaseAuthResult {
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
    profilePicture?: string;
    role: string;
    createdAt: Date;
  };
  isNewUser: boolean;
}

interface FirebaseUserData {
  displayName?: string;
  photoURL?: string;
}

/**
 * Authenticate user with Firebase ID token
 * Handles Google and Facebook sign-in through Firebase
 * 
 * @param idToken - Firebase ID token from client
 * @param userData - Optional additional user data from Firebase
 * @returns Authentication result with JWT token and user info
 */
export const authenticateWithFirebase = async (
  idToken: string,
  userData?: FirebaseUserData
): Promise<FirebaseAuthResult> => {
  // 1️⃣ Verify Firebase ID token
  const decodedToken = await verifyFirebaseToken(idToken);

  const {
    uid: firebaseUid,
    email,
    email_verified: emailVerified,
    firebase: { sign_in_provider: provider },
    name,
    picture,
  } = decodedToken;

  if (!email) {
    throw new Error('Email not provided by authentication provider');
  }

  let user: IUserDocument | null;
  let isNewUser = false;

  // 2️⃣ Check if user exists with this Firebase UID
  user = await findUserByFirebaseUid(firebaseUid);

  if (!user) {
    // 3️⃣ Check if user exists with same email (for account linking)
    user = await findUserByEmail(email);

    if (user) {
      // 4️⃣ Link Firebase UID to existing user
      user.firebaseUid = firebaseUid;
      user.provider = provider as 'google.com' | 'facebook';
      
      // Update profile info if provided
      if (userData?.displayName && !user.name) {
        user.name = userData.displayName;
      }
      if (userData?.photoURL && !user.profilePicture) {
        user.profilePicture = userData.photoURL;
      }
      
      await user.save();
    } else {
      // 5️⃣ Create new user
      isNewUser = true;
      
      user = await createUser({
        firebaseUid,
        email,
        name: userData?.displayName || name || undefined,
        profilePicture: userData?.photoURL || picture || undefined,
        provider: provider as 'google.com' | 'facebook',
        role: 'user',
        isActive: true,
      });
    }
  } else {
    // 6️⃣ Update existing user's profile if new data is provided
    let updated = false;
    
    if (userData?.displayName && !user.name) {
      user.name = userData.displayName;
      updated = true;
    }
    if (userData?.photoURL && !user.profilePicture) {
      user.profilePicture = userData.photoURL;
      updated = true;
    }
    
    if (updated) {
      await user.save();
    }
  }

  // 7️⃣ Generate our own JWT token
  const token = generateToken(user);

  return {
    token,
    user: {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      profilePicture: user.profilePicture,
      role: user.role,
      createdAt: user.createdAt,
    },
    isNewUser,
  };
};

