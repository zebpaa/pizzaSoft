import type { Employee } from "../../pages"

import { Button, ModalContainer } from "../../shared"
import { useAddEmployee } from "./hook/useAddEmployee"
import cls from "./AddEmployee.module.scss"

type AddEmployeeProps = {
	isOpen: boolean
	onHide: (value: boolean) => void
	employees: Employee[]
}

const AddEmployee: React.FC<AddEmployeeProps> = ({
	employees,
	isOpen,
	onHide,
}: AddEmployeeProps) => {
	const { handleSubmit, register, errors, handleClick, onSubmit } =
		useAddEmployee({
			employees,
			onHide,
		})

	return (
		<ModalContainer isOpen={isOpen} onHide={onHide} title="Создать сотрудника">
			<p className={cls.modal__label}>название</p>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					{...register("name")}
					className={`${cls.modal__input} ${errors.name?.message ? cls.invalid : ""}`}
					type="text"
					placeholder="Введите название"
				/>
				{errors.name && (
					<p className={cls.modal__feedback}>{errors.name?.message}</p>
				)}
				<input
					{...register("name")}
					className={`${cls.modal__input} ${errors.name?.message ? cls.invalid : ""}`}
					type="text"
					placeholder="Введите название"
				/>
				{errors.name && (
					<p className={cls.modal__feedback}>{errors.name?.message}</p>
				)}
				<div className={cls.modal__btnGroup}>
					<Button type="submit" variant="active" width="290">
						Создать
					</Button>
					<Button variant="cancel" width="290" onClick={handleClick}>
						Отмена
					</Button>
				</div>
			</form>
		</ModalContainer>
	)
}

export default AddEmployee
