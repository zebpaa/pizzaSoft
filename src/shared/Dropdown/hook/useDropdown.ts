import { useLayoutEffect, useState } from "react"
import { useFormContext } from "react-hook-form"

export const useDropdown = (id: string) => {
	const { register, setValue, watch } = useFormContext()
	const [isOpen, setIsOpen] = useState(false)
	const [containerWidth, setContainerWidth] = useState(0)

	const options = ["Водитель", "Официант", "Повар"]

	const currentValue = watch(id) // Получаем текущее значение из формы

	const toggleDropdown = () => {
		setIsOpen((prev: any) => !prev)
	}

	type RoleMap = {
		driver: string
		waiter: string
		cook: string
	}

	const roleMap: RoleMap = {
		driver: "Водитель",
		waiter: "Официант",
		cook: "Повар",
	}

	const handleOptionClick = (russianRole: string) => {
		const englishRole = Object.entries(roleMap).find(
			([, value]) => value === russianRole,
		)?.[0]

		if (englishRole) {
			setValue(id, englishRole, { shouldDirty: true })
		}
		setIsOpen(false)
	}

	useLayoutEffect(() => {
		const container = document.getElementById("container")

		const updateWidth = () => {
			if (container) {
				const { width } = container.getBoundingClientRect()
				setContainerWidth(width)
			}
		}

		if (isOpen) {
			updateWidth()
		}

		// Обработчик изменения размера окна
		const handleResizeWindow = () => {
			updateWidth()
		}

		window.addEventListener("resize", handleResizeWindow)

		return () => {
			window.removeEventListener("resize", handleResizeWindow)
		}
	}, [isOpen])

	return {
		register,
		containerWidth,
		handleOptionClick,
		options,
		currentValue,
		toggleDropdown,
		isOpen,
		roleMap,
	}
}
