import type { RootState } from "."
import type { Employee } from "../pages"

import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"

const employeesAdapter = createEntityAdapter<Employee>()

const initialState = employeesAdapter.getInitialState()

const employeesSlice = createSlice({
	name: "employees",
	initialState,
	reducers: {
		addEmployee: employeesAdapter.addOne,
		addEmployees: employeesAdapter.addMany,
		updateEmployee: (state, { payload }) =>
			employeesAdapter.updateOne(state, {
				id: payload.id,
				changes: payload.changes,
			}),
	},
})

export const { addEmployee, addEmployees, updateEmployee } =
	employeesSlice.actions

export const selectors = employeesAdapter.getSelectors(
	(state: RootState) => state.employees,
)

export default employeesSlice.reducer
