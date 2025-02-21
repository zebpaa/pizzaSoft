import { Provider } from "react-redux"
import { Route, Routes } from "react-router"
import { PersistGate } from "redux-persist/integration/react"

import { persistStore } from "redux-persist"

import store from "../entities"
import { DealInfo, Home } from "../pages"
import { Layout } from "../widgets"

const persistor = persistStore(store)

function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="deal/:id" element={<DealInfo />} />
					</Route>
				</Routes>
			</PersistGate>
		</Provider>
	)
}

export default App
