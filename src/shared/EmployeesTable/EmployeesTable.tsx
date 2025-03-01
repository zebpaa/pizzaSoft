import type { Employee } from "../../pages"

import { useEmployeesTable } from "./hook/useEmployeesTable"
import cls from "./EmployeesTable.module.scss"

interface DealsTableProps {
	employees: Employee[]
	activeTab: string
}

const EmployeesTable = ({ employees, activeTab }: DealsTableProps) => {
	const { handleClick, roleMap } = useEmployeesTable()

	return (
		<>
			{" "}
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
					<span >No employees</span>
				</div>
			)}
			{/* {employees && (
				<>
					<ul>
						<li
							className={cls.item}
							style={{ fontWeight: "bold" }}
							// onClick={handleClick(employee)}
						>
							<span className={cls.name}>Имя</span>
							<span className={cls.role}>Должность</span>
							<span className={cls.phone}>Телефон</span>
						</li>
						{employees.length > 0 ? (
							employees.map((employee) => (
								<li
									key={employee.id}
									className={cls.item}
									onClick={handleClick(employee)}
								>
									<span className={cls.name}>{employee.name}</span>
									<span className={cls.role}>{roleMap[employee.role]}</span>
									<span className={cls.phone}>{employee.phone}</span>
								</li>
							))
						) : (
							<div className={cls.item}>
								<span style={{ textAlign: "center" }}>No employees</span>
							</div>
						)}
					</ul>
				</>
			)} */}
		</>
	)
}

export default EmployeesTable
