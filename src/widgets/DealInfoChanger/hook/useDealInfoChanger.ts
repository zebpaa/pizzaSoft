import type { Deal } from "../../../pages"

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import { updateDeal } from "../../../entities/dealsSlice"

export const useDealInfoChanger = (deal: Deal) => {
	const [status, setStatus] = useState("idle") // "changed"
	const [phone, setPhone] = useState(deal.phone)
	const [budget, setBudget] = useState(deal.budget)
	const [fullName, setFullName] = useState(deal.fullName)
	const [creationDate, setCreationDate] = useState(deal.creationDate)
	const [dropdownValue, setDropdownValue] = useState(deal.status)
	const dispatch = useDispatch()

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

	return {
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
	}
}
