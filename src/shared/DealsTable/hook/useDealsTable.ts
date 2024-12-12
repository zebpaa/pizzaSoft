import type { Deal } from "@pages/index"

import { useNavigate } from "react-router"

export const useDealsTable = () => {
	const completedStatuses = ["Провал", "Успешно"]

	const navigate = useNavigate()

	const handleClick = (deal: Deal) => () => {
		navigate(`/deal/${deal.id}`, { state: deal })
	}

	return {
		completedStatuses,
		handleClick,
	}
}
