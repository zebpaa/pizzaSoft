import { EmployeesList, FilterForm } from "../../widgets"
import cls from "./Home.module.scss"

const Home: React.FC = () => {
	return (
		<>
			<FilterForm />
			<EmployeesList />
		</>
	)
}

export default Home
