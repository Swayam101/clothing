// Re-export from content files for backward compatibility
// All content is now managed in src/data/content/pages/home.ts
export { HOME_FEATURES as mainFeatures, HOME_BENEFITS } from './content/pages/home';

// Export benefits items for backward compatibility
import { HOME_BENEFITS } from './content/pages/home';
export const benefits = HOME_BENEFITS.items;

