import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist'
import productReducer from './features/productSlice';

const rootReducer = combineReducers({user: userReducer, item: productReducer})

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const persistedReducer = persistReducer( persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})


export const persistor = persistStore(store)