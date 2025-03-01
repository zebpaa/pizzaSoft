import type { Employee } from "../../../pages"

import { useNavigate } from "react-router"

export const useEmployeesTable = () => {
	type RoleMap = {
		driver: string
		waiter: string
		cook: string
	}

	const roleMap: RoleMap = {
		driver: "Водитель",
		waiter: "Официант",
		cook: "Повар",
	}

	const navigate = useNavigate()

	const handleClick = (employee: Employee) => () => {
		navigate(`/employee/${employee.id}`, { state: employee })
	}

	return {
		handleClick,
		roleMap,
	}
}
