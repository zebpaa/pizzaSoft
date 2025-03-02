import type { Employee } from "../../pages"
import type { FieldError } from "react-hook-form"

import { useFormContext } from "react-hook-form"

import cls from "./Input.module.scss"

interface InputProps {
	title: string
	type?: string
	placeholder?: string
	id: keyof Employee
	isEditable: any
	toggleEditMode: any
}

const Input: React.FC<InputProps> = ({
	title,
	type = "text",
	placeholder = "",
	id,
	isEditable,
	toggleEditMode,
}: InputProps) => {
	const {
		register,
		formState: { errors },
	} = useFormContext()

	const error = errors[id]

	return (
		<>
			{type !== "checkbox" ? (
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
						<input
							className={`${cls.customInput__input} ${errors[id]?.message ? cls.invalid : ""}`}
							autoComplete="on"
							id={id}
							{...register(id)}
							style={{ background: isEditable ? "#C2C2C2" : "#ededed" }}
							type={type}
							placeholder={placeholder}
							disabled={!isEditable}
						/>

						{error && (
							<p className={cls.feedback}>{(error as FieldError).message}</p>
						)}
					</div>
				</div>
			) : (
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
					<input
						autoComplete="on"
						id={id}
						{...register(id)}
						style={{ background: isEditable ? "#C2C2C2" : "#ededed" }}
						type={type}
						disabled={!isEditable}
					/>
				</div>
			)}
		</>
	)
}

export default Input
