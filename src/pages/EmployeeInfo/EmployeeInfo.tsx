import type { Deal } from ".."

import { useSelector } from "react-redux"
import { useParams } from "react-router"

import { selectors } from "../../entities/dealsSlice"
import { Changer } from "../../widgets"
import cls from "./EmployeeInfo.module.scss"

const EmployeeInfo: React.FC = () => {
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

				<div className={cls.container__dealInfo}>
					<Changer deal={deal} />
				</div>
			</div>
		</div>
	)
}

export default EmployeeInfo
