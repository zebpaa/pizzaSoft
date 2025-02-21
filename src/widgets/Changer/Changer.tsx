import type { Deal } from "../../pages"

import { FormProvider } from "react-hook-form"

import { Button, Dropdown, Input } from "../../shared"
import { useChanger } from "./hook/useChanger"
import cls from "./Changer.module.scss"

interface ChangerProps {
	deal: Deal
}

const Changer: React.FC<ChangerProps> = ({ deal }: ChangerProps) => {
	const {
		toggleEditMode,
		isDirty,
		isEditable,
		handleSubmit,
		submit,
		resetForm,
		methods,
	} = useChanger(deal)

	return (
		<FormProvider {...methods}>
			<form className={cls.container__inputs} onSubmit={handleSubmit(submit)}>
				<Dropdown
					title="Статус"
					id="status"
					isEditable={isEditable["status"]}
					toggleEditMode={() => toggleEditMode("status")}
				/>

				<Input
					title="Номер телефона"
					id="phone"
					placeholder="+7 (999) 999-99-99"
					type="tel"
					isEditable={isEditable["phone"]}
					toggleEditMode={() => toggleEditMode("phone")}
				/>

				<Input
					title="Бюджет"
					id="budget"
					placeholder="10000 руб."
					isEditable={isEditable["budget"]}
					toggleEditMode={() => toggleEditMode("budget")}
				/>

				<Input
					title="ФИО"
					id="fullName"
					placeholder="Иван Иванович Иванов"
					isEditable={isEditable["fullName"]}
					toggleEditMode={() => toggleEditMode("fullName")}
				/>

				<div className={cls.lastInput}>
					<Input
						title="Дата создания"
						id="creationDate"
						placeholder="30.01.2024"
						isEditable={isEditable["creationDate"]}
						toggleEditMode={() => toggleEditMode("creationDate")}
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
