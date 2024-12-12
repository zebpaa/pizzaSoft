import { useProgressBar } from "./hook/useProgressBar"
import cls from "./ProgressBar.module.scss"

interface ProgressBarProps {
	status: "Новый" | "В работе" | "Почти завершен" | "Успешно" | "Провал"
}

const ProgressBar: React.FC<ProgressBarProps> = ({
	status,
}: ProgressBarProps) => {
	const { progressRef, progress, titleRef, spanMargin } = useProgressBar(status)

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
