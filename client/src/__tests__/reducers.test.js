// Import actions
import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
} from '../utils/actions';

// Create sample global state
const initialState = {
    products: [],
    categories: [{ name: 'Food' }],
    currentCategory: '1',
};
