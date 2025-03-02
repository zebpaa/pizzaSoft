import type { Employee } from ".."

import { useSelector } from "react-redux"
import { useParams } from "react-router"

import { selectors } from "../../entities/employeesSlice"
import { Changer } from "../../widgets"
import cls from "./EmployeeInfo.module.scss"

const EmployeeInfo: React.FC = () => {
	const { id } = useParams()

	const employees: Employee[] = useSelector(selectors.selectAll)
	const employee = employees.find((e) => e.id === Number(id))

	if (!employee) {
		return <div>Loading...</div>
	}

	return (
		<div className={cls.container}>
			<div className={cls.container__content}>
				<div className={cls.container__employeeInfo}>
					<h1 className={cls.container__heading}>{employee.name}</h1>
					<Changer employee={employee} />
				</div>
			</div>
		</div>
	)
}

export default EmployeeInfo
