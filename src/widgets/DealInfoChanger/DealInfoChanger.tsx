import type { Deal } from "../../pages"

import { Button, DropDown, Input } from "../../shared"
import { useDealInfoChanger } from "./hook/useDealInfoChanger"
import cls from "./DealInfoChanger.module.scss"

interface DealInfoChangerProps {
	deal: Deal
}

const DealInfoChanger: React.FC<DealInfoChangerProps> = ({
	deal,
}: DealInfoChangerProps) => {
	const {
		status,
		creationDate,
		dropdownValue,
		handleDropdownValueChange,
		phone,
		handlePhoneChange,
		budget,
		handleBudgetChange,
		fullName,
		handleFullNameChange,
		handleCreationDateChange,
		handleSave,
		setStatus,
	} = useDealInfoChanger(deal)

	return (
		<>
			<div className={cls.container__inputs}>
				<DropDown
					name="Статус"
					id="status"
					value={dropdownValue}
					onChange={handleDropdownValueChange}
					deal={deal}
					status={status}
				/>
				<Input
					name="Номер телефона"
					id="phone"
					placeholder="+7 (998) 876-54-32"
					type="tel"
					value={phone}
					onChange={handlePhoneChange}
					deal={deal}
					status={status}
				/>
				<Input
					name="Бюджет"
					id="budget"
					placeholder="17000 руб."
					value={budget}
					onChange={handleBudgetChange}
					deal={deal}
					status={status}
				/>
				<Input
					name="ФИО"
					id="fullName"
					placeholder="Олег Олегович Олегов"
					value={fullName}
					onChange={handleFullNameChange}
					deal={deal}
					status={status}
				/>
				<Input
					name="Дата создания"
					id="creationDate"
					placeholder={deal.creationDate}
					type="text"
					value={creationDate}
					onChange={handleCreationDateChange}
					deal={deal}
					status={status}
				/>
			</div>

			<div
				className={`${cls.container__buttonGroup} ${status !== "idle" ? cls.visible : cls.hidden}`}
			>
				<div onClick={handleSave}>
					<Button type="submit" width="290" variant="active">
						Сохранить
					</Button>
				</div>
				<div onClick={() => setStatus("idle")}>
					<Button width="290" variant="cancel">
						Отмена
					</Button>
				</div>
			</div>
		</>
	)
}

export default DealInfoChanger
