import type { Deal } from "../../pages"
import type { SetStateAction } from "react"

import { useInput } from "./hook/useInput"
import cls from "./Input.module.scss"

interface InputProps {
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

const Input: React.FC<InputProps> = ({
	name,
	type = "text",
	placeholder,
	id,
	value,
	onChange,
	deal,
	status,
}: InputProps) => {
	const { toggleEditMode, isEditable, handleChange, inputValue } = useInput({
		value,
		onChange,
		deal,
		status,
		id,
	})

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

export default Input
