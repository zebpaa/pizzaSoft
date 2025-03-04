import type { RootState } from "../../../entities/index"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
	addEmployees,
	selectFilteredAndSortedEmployees,
} from "../../../entities/employeesSlice"
import { employees as mockEmployees } from "../../../pages"

export const useEmployeesList = () => {
	const [isOpen, setIsOpen] = useState(false)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(addEmployees(mockEmployees))
	}, [dispatch])

	const employees = useSelector((state: RootState) =>
		selectFilteredAndSortedEmployees(state),
	)

	return {
		isOpen,
		setIsOpen,
		employees,
	}
}
