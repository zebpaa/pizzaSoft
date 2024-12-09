import { configureStore } from "@reduxjs/toolkit"

import commentsSlice from "./commentsSlice"
import dealsSlice from "./dealsSlice"

const store = configureStore({
	reducer: {
		deals: dealsSlice,
		comments: commentsSlice,
	},
})

export default store
