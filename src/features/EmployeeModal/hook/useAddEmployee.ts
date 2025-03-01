import type { Employee } from "../../../pages"

import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { addDeal } from "../../../entities/dealsSlice"

interface FormInput {
	name: string
}

interface useInputArgs {
	employees: Employee[]
	onHide: (value: boolean) => void
}

export const useAddEmployee = ({ employees, onHide }: useInputArgs) => {
	const schema = yup.object({
		name: yup
			.string()
			.trim()
			.required("Обязательное поле")
			.min(3, "Мин. длина: 3")
			.max(20, "Макс. длина: 20")
			.notOneOf(
				employees.map((e: Employee) => e.name),
				"Такой сотрудник уже есть",
			),
	})

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormInput>({
		resolver: yupResolver(schema),
	})

	const onSubmit = ({ name }: FormInput) => {
		const newId =
			employees.length > 0
				? Math.max(...employees.map((e) => Number(e.id))) + 1
				: 1

		const newEmployee: Employee = {
			id: newId,
			name,
			role: "waiter",
			phone: "",
			birthday: "03.12.1994",
		}

		// dispatch(addDeal(newEmployee))
		reset()
		onHide(false)
	}

	const dispatch = useDispatch()

	const handleClick = () => {
		reset()
		onHide(false)
	}

	return {
		handleClick,
		onSubmit,
		handleSubmit,
		register,
		errors,
	}
}
