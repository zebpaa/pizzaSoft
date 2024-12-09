import type { Deal } from "@pages/index"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { addComment, selectors } from "@entities/commentsSlice"

import cls from "./NewComment.module.scss"

interface NewCommentProps {
	deal: Deal
}

const NewComment: React.FC<NewCommentProps> = ({ deal }: NewCommentProps) => {
	const [inputValue, setInputValue] = useState("")
	const dispatch = useDispatch()
	const comments = useSelector(selectors.selectAll)

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value)
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			if (inputValue.trim() !== "") {
				const maxId = Math.max(...comments.map((c) => c.id))
				const newComment = {
					id: maxId + 1,
					dealId: deal.id,
					name: inputValue,
				}
				dispatch(addComment(newComment))
				setInputValue("")
			}
		}
	}

	return (
		<div className={cls.comment__container}>
			<div className={cls.comment__heading_wrapper}>
				<h3 className={cls.comment__heading}>Комментарий</h3>
			</div>
			<div className={cls.comment__input_wrapper}>
				<input
					id="name"
					name="name"
					className={cls.comment__input}
					type="text"
					placeholder="Введите название"
					autoComplete="onChange"
					value={inputValue}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
				/>
			</div>
		</div>
	)
}

export default NewComment
