import { Outlet } from "react-router"

import { Header } from "../../widgets"

const Layout: React.FC = () => {
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
			<footer />
		</>
	)
}

export default Layout
