import type { Deal } from "../../pages"

import { Button, ModalContainer } from "../../shared"
import { useAddDeal } from "./hook/useAddDeal"
import cls from "./AddDeal.module.scss"

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
	const { handleSubmit, register, errors, handleClick, onSubmit } = useAddDeal({
		deals,
		onHide,
	})

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
					<div onClick={handleClick}>
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
