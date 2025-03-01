import { Link } from "react-router";



import cls from "./Header.module.scss";


const Header: React.FC = () => {
	return (
		<div className={cls.wrapper}>
			<Link to="/">PizzaSoft</Link>
			<ul>
				<Link to="/">Сотрудники</Link>
			</ul>
		</div>
	)
}

export default Header