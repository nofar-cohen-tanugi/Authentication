import { configureStore } from '@reduxjs/toolkit';
import { loginApi } from './login/loginApi';
import authReducer from './auth/authSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { projectApi } from './project/projectApi';
import lazyParamsReducer from './lazyParams/lazyParamsSlice';

export const store = configureStore({
    reducer: {
        projectApi: projectApi.reducer,
        loginApi: loginApi.reducer,
        auth: authReducer,
        lazyParams: lazyParamsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(loginApi.middleware, projectApi.middleware),
});

// Setup listeners to automatically poll and refetch data
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
