import { useEffect } from "react"

interface useModalContainerArgs {
	isOpen: boolean
	onHide: (value: boolean) => void
}

export const useModalContainer = ({
	isOpen,
	onHide,
}: useModalContainerArgs) => {
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

	const handleOverlayClick = () => {
		onHide(false)
	}

	const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation() // Останавливаем всплытие события, чтобы клик внутри контейнера не закрывал модалку
	}

	const modalRoot = document.getElementById("modal-root")

	return { handleOverlayClick, handleContainerClick, modalRoot }
}
