import { Provider } from "react-redux"
import { Route, Routes } from "react-router"
import { PersistGate } from "redux-persist/integration/react"

import { persistStore } from "redux-persist"

import store from "@entities/index"
import { DealPage, HomePage } from "@pages/index"
import { Layout } from "@widgets/index"

const persistor = persistStore(store)

function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<HomePage />} />
						<Route path="deal/:id" element={<DealPage />} />
					</Route>
				</Routes>
			</PersistGate>
		</Provider>
	)
}

export default App
