import type { Deal } from "../../pages"

import { useLayoutEffect, useState } from "react"
import { useFormContext } from "react-hook-form"

import cls from "./Dropdown.module.scss"

interface DropdownProps {
	title: string
	id: keyof Deal
	isEditable: boolean
	toggleEditMode: any
}

const Dropdown: React.FC<DropdownProps> = ({
	title,
	id,
	isEditable,
	toggleEditMode,
}) => {
	const { register, setValue, watch } = useFormContext()
	const [isOpen, setIsOpen] = useState(false)
	const [containerWidth, setContainerWidth] = useState(0)

	const options = ["Новый", "В работе", "Почти завершен", "Успешно", "Провал"]

	const currentValue = watch(id) // Получаем текущее значение из формы

	const toggleDropdown = () => {
		setIsOpen((prev: any) => !prev)
	}

	const handleOptionClick = (option: string) => {
		setValue(id, option, { shouldDirty: true })
		setIsOpen(false)
	}

	useLayoutEffect(() => {
		const container = document.getElementById("container")

		const updateWidth = () => {
			if (container) {
				const { width } = container.getBoundingClientRect()
				setContainerWidth(width)
			}
		}

		if (isOpen) {
			updateWidth()
		}

		// Обработчик изменения размера окна
		const handleResizeWindow = () => {
			updateWidth()
		}

		window.addEventListener("resize", handleResizeWindow)

		return () => {
			window.removeEventListener("resize", handleResizeWindow)
		}
	}, [isOpen])

	return (
		<div className={cls.customInput}>
			<div className={cls.customInput__header}>
				<h3 className={cls.customInput__title}>{title}</h3>
				<button
					className={cls.customInput__button}
					type="button"
					onClick={toggleEditMode}
				>
					{isEditable ? "Отменить" : "Изменить"}
				</button>
			</div>
			<div className={cls.customInput__inputContainer}>
				<div
					className={cls.customInput__dropdown}
					style={{
						backgroundColor: isEditable
							? "rgb(194, 194, 194)"
							: "rgb(237, 237, 237)",
					}}
					onClick={toggleDropdown}
				>
					<span {...register(id)}>{currentValue}</span>
					{isEditable && (
						<svg
							className={`${cls.dropdownIcon} ${isOpen ? cls.open : ""}`}
							width="24"
							height="24"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M7 10l5 5 5-5z" fill="black" />
						</svg>
					)}
				</div>
				{isOpen && isEditable && (
					<div className={cls.customInput__options} id="container">
						<div className={cls.customInput__scrollContainer}>
							{options
								.filter((option) => option !== currentValue)
								.map((option) => (
									<div
										key={option}
										style={{ width: `calc(${containerWidth}px - 33px)` }}
										className={cls.customInput__option}
										onClick={() => handleOptionClick(option)}
									>
										{option}
									</div>
								))}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Dropdown
