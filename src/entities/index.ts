import { configureStore } from "@reduxjs/toolkit"

import commentsSlice from "./commentsSlice"
import dealsSlice from "./dealsSlice"

const store = configureStore({
	reducer: {
		deals: dealsSlice,
		comments: commentsSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>

export default store
