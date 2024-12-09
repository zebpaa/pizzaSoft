import type { Deal } from "@pages/index"
import type { EntityId } from "@reduxjs/toolkit"
import type { FormEvent } from "react"

import { useDispatch } from "react-redux"

import { addDeal } from "@entities/dealsSlice"
import { Button } from "@shared/index"

import cls from "./Modal.module.scss"

type ModalProps = {
	isOpen: boolean
	onHide: (value: boolean) => void
	deals: Deal[] | { id: EntityId }[]
}

const Modal: React.FC<ModalProps> = ({ isOpen, onHide, deals }: ModalProps) => {
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

	if (!isOpen) {
		return null
	}

	return (
		<div className={cls.modal__overlay}>
			<div className={cls.modal__container}>
				<div className={cls.modal__header}>
					<h5 className={cls.modal__title}>Создать сделку</h5>
				</div>
				<div className={cls.modal__body}>
					<p className={cls.modal__label}>название</p>
				</div>
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
			</div>
		</div>
	)
}

export default Modal
