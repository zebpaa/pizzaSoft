import type { Deal } from "@pages/index"
import type { EntityId } from "@reduxjs/toolkit"
import type { FormEvent } from "react"

import { useDispatch } from "react-redux"

import { addDeal } from "@entities/dealsSlice"
import { Button, ModalContainer } from "@shared/index"

import cls from "./AddDeal.module.scss"

type AddDealProps = {
	isOpen: boolean
	onHide: (value: boolean) => void
	deals: Deal[] | { id: EntityId }[]
}

const AddDeal: React.FC<AddDealProps> = ({
	deals,
	isOpen,
	onHide,
}: AddDealProps) => {
	const dispatch = useDispatch()

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const name = String(
			new FormData(e.target as HTMLFormElement).get("name"),
		).trim()

		if (name !== "") {
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
		} else {
			alert("Название не может быть пустым")
			return
		}
	}

	return (
		<ModalContainer isOpen={isOpen} onHide={onHide} title="Создать сделку">
			<p className={cls.modal__label}>название</p>
			<form onSubmit={handleSubmit}>
				<input
					name="name"
					className={cls.modal__input}
					type="text"
					placeholder="Введите название"
					required
				/>
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
