import type { Deal } from "../../pages"

import { useDealsTable } from "./hook/useDealsTable"
import cls from "./DealsTable.module.scss"

interface DealsTableProps {
	deals: Deal[]
	activeTab: string
}

const DealsTable = ({ deals, activeTab }: DealsTableProps) => {
	const {
		completedStatuses,
		handleClick,
		paddingLeft,
		idRef,
		nameRef,
		statusRef,
		creationDateRef,
	} = useDealsTable()

	return (
		<table
			className={cls.content__tabList}
			style={{ borderCollapse: "collapse" }}
		>
			<thead>
				<tr>
					<th ref={idRef} style={{ paddingLeft: `${paddingLeft.id}px` }}>
						id
					</th>
					<th ref={nameRef} style={{ paddingLeft: `${paddingLeft.name}px` }}>
						Название
					</th>
					<th
						ref={statusRef}
						style={{ paddingLeft: `${paddingLeft.status}px` }}
					>
						Статус
					</th>
					<th
						ref={creationDateRef}
						style={{ paddingLeft: `${paddingLeft.creationDate}px` }}
					>
						Дата создания
					</th>
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
							<td style={{ paddingLeft: `${paddingLeft.id}px` }}>{deal.id}</td>
							<td style={{ paddingLeft: `${paddingLeft.name}px` }}>
								{deal.name}
							</td>
							<td style={{ paddingLeft: `${paddingLeft.status}px` }}>
								{deal.status}
							</td>
							<td style={{ paddingLeft: `${paddingLeft.creationDate}px` }}>
								{deal.creationDate}
							</td>
						</tr>
					))}
			</tbody>
		</table>
	)
}

export default DealsTable
