import { Provider } from "react-redux"
import { Route, BrowserRouter as Router, Routes } from "react-router"

import store from "@entities/index"
import { DealPage, HomePage } from "@pages/index"
import { Header } from "@widgets/index"

function App() {
	return (
		<Provider store={store}>
			<div style={{ maxWidth: "1920px" }}>
				<Router>
					<Header />
					<Routes>
						<Route path="/" element={<HomePage />}></Route>
						<Route path="/deal" element={<DealPage />}></Route>
					</Routes>
				</Router>
			</div>
		</Provider>
	)
}

export default App
