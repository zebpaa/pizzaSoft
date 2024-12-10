import { Outlet } from "react-router"

import { Header } from "@widgets/index"

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
