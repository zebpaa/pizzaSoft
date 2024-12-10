import { Provider } from "react-redux"
import { Route, Routes } from "react-router"

import store from "@entities/index"
import { DealPage, HomePage } from "@pages/index"
import { Layout } from "@widgets/index"

function App() {
	return (
		<Provider store={store}>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path="/deal/:id" element={<DealPage />} />
				</Route>
			</Routes>
		</Provider>
	)
}

export default App
