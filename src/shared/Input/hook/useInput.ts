import type { Deal } from "@pages/index"
import type { SetStateAction } from "react"

import { useEffect, useState } from "react"

interface useInputArgs {
	id: keyof Deal
	value: string | number
	onChange?: (
		value: string | number | SetStateAction<string | undefined>,
	) => void
	status: string
	deal: Deal
}

export const useInput = ({
	value,
	onChange,
	deal,
	status,
	id,
}: useInputArgs) => {
	const [inputValue, setInputValue] = useState(value)
	const [isEditable, setIsEditable] = useState(false)

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

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		setInputValue(e.target.value)
		if (onChange) {
			onChange(e.target.value)
		}
	}

	return {
		toggleEditMode,
		isEditable,
		handleChange,
		inputValue,
	}
}
