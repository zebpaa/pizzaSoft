import type { Deal } from "@pages/index"

import { useDealsTable } from "./hook/useDealsTable"
import cls from "./DealsTable.module.scss"

interface DealsTableProps {
	deals: Deal[]
	activeTab: string
}

const DealsTable = ({ deals, activeTab }: DealsTableProps) => {
	const { completedStatuses, handleClick } = useDealsTable()

	return (
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
	)
}

export default DealsTable
