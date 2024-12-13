import type { Deal } from "@pages/index"

import { useEffect, useRef, useState } from "react"

import { useDealsTable } from "./hook/useDealsTable"
import cls from "./DealsTable.module.scss"

interface DealsTableProps {
	deals: Deal[]
	activeTab: string
}

const DealsTable = ({ deals, activeTab }: DealsTableProps) => {
	const { completedStatuses, handleClick } = useDealsTable()

	const [paddingLeft, setPaddingLeft] = useState({
		id: 0,
		name: 0,
		status: 0,
		creationDate: 0,
	})

	// Рефы для заголовков
	const idRef = useRef<HTMLTableCellElement>(null)
	const nameRef = useRef<HTMLTableCellElement>(null)
	const statusRef = useRef<HTMLTableCellElement>(null)
	const creationDateRef = useRef<HTMLTableCellElement>(null)

	useEffect(() => {
		// Функция для вычисления отступов
		const calculatePadding = () => {
			setPaddingLeft({
				id: idRef.current ? idRef.current.offsetWidth / 2 : 0,
				name: nameRef.current ? nameRef.current.offsetWidth / 2 : 0,
				status: statusRef.current ? statusRef.current.offsetWidth / 2 : 0,
				creationDate: creationDateRef.current
					? creationDateRef.current.offsetWidth / 2
					: 0,
			})
		}

		// Вызываем функцию при монтировании компонента и изменении размеров окна
		calculatePadding()
		window.addEventListener("resize", calculatePadding)

		// Убираем обработчик при размонтировании
		return () => {
			window.removeEventListener("resize", calculatePadding)
		}
	}, [])

	return (
		<table
			className={cls.content__tabList}
			style={{ borderCollapse: "collapse" }}
		>
			<thead>
				<tr>
					<th
						ref={idRef}
						className={cls.table__id}
						style={{ paddingLeft: `${paddingLeft.id}px` }}
					>
						id
					</th>
					<th
						ref={nameRef}
						className={cls.table__name__th}
						style={{ paddingLeft: `${paddingLeft.name}px` }}
					>
						Название
					</th>
					<th
						ref={statusRef}
						className={cls.table__status__th}
						style={{ paddingLeft: `${paddingLeft.status}px` }}
					>
						Статус
					</th>
					<th
						ref={creationDateRef}
						className={cls.table__creationDate__th}
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
							<td
								className={cls.table__id}
								style={{ paddingLeft: `${paddingLeft.id}px` }}
							>
								{deal.id}
							</td>
							<td
								className={cls.table__name__td}
								style={{ paddingLeft: `${paddingLeft.name}px` }}
							>
								{deal.name}
							</td>
							<td
								className={cls.table__status__td}
								style={{ paddingLeft: `${paddingLeft.status}px` }}
							>
								{deal.status}
							</td>
							<td
								className={cls.table__creationDate__td}
								style={{ paddingLeft: `${paddingLeft.creationDate}px` }}
							>
								{deal.creationDate}
							</td>
						</tr>
					))}
			</tbody>
		</table>
	)
}

export default DealsTable
