import type { Employee } from "../../pages"

import { FormProvider } from "react-hook-form"

import { Button, Dropdown, Input } from "../../shared"
import { useChanger } from "./hook/useChanger"
import cls from "./Changer.module.scss"

interface ChangerProps {
	employee: Employee
}

const Changer: React.FC<ChangerProps> = ({ employee }: ChangerProps) => {
	const {
		toggleEditMode,
		isDirty,
		isEditable,
		handleSubmit,
		submit,
		resetForm,
		methods,
	} = useChanger(employee)

	return (
		<FormProvider {...methods}>
			<form className={cls.container__inputs} onSubmit={handleSubmit(submit)}>
				<Dropdown
					title="Должность"
					id="role"
					isEditable={isEditable["role"]}
					toggleEditMode={() => toggleEditMode("role")}
				/>

				<Input
					title="Имя сотрудника"
					id="name"
					placeholder="Иван Иванович Иванов"
					isEditable={isEditable["name"]}
					toggleEditMode={() => toggleEditMode("name")}
				/>

				<Input
					title="Телефон"
					id="phone"
					placeholder="+7 (999) 999-99-99"
					type="tel"
					isEditable={isEditable["phone"]}
					toggleEditMode={() => toggleEditMode("phone")}
				/>

				<Input
					title="Дата создания"
					id="birthday"
					placeholder="30.01.2024"
					isEditable={isEditable["birthday"]}
					toggleEditMode={() => toggleEditMode("birthday")}
				/>

				<div className={cls.lastInput}>
					<Input
						title="в архиве"
						id="isArchive"
						type="checkbox"
						isEditable={isEditable["isArchive"]}
						toggleEditMode={() => toggleEditMode("isArchive")}
					/>
				</div>

				{isDirty && (
					<div className={`${cls.container__buttonGroup}`}>
						<Button type="submit" width="290" variant="active">
							Сохранить
						</Button>

						<Button width="290" variant="cancel" onClick={resetForm}>
							Отмена
						</Button>
					</div>
				)}
			</form>
		</FormProvider>
	)
}

export default Changer
