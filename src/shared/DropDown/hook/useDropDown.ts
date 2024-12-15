import type { Deal } from "../../../pages"
import type { SetStateAction } from "react"

import { useEffect, useState } from "react"

interface useDropDownArgs {
	id: keyof Deal
	value: string | number
	onChange?: (
		value: string | number | SetStateAction<string | undefined>,
	) => void
	deal: Deal
	status: string
}

export const useDropDown = ({
	value,
	onChange,
	status,
	deal,
	id,
}: useDropDownArgs) => {
	const [isEditable, setIsEditable] = useState(false)
	const [isOpen, setIsOpen] = useState(false)
	const [inputValue, setInputValue] = useState(value)

	const options = ["Новый", "В работе", "Почти завершен", "Успешно", "Провал"]

	const toggleDropdown = () => {
		setIsOpen((prev) => !prev)
	}

	const handleOptionClick = (option: string) => {
		if (onChange) {
			onChange(option)
		}
		setInputValue(option)
		setIsOpen(false)
	}

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

	return {
		toggleEditMode,
		isEditable,
		toggleDropdown,
		inputValue,
		isOpen,
		handleOptionClick,
		options,
	}
}
