import { useEffect, useRef, useState } from "react"

import cls from "./ProgressBar.module.scss"

interface ProgressBarProps {
	status: "Новый" | "В работе" | "Почти завершен" | "Успешно" | "Провал"
}

const ProgressBar: React.FC<ProgressBarProps> = ({
	status,
}: ProgressBarProps) => {
	const statuses = {
		Новый: { color: "#D29A00", width: "23%" },
		"В работе": { color: "#CACA00", width: "45%" },
		"Почти завершен": { color: "#69D200", width: "68%" },
		Успешно: { color: "#00C907", width: "100%" },
		Провал: { color: "#ED0000", width: "100%" },
	}

	const progress = statuses[status] || { color: "#C5C5C5", width: "0px" } // Неокрашенная часть

	const titleRef = useRef<HTMLSpanElement | null>(null)
	const progressRef = useRef<HTMLDivElement | null>(null)
	const [titleWidth, setTitleWidth] = useState(0)
	const [progressWidth, setProgressWidth] = useState(0)

	const spanMargin =
		((progressWidth / 100) * Number(progress.width.replace(/%/, "")) -
			titleWidth) /
			2 +
		"px"

	useEffect(() => {
		const elem = document.getElementById("progress__bar")

		const updateWidth = () => {
			if (elem) {
				const { width } = elem.getBoundingClientRect()
				setProgressWidth(width)
			}
		}

		// Инициализируем ширину при первом рендере
		updateWidth()

		// Обработчик изменения размера окна
		const handleResizeWindow = () => {
			updateWidth()
		}

		window.addEventListener("resize", handleResizeWindow)

		return () => {
			window.removeEventListener("resize", handleResizeWindow)
		}
	}, [])

	useEffect(() => {
		if (titleRef.current) {
			setTitleWidth(titleRef?.current?.offsetWidth)
		}
	}, [status])

	return (
		<div className={cls.content__status}>
			<h3 className={cls.content__status_header}>Статус</h3>
			<div className={cls.progress__bar} ref={progressRef} id="progress__bar">
				<div
					className={cls.progress__fill}
					style={{
						backgroundColor: progress.color,
						width: progress.width,
					}}
				/>
			</div>
			<span
				ref={titleRef}
				className={cls.progress__title}
				style={{ marginLeft: spanMargin }}
			>
				{status}
			</span>
		</div>
	)
}

export default ProgressBar
