import { useEffect, useRef, useState } from "react"

import cls from "./ProgressBar.module.scss"

interface ProgressBarProps {
	status: "Новый" | "В работе" | "Почти завершен" | "Успешно" | "Провал"
}

const ProgressBar: React.FC<ProgressBarProps> = ({
	status,
}: ProgressBarProps) => {
	const statuses = {
		Новый: { color: "#D29A00", width: "401px" },
		"В работе": { color: "#CACA00", width: "802px" },
		"Почти завершен": { color: "#69D200", width: "1208px" },
		Успешно: { color: "#00C907", width: "1767px" },
		Провал: { color: "#ED0000", width: "1767px" },
	}

	const progress = statuses[status] || { color: "#C5C5C5", width: "0px" } // Неокрашенная часть
	const titleRef = useRef<HTMLSpanElement | null>(null)
	const [width, setWidth] = useState(0)

	const spanMargin =
		(Number(progress.width.replace(/px/, "")) - width) / 2 + "px"

	useEffect(() => {
		if (titleRef.current) {
			setWidth(titleRef?.current?.offsetWidth)
		}
	}, [status])

	return (
		<div className={cls.content__status}>
			<h3 className={cls.content__status_header}>Статус</h3>
			<div className={cls.progress__bar}>
				<div
					className={cls.progress__fill}
					style={{
						backgroundColor: progress.color,
						width: progress.width,
					}}
				></div>
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
