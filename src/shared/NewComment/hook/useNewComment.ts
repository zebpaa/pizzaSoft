import type { Deal } from "@pages/index"

import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { addComment, selectors } from "@entities/commentsSlice"

interface FormInput {
	name: string
}

export const useNewComments = (deal: Deal) => {
	const comments = useSelector(selectors.selectAll)

	const schema = yup.object({
		name: yup
			.string()
			.trim()
			.required("Это обязательное поле")
			.min(3, "Минимальная длина: 3")
			.max(20, "Максимальная длина: 20")
			.notOneOf(
				comments.map((c) => c.name),
				"Такой комментарий уже есть",
			),
	})

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	})

	const onSubmit = ({ name }: FormInput) => {
		const maxId = Math.max(...comments.map((c) => c.id))
		const newComment = {
			id: maxId + 1,
			dealId: deal.id,
			name: name,
		}
		dispatch(addComment(newComment))
		reset()
	}

	const dispatch = useDispatch()

	return {
		handleSubmit,
		register,
		errors,
		onSubmit,
	}
}
