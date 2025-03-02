import { combineReducers, configureStore } from "@reduxjs/toolkit"
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	PURGE,
	REGISTER,
	REHYDRATE,
} from "redux-persist"
import storage from "redux-persist/lib/storage"

import employeesSlice from "./employeesSlice"

const reducers = combineReducers({
	employees: employeesSlice,
})

const persistConfig = {
	key: "root",
	version: 1,
	storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
})

export type RootState = ReturnType<typeof store.getState>

export default store
