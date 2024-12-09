import type { Deal } from "@pages/index"

import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"

const dealsAdapter = createEntityAdapter<Deal>()

const initialState = dealsAdapter.getInitialState()

const dealsSlice = createSlice({
	name: "deals",
	initialState,
	reducers: {
		addDeal: dealsAdapter.addOne,
		addDeals: dealsAdapter.addMany,
		updateDeal: (state, { payload }) =>
			dealsAdapter.updateOne(state, {
				id: payload.id,
				changes: payload.changes,
			}),
	},
})

export const { addDeal, addDeals, updateDeal } = dealsSlice.actions

export const selectors = dealsAdapter.getSelectors((state: any) => state.deals)

export default dealsSlice.reducer
