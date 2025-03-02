import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { addEmployees, selectors } from "../../../entities/employeesSlice"
import { employees as mockEmployees } from "../../../pages"

export const useEmployeesList = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [activeTab, setActiveTab] = useState("all") // "archive"
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(addEmployees(mockEmployees))
	}, [dispatch])

	const employees = useSelector(selectors.selectAll)

	return {
		isOpen,
		setIsOpen,
		activeTab,
		setActiveTab,
		employees,
	}
}
