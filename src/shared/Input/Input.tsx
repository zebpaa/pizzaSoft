import type { Employee } from "../../pages"
import type { FieldError } from "react-hook-form"

import { useRef } from "react"
import { useFormContext } from "react-hook-form"
import InputMask from "react-input-mask"

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
	const inputRef = useRef<HTMLInputElement>(null)
	const {
		register,
		formState: { errors },
		getValues,
	} = useFormContext()

	const error = errors[id]
	const defaultValue = getValues(id) || ""

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
						{id === "phone" || id === "birthday" ? (
							<InputMask
								mask={id === "phone" ? "+7 (999) 999-9999" : "99.99.9999"}
								defaultValue={defaultValue}
								{...register(id)}
								className={`${cls.customInput__input} ${
									error ? cls.invalid : ""
								}`}
								autoComplete="on"
								style={{ background: isEditable ? "#C2C2C2" : "#ededed" }}
								disabled={!isEditable}
								placeholder={placeholder}
								type={type}
								id={id}
							>
								{(inputProps: any) => <input {...inputProps} ref={inputRef} />}
							</InputMask>
						) : (
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
						)}
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
