import type { Comment } from "@pages/index"

import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"

const commentsAdapter = createEntityAdapter<Comment>()

const initialState = commentsAdapter.getInitialState()

const commentsSlice = createSlice({
	name: "comments",
	initialState,
	reducers: {
		addComment: commentsAdapter.addOne,
		addComments: commentsAdapter.addMany,
	},
})

export const { addComment, addComments } = commentsSlice.actions

export const selectors = commentsAdapter.getSelectors((state: any) => state.comments)

export default commentsSlice.reducer
