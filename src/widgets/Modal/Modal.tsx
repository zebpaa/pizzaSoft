import type { Deal } from "@pages/index"
import type { EntityId } from "@reduxjs/toolkit"
import type { FormEvent } from "react"

import { useEffect } from "react"
import { createPortal } from "react-dom"
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

	// Отключаем прокрутку страницы
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden"
		} else {
			document.body.style.overflow = "auto"
		}

		return () => {
			document.body.style.overflow = "auto"
		}
	}, [isOpen])

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

	const handleOverlayClick = () => {
		onHide(false)
	}

	const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation() // Останавливаем всплытие события, чтобы клик внутри контейнера не закрывал модалку
	}

	const modalRoot = document.getElementById("modal-root")

	if (!modalRoot) {
		return null
	}

	return createPortal(
		<div className={cls.modal__overlay} onClick={handleOverlayClick}>
			<div className={cls.modal__container} onClick={handleContainerClick}>
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
		</div>,
		modalRoot,
	)
}

export default Modal
