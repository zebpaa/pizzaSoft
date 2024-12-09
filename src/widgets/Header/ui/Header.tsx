import { Link } from "react-router"

import cls from "./Header.module.scss"

const Header: React.FC = () => {
	return (
		<div className={cls.wrapper}>
			<a href="">Заголовок</a>
			<ul>
				<Link to="/">сделки</Link>
			</ul>
		</div>
	)
}

export default Header
