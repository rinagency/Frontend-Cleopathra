import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userAuthApi } from './services/UserAuthApi';
import { contactApi} from './services/ContactApi';
import { productApi } from './services/ProductsApi';
import authReducer from './features/authSlice';
import userReducer from './features/userSlice';

export const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    auth: authReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthApi.middleware, productApi.middleware, contactApi.middleware),
});

setupListeners(store.dispatch);
