import type { Employee } from "../../pages"

import { useDropdown } from "./hook/useDropdown"
import cls from "./Dropdown.module.scss"

interface DropdownProps {
	title: string
	id: keyof Employee
	isEditable: boolean
	toggleEditMode: any
}

const Dropdown: React.FC<DropdownProps> = ({
	title,
	id,
	isEditable,
	toggleEditMode,
}) => {
	const {
		register,
		containerWidth,
		handleOptionClick,
		options,
		currentValue,
		toggleDropdown,
		isOpen,
		roleMap,
	} = useDropdown(id)

	return (
		<div className={cls.customInput}>
			<div className={cls.customInput__header}>
				<h3 className={cls.customInput__title}>{title}</h3>
				<button
					className={cls.customInput__button}
					type="button"
					onClick={toggleEditMode}
				>
					{isEditable ? "Отменить" : "Изменить"}
				</button>
			</div>
			<div className={cls.customInput__inputContainer}>
				<div
					className={cls.customInput__dropdown}
					style={{
						backgroundColor: isEditable
							? "rgb(194, 194, 194)"
							: "rgb(237, 237, 237)",
						cursor: isEditable ? "pointer" : "not-allowed",
					}}
					onClick={toggleDropdown}
				>
					<span {...register(id)}>
						{roleMap[currentValue as keyof typeof roleMap]}
					</span>
					{isEditable && (
						<svg
							className={`${cls.dropdownIcon} ${isOpen ? cls.open : ""}`}
							width="24"
							height="24"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M7 10l5 5 5-5z" fill="black" />
						</svg>
					)}
				</div>
				{isOpen && isEditable && (
					<div
						className={cls.customInput__options}
						id="container"
						style={{ height: `calc(${options.length * 40}px - 27px)` }}
					>
						<div>
							{options
								.filter(
									(option) =>
										option !== roleMap[currentValue as keyof typeof roleMap],
								)
								.map((option) => (
									<div
										key={option}
										style={{ width: `calc(${containerWidth}px - 14px)` }}
										className={cls.customInput__option}
										onClick={() => handleOptionClick(option)}
									>
										{option}
									</div>
								))}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Dropdown
