import type { Deal } from "@pages/index"

import { useNewComments } from "./hook/useNewComment"
import cls from "./NewComment.module.scss"

interface NewCommentProps {
	deal: Deal
}

const NewComment: React.FC<NewCommentProps> = ({ deal }: NewCommentProps) => {
	const { inputValue, handleInputChange, handleKeyDown } = useNewComments(deal)

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
