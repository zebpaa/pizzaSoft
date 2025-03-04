import { AddEmployee } from "../../features"
import { Button, EmployeesTable } from "../../shared"
import { useEmployeesList } from "./hook/useEmployeesList"
import cls from "./EmployeesList.module.scss"

const EmployeesList: React.FC = () => {
	const { isOpen, setIsOpen, employees } = useEmployeesList()

	return (
		<>
			<AddEmployee isOpen={isOpen} onHide={setIsOpen} employees={employees} />
			<div className={cls.content}>
				<div className={cls.createButton} style={{ marginBottom: "20px" }}>
					<Button width="368" onClick={() => setIsOpen(true)}>
						Создать
					</Button>
				</div>

				<EmployeesTable employees={employees} />
			</div>
		</>
	)
}

export default EmployeesList
