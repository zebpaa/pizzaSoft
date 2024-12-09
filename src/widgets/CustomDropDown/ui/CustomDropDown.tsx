import type { Deal } from "@pages/index"
import type { SetStateAction } from "react"

import { useEffect, useState } from "react"

import cls from "./CustomDropDown.module.scss"

interface CustomDropDownProps {
	name: string
	placeholder: string
	id: keyof Deal
	value: string | number
	onChange?: (
		value: string | number | SetStateAction<string | undefined>,
	) => void
	deal: Deal
	status: string
}

const CustomDropdown: React.FC<CustomDropDownProps> = ({
	name,
	value,
	onChange,
	status,
	deal,
	id,
}) => {
	const [isEditable, setIsEditable] = useState(false)
	const [isOpen, setIsOpen] = useState(false)
	const [inputValue, setInputValue] = useState(value)

	const options = ["Новый", "В работе", "Почти завершен", "Успешно", "Провал"]

	const toggleDropdown = () => {
		setIsOpen((prev) => !prev)
	}

	const handleOptionClick = (option: string) => {
		if (onChange) {
			onChange(option)
		}
		setInputValue(option)
		setIsOpen(false)
	}

	useEffect(() => {
		if (status === "idle") {
			setInputValue(deal[id])
			setIsEditable(false)
		}
	}, [deal, id, status])

	const toggleEditMode = () => {
		if (isEditable) {
			setInputValue(deal[id])
			if (onChange) {
				onChange(deal[id])
			}
		} else {
			setInputValue(value)
		}
		setIsEditable(!isEditable)
	}

	return (
		<div className={cls.customInput}>
			<div className={cls.customInput__header}>
				<h3 className={cls.customInput__title}>{name}</h3>
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
					<span>{inputValue}</span>
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
					<div className={cls.customInput__options}>
						<div className={cls.customInput__scrollContainer}>
							{options
								.filter((option) => option !== inputValue)
								.map((option) => (
									<div
										key={option}
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

export default CustomDropdown
