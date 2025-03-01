import { AddEmployee } from "../../features";

import { employees } from "../../pages";
import { Button, EmployeesTable } from "../../shared";
import { useEmployeesList } from "./hook/useEmployeesList";
import cls from "./EmployeesList.module.scss";


const EmployeesList: React.FC = () => {
	const { isOpen, setIsOpen, activeTab, setActiveTab, deals } =
		useEmployeesList()

	return (
		<>
			<AddEmployee isOpen={isOpen} onHide={setIsOpen} employees={employees} />
			<div className={cls.content}>
				<div className={cls.createButton} style={{marginBottom: "20px"}}>
					<Button width="368" onClick={() => setIsOpen(true)}>
						Создать
					</Button>
				</div>

				{/* <div className={cls.content__buttonGroup}>
					<Button
						width="300"
						variant={activeTab === "all" ? "active" : undefined}
						onClick={() => setActiveTab("all")}
					>
						Все
					</Button>

					<Button
						width="300"
						variant={activeTab === "archive" ? "active" : undefined}
						onClick={() => setActiveTab("archive")}
					>
						Архив
					</Button>
				</div> */}
				<EmployeesTable employees={employees} activeTab={activeTab} />
			</div>
		</>
	)
}

export default EmployeesList