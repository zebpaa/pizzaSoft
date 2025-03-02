import type { Employee } from "../../../pages"
import type { SubmitHandler } from "react-hook-form"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { updateEmployee } from "../../../entities/employeesSlice"

type Inputs = {
	phone: string
	name: string
	birthday: string
	role: "driver" | "waiter" | "cook"
	isArchive: boolean
}

export const useChanger = (employee: Employee) => {
	const schema = yup.object({
		phone: yup
			.string()
			.trim()
			.required("Обязательное поле")
			.min(3, "Мин. длина: 3")
			.max(20, "Макс. длина: 20")
			.matches(
				/^\+7 \(\d{3}\) \d{3}-\d{4}$/,
				"Неправильно! Пример: +7 (999) 999-9999",
			),
		name: yup
			.string()
			.trim()
			.required("Обязательное поле")
			.min(3, "Мин. длина: 3")
			.max(30, "Макс. длина: 30"),
		birthday: yup
			.string()
			.required("Обязательное поле")
			.min(3, "Мин. длина: 3")
			.max(20, "Макс. длина: 20")
			.matches(
				/^(0[1-9]|[12][0-9]|3[01]).(0[1-9]|1[0-2]).(\d{4})$/,
				"Неправильно! Пример: 30.01.2024",
			),
		role: yup
			.string()
			.oneOf(["driver", "waiter", "cook"])
			.required("Обязательное поле"),
	})

	const dispatch = useDispatch()

	const methods = useForm<Inputs>({
		defaultValues: {
			phone: employee.phone,
			name: employee.name,
			birthday: employee.birthday,
			role: employee.role,
			isArchive: employee.isArchive,
		},
		resolver: yupResolver(schema) as any,
	})

	const {
		handleSubmit,
		reset,
		formState: { isDirty },
		resetField,
	} = methods

	const setFieldsToNonEditable = () => {
		const fields = ["phone", "name", "birthday", "role", "isArchive"]
		fields.forEach((field) => {
			setIsEditable((prev) => ({ ...prev, [field]: false }))
		})
	}

	const submit: SubmitHandler<Inputs> = (data) => {
		const newEmployee = {
			changes: data,
			id: employee.id,
		}

		dispatch(updateEmployee(newEmployee))

		reset(data)
		setFieldsToNonEditable()
	}

	const resetForm = () => {
		setFieldsToNonEditable()
		reset()
	}

	const [isEditable, setIsEditable] = useState({
		phone: false,
		name: false,
		birthday: false,
		role: false,
		isArchive: false,
	})

	const toggleEditMode = (
		field: "phone" | "name" | "birthday" | "role" | "isArchive",
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
