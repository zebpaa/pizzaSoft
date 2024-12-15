import type { Deal } from "../../../pages"

import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { addDeal } from "../../../entities/dealsSlice"

interface FormInput {
	name: string
}

interface useInputArgs {
	deals: Deal[]
	onHide: (value: boolean) => void
}

export const useAddDeal = ({ deals, onHide }: useInputArgs) => {
	const schema = yup.object({
		name: yup
			.string()
			.trim()
			.required("Это обязательное поле")
			.min(3, "Минимальная длина: 3")
			.max(20, "Максимальная длина: 20")
			.notOneOf(
				deals.map((d: Deal) => d.name),
				"Такая сделка уже есть",
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
			deals.length > 0 ? Math.max(...deals.map((d) => Number(d.id))) + 1 : 1

		const newDeal: Deal = {
			id: newId,
			name,
			status: "Новый",
			creationDate: String(new Date().toLocaleDateString()),
			phone: "",
			budget: "",
			fullName: "",
		}
		dispatch(addDeal(newDeal))
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
