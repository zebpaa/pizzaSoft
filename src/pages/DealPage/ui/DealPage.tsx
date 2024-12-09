import type { Deal } from "@pages/index"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router"

import { selectors, updateDeal } from "@entities/dealsSlice"
import { Button } from "@shared/index"
import {
	CommentsList,
	CustomDropDown,
	CustomInput,
	NewComment,
	ProgressBar,
} from "@widgets/index"

import cls from "./DealPage.module.scss"

const DealPage: React.FC = () => {
	const location = useLocation()
	const dispatch = useDispatch()
	const deals: Deal[] = useSelector(selectors.selectAll)
	const deal = deals.filter((d) => d.id === location.state.id)[0]
	const [status, setStatus] = useState("idle") // "changed"
	const [phone, setPhone] = useState(deal.phone)
	const [budget, setBudget] = useState(deal.budget)
	const [fullName, setFullName] = useState(deal.fullName)
	const [creationDate, setCreationDate] = useState(deal.creationDate)
	const [dropdownValue, setDropdownValue] = useState(deal.status)

	const handleSave = () => {
		const newDeal = {
			changes: {
				status: dropdownValue ? dropdownValue : deal.status,
				phone: phone !== "" ? phone : deal.phone,
				budget: budget !== "" ? budget : deal.budget,
				fullName: fullName !== "" ? fullName : deal.fullName,
				creationDate: creationDate !== "" ? creationDate : deal.creationDate,
			},
			id: deal.id,
		}
		dispatch(updateDeal(newDeal))
		setStatus("idle")
	}

	useEffect(() => {
		if (status === "idle") {
			setDropdownValue(deal.status)
			setPhone(deal.phone)
			setBudget(deal.budget)
			setFullName(deal.fullName)
			setCreationDate(deal.creationDate)
		}

		console.log("dropdownValue: ", dropdownValue)
		console.log("deal.status: ", dropdownValue)
		if (
			dropdownValue === deal.status &&
			phone === deal.phone &&
			budget === deal.budget &&
			fullName === deal.fullName &&
			creationDate === deal.creationDate
		) {
			setStatus("idle")
		}
	}, [status, dropdownValue, phone, budget, fullName, creationDate, deal])

	const handleDropdownValueChange = (newValue: any) => {
		setDropdownValue(newValue)
		if (newValue !== deal.status) {
			setStatus("changed")
		}
	}

	const handlePhoneChange = (newValue: any) => {
		setPhone(newValue)
		if (newValue !== deal.phone) {
			setStatus("changed")
		}
	}

	const handleBudgetChange = (newValue: any) => {
		setBudget(newValue)
		if (newValue !== deal.budget) {
			setStatus("changed")
		}
	}

	const handleFullNameChange = (newValue: any) => {
		setFullName(newValue)
		if (newValue !== deal.fullName) {
			setStatus("changed")
		}
	}

	const handleCreationDateChange = (newValue: any) => {
		setCreationDate(newValue)
		if (newValue !== deal.creationDate) {
			setStatus("changed")
		}
	}

	return (
		<div className={cls.container}>
			<div className={cls.container__content}>
				<h1 className={cls.container__heading}>{location.state.name}</h1>
				<ProgressBar status={deal.status} />

				<div className={cls.container__dealInfo}>
					<div className={cls.container__inputs}>
						<CustomDropDown
							name="Статус"
							id="status"
							value={dropdownValue}
							onChange={handleDropdownValueChange}
							deal={deal}
							status={status}
							placeholder={""}
						/>
						<CustomInput
							name="Номер телефона"
							id="phone"
							placeholder="+7 (998) 876-54-32"
							type="tel"
							value={phone}
							onChange={handlePhoneChange}
							deal={deal}
							status={status}
						/>
						<CustomInput
							name="Бюджет"
							id="budget"
							placeholder="17000 руб."
							value={budget}
							onChange={handleBudgetChange}
							deal={deal}
							status={status}
						/>
						<CustomInput
							name="ФИО"
							id="fullName"
							placeholder="Олег Олегович Олегов"
							value={fullName}
							onChange={handleFullNameChange}
							deal={deal}
							status={status}
						/>
						<CustomInput
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

					<div className={cls.container__comments}>
						<div className={cls.container__newComment}>
							<NewComment deal={deal} />
						</div>
						<CommentsList deal={deal} />
					</div>
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
			</div>
		</div>
	)
}

export default DealPage
