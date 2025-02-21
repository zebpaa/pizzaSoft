import type { Deal } from ".."

import { useSelector } from "react-redux"
import { useParams } from "react-router"

import { selectors } from "../../entities/dealsSlice"
import { Changer, Comments, ProgressBar } from "../../widgets"
import cls from "./DealInfo.module.scss"

const DealInfo: React.FC = () => {
	const { id } = useParams()

	const deals: Deal[] = useSelector(selectors.selectAll)
	const deal = deals.find((d) => d.id === Number(id))

	if (!deal) {
		return <div>Loading...</div>
	}

	return (
		<div className={cls.container}>
			<div className={cls.container__content}>
				<h1 className={cls.container__heading}>{deal.name}</h1>
				<ProgressBar status={deal.status} />

				<div className={cls.container__dealInfo}>
					<Changer deal={deal} />
					<Comments deal={deal} />
				</div>
			</div>
		</div>
	)
}

export default DealInfo
