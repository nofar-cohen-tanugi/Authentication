import { configureStore } from '@reduxjs/toolkit';
import { loginApi } from './login/loginApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './auth/authSlice'
import { projectApi } from './project/projectApi';

export const store = configureStore({
    reducer: {
        [loginApi.reducerPath]: loginApi.reducer,
        [projectApi.reducerPath]: projectApi.reducer,
        authSlice: authReducer

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [loginApi.util.resetApiState.type], // Ignore reset actions
                ignoredPaths: [loginApi.reducerPath], // Ignore the API slice's path
            },
        }).concat([
            projectApi.middleware
            // loginApi.middleware,
        ]),
});

// Setup listeners to automatically poll and refetch data
setupListeners(store.dispatch);


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch