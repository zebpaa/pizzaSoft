import type { Deal } from "@pages/index"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"

import { addDeals, selectors } from "@entities/dealsSlice"
import { deals as mockDeals } from "@pages/index"

import { Button } from "../../shared"
import { Modal } from "../../widgets"
import cls from "./HomePage.module.scss"

const HomePage: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [activeTab, setActiveTab] = useState("all") // "archive"
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const completedStatuses = ["Провал", "Успешно"]

	useEffect(() => {
		dispatch(addDeals(mockDeals))
	}, [dispatch])

	const deals = useSelector(selectors.selectAll)

	const handleClick = (deal: Deal) => () => {
		navigate(`/deal/${deal.id}`, { state: deal })
	}

	return (
		<>
			<Modal isOpen={isOpen} onHide={setIsOpen} deals={deals} />
			<div className={cls.content}>
				<div
					className={cls.content__createButton}
					onClick={() => setIsOpen(true)}
				>
					<Button width="368">Создать</Button>
				</div>

				<div className={cls.content__buttonGroup}>
					<div onClick={() => setActiveTab("all")}>
						<Button
							width="300"
							variant={activeTab === "all" ? "active" : undefined}
						>
							Все
						</Button>
					</div>
					<div onClick={() => setActiveTab("archive")}>
						<Button
							width="300"
							variant={activeTab === "archive" ? "active" : undefined}
						>
							Архив
						</Button>
					</div>
				</div>

				<table className={cls.content__tabList}>
					<thead>
						<tr>
							<th className={cls.table__id}>id</th>
							<th className={cls.table__name__th}>Название</th>
							<th className={cls.table__status__th}>Статус</th>
							<th className={cls.table__creationDate__th}>Дата создания</th>
						</tr>
					</thead>
					<tbody>
						{deals
							.filter((d) => {
								if (activeTab === "all") {
									return !completedStatuses.includes(d.status)
								}
								return completedStatuses.includes(d.status)
							})
							.map((deal) => (
								<tr
									key={deal.id}
									onClick={handleClick(deal)}
									style={{ cursor: "pointer" }}
								>
									<td className={cls.table__id}>{deal.id}</td>
									<td className={cls.table__name__td}>{deal.name}</td>
									<td className={cls.table__status__td}>{deal.status}</td>
									<td className={cls.table__creationDate__td}>
										{deal.creationDate}
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default HomePage
