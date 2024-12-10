import type { Deal } from "@pages/index"
import type { SetStateAction } from "react"

import { useEffect, useState } from "react"

import cls from "./CustomInput.module.scss"

interface CustomInputProps {
	name: string
	type?: string
	placeholder: string
	id: keyof Deal
	value: string | number
	onChange?: (
		value: string | number | SetStateAction<string | undefined>,
	) => void
	deal: Deal
	status: string
}

const CustomInput: React.FC<CustomInputProps> = ({
	name,
	type = "text",
	placeholder,
	id,
	value,
	onChange,
	deal,
	status,
}: CustomInputProps) => {
	const [inputValue, setInputValue] = useState(value)
	const [isEditable, setIsEditable] = useState(false)

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

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		setInputValue(e.target.value)
		if (onChange) {
			onChange(e.target.value)
		}
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
				<input
					className={cls.customInput__input}
					autoComplete="onChange"
					id={id}
					name={id}
					style={{ background: isEditable ? "#C2C2C2" : "#ededed" }}
					type={type}
					placeholder={placeholder}
					disabled={!isEditable}
					onChange={handleChange}
					value={inputValue}
				/>
			</div>
		</div>
	)
}

export default CustomInput
