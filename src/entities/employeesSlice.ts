import type { RootState } from "."
import type { Employee } from "../pages"
import type { PayloadAction } from "@reduxjs/toolkit"

import {
	createEntityAdapter,
	createSelector,
	createSlice,
} from "@reduxjs/toolkit"

const employeesAdapter = createEntityAdapter<Employee>()

const initialState = employeesAdapter.getInitialState({
	filters: {
		role: "all",
		isArchive: false,
	},
	sortBy: "name_asc",
})

const employeesSlice = createSlice({
	name: "employees",
	initialState,
	reducers: {
		addEmployee: employeesAdapter.addOne,
		addEmployees: employeesAdapter.addMany,
		updateEmployee: (
			state,
			{ payload }: PayloadAction<{ id: number; changes: Partial<Employee> }>,
		) =>
			employeesAdapter.updateOne(state, {
				id: payload.id,
				changes: payload.changes,
			}),
		setEmployees: employeesAdapter.setAll,
		setFilterRole(state, action: PayloadAction<string>) {
			state.filters.role = action.payload
		},
		setFilterArchive(state, action: PayloadAction<boolean>) {
			state.filters.isArchive = action.payload
		},
		setSort(state, action: PayloadAction<string>) {
			state.sortBy = action.payload
		},
	},
})

export const {
	addEmployee,
	addEmployees,
	updateEmployee,
	setEmployees,
	setFilterRole,
	setFilterArchive,
	setSort,
} = employeesSlice.actions

export const selectors = employeesAdapter.getSelectors(
	(state: RootState) => state.employees,
)

export const selectFilteredAndSortedEmployees = createSelector(
	[
		selectors.selectAll, // Все сотрудники из EntityAdapter
		(state: RootState) => state.employees.filters,
		(state: RootState) => state.employees.sortBy,
	],
	(employees, filters, sortBy) => {
		// Фильтрация
		const filtered = employees.filter((emp) => {
			const roleMatch = filters.role === "all" || emp.role === filters.role
			const archiveMatch = emp.isArchive === filters.isArchive
			return roleMatch && archiveMatch
		})

		// Сортировка
		return filtered.sort((a, b) => {
			const [sortField, sortDirection] = sortBy.split("_")

			if (sortField === "birthday") {
				const dateA = new Date(a.birthday.split(".").reverse().join("-"))
				const dateB = new Date(b.birthday.split(".").reverse().join("-"))
				return sortDirection === "asc"
					? dateA.getTime() - dateB.getTime()
					: dateB.getTime() - dateA.getTime()
			}

			return sortDirection === "asc"
				? a.name.localeCompare(b.name)
				: b.name.localeCompare(a.name)
		})
	},
)

export default employeesSlice.reducer
