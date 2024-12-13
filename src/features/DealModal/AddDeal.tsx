import type { Deal } from "@pages/index"

import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { addDeal } from "@entities/dealsSlice"
import { Button, ModalContainer } from "@shared/index"

import cls from "./AddDeal.module.scss"

interface IFormInput {
	name: string
}

type AddDealProps = {
	isOpen: boolean
	onHide: (value: boolean) => void
	deals: Deal[]
}

const AddDeal: React.FC<AddDealProps> = ({
	deals,
	isOpen,
	onHide,
}: AddDealProps) => {
	const schema = yup.object({
		name: yup
			.string()
			.trim()
			.required("Это обязательное поле")
			.min(3, "Минимальная длина: 3")
			.max(20, "Максимальная длина: 20")
			.notOneOf(
				deals.map((d) => d.name),
				"Такое название сделки уже есть",
			),
	})

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>({
		resolver: yupResolver(schema),
	})

	const onSubmit = ({ name }: IFormInput) => {
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
		onHide(false)
	}

	const dispatch = useDispatch()

	return (
		<ModalContainer isOpen={isOpen} onHide={onHide} title="Создать сделку">
			<p className={cls.modal__label}>название</p>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					{...register("name")}
					className={`${cls.modal__input} ${errors.name?.message ? cls.invalid : ""}`}
					type="text"
					placeholder="Введите название"
				/>
				{errors.name && (
					<p className={cls.modal__feedback}>{errors.name?.message}</p>
				)}
				<div className={cls.modal__btnGroup}>
					<Button type="submit" variant="active" width="290">
						Создать
					</Button>
					<div onClick={() => onHide(false)}>
						<Button variant="cancel" width="290">
							Отмена
						</Button>
					</div>
				</div>
			</form>
		</ModalContainer>
	)
}

export default AddDeal
