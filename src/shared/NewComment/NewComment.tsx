import type { Deal } from "../../pages"

import { useNewComments } from "./hook/useNewComment"
import cls from "./NewComment.module.scss"

interface NewCommentProps {
	deal: Deal
}

const NewComment: React.FC<NewCommentProps> = ({ deal }: NewCommentProps) => {
	const { handleSubmit, register, errors, onSubmit } = useNewComments(deal)

	return (
		<div className={cls.comment__container}>
			<div className={cls.comment__heading_wrapper}>
				<h3 className={cls.comment__heading}>Комментарий</h3>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={cls.comment__input_wrapper}>
					<input
						id="name"
						{...register("name")}
						className={`${cls.comment__input} ${errors.name?.message ? cls.invalid : ""}`}
						type="text"
						placeholder="Введите название"
						autoComplete="onChange"
					/>
				</div>
				{errors.name && (
					<p className={cls.comment__feedback}>{errors.name?.message}</p>
				)}
			</form>
		</div>
	)
}

export default NewComment
