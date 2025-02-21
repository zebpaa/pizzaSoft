import type { Deal } from "../../../pages"
import type { SubmitHandler } from "react-hook-form"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { updateDeal } from "../../../entities/dealsSlice"

export const useChanger = (deal: Deal) => {
	type Inputs = {
		phone: string
		budget: string
		fullName: string
		creationDate: string
		status: "Новый" | "Провал" | "Успешно" | "В работе" | "Почти завершен"
	}

	const schema = yup.object({
		status: yup
			.string()
			.oneOf(["Новый", "Провал", "Успешно", "В работе", "Почти завершен"])
			.required("Обязательное поле"),
		phone: yup
			.string()
			.trim()
			.required("Обязательное поле")
			.min(3, "Мин. длина: 3")
			.max(20, "Макс. длина: 20")
			.matches(
				/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
				"Неправильно! Пример: +7 (999) 999-99-99",
			),
		budget: yup
			.string()
			.trim()
			.required("Обязательное поле")
			.min(3, "Мин. длина: 3")
			.max(20, "Макс. длина: 20")
			.matches(/^(0|[1-9]\d*) руб.$/, "Неправильно! Пример: 10000 руб."),
		fullName: yup
			.string()
			.trim()
			.required("Обязательное поле")
			.min(3, "Мин. длина: 3")
			.max(30, "Макс. длина: 30"),
		creationDate: yup
			.string()
			.required("Обязательное поле")
			.min(3, "Мин. длина: 3")
			.max(20, "Макс. длина: 20")
			.matches(
				/^(0[1-9]|[12][0-9]|3[01]).(0[1-9]|1[0-2]).(\d{4})$/,
				"Неправильно! Пример: 30.01.2024",
			),
	})

	const dispatch = useDispatch()

	const methods = useForm<Inputs>({
		defaultValues: {
			phone: deal.phone,
			budget: deal.budget,
			fullName: deal.fullName,
			creationDate: deal.creationDate,
			status: deal.status,
		},
		resolver: yupResolver(schema),
	})

	const {
		handleSubmit,
		reset,
		formState: { isDirty },
		resetField,
	} = methods

	const setFieldsToNonEditable = () => {
		const fields = ["phone", "budget", "fullName", "creationDate", "status"]
		fields.forEach((field) => {
			setIsEditable((prev) => ({ ...prev, [field]: false }))
		})
	}

	const submit: SubmitHandler<Inputs> = (data) => {
		const newDeal = {
			changes: data,
			id: deal.id,
		}

		dispatch(updateDeal(newDeal))

		reset(data)
		setFieldsToNonEditable()
	}

	const resetForm = () => {
		setFieldsToNonEditable()
		reset()
	}

	const [isEditable, setIsEditable] = useState({
		phone: false,
		budget: false,
		fullName: false,
		creationDate: false,
		status: false,
	})

	const toggleEditMode = (
		field: "phone" | "budget" | "fullName" | "creationDate" | "status",
	) => {
		if (isEditable[field]) {
			resetField(field)
		}

		setIsEditable((prev) => ({ ...prev, [field]: !prev[field] }))
	}

	return {
		handleSubmit,
		resetForm,
		toggleEditMode,
		submit,
		isDirty,
		isEditable,
		methods,
	}
}