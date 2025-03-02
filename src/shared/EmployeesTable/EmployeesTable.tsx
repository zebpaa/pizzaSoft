import type { Employee } from "../../pages"

import { useEmployeesTable } from "./hook/useEmployeesTable"
import cls from "./EmployeesTable.module.scss"

interface EmployeesTableProps {
	employees: Employee[]
	activeTab: string
}

const EmployeesTable = ({ employees, activeTab }: EmployeesTableProps) => {
	const { handleClick, roleMap } = useEmployeesTable()

	return (
		<>
			{employees.length > 0 ? (
				<table className={cls.content__tabList}>
					<thead>
						<tr>
							<th>Имя</th>
							<th>Должность</th>
							<th>Номер телефона</th>
						</tr>
					</thead>
					<tbody>
						{employees
							// .filter((d) => {
							// 	if (activeTab === "all") {
							// 		return !completedStatuses.includes(d.status)
							// 	}
							// 	return completedStatuses.includes(d.status)
							// })
							.map((employee) => (
								<tr key={employee.id} onClick={handleClick(employee)}>
									<td data-label="Имя">{employee.name}</td>
									<td data-label="Должность">{roleMap[employee.role]}</td>
									<td data-label="Номер телефона">{employee.phone}</td>
								</tr>
							))}
					</tbody>
				</table>
			) : (
				<div className={cls.item}>
					<span>No employees</span>
				</div>
			)}
		</>
	)
}

export default EmployeesTable
