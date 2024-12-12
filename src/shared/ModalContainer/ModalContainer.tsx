import type { ReactNode } from "react"

import { createPortal } from "react-dom"

import { useModalContainer } from "./hook/useModalContainer"
import cls from "./ModalContainer.module.scss"

type ModalContainerProps = {
	isOpen: boolean
	onHide: (value: boolean) => void
	title: string
	children: ReactNode
}

const ModalContainer: React.FC<ModalContainerProps> = ({
	isOpen,
	onHide,
	title,
	children,
}: ModalContainerProps) => {
	const { handleOverlayClick, handleContainerClick, modalRoot } =
		useModalContainer({ isOpen, onHide })

	if (!isOpen || !modalRoot) {
		return null
	}

	return createPortal(
		<div className={cls.modal__overlay} onClick={handleOverlayClick}>
			<div className={cls.modal__container} onClick={handleContainerClick}>
				<div className={cls.modal__header}>
					<h5 className={cls.modal__title}>{title}</h5>
				</div>
				{children}
			</div>
		</div>,
		modalRoot,
	)
}

export default ModalContainer
