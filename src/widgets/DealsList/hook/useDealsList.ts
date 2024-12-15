import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { addDeals, selectors } from "../../../entities/dealsSlice"
import { deals as mockDeals } from "../../../pages"

export const useDealsList = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [activeTab, setActiveTab] = useState("all") // "archive"
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(addDeals(mockDeals))
	}, [dispatch])

	const deals = useSelector(selectors.selectAll)

	return {
		isOpen,
		setIsOpen,
		activeTab,
		setActiveTab,
		deals,
	}
}
