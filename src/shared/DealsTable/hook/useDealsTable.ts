import type { Deal } from "../../../pages"

import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"

export const useDealsTable = () => {
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
	const completedStatuses = ["Провал", "Успешно"]

	const navigate = useNavigate()

	const handleClick = (deal: Deal) => () => {
		navigate(`/deal/${deal.id}`, { state: deal })
	}

	return {
		completedStatuses,
		handleClick,
		paddingLeft,
		idRef,
		nameRef,
		statusRef,
		creationDateRef,
	}
}
