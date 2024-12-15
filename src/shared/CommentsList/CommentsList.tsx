import type { Deal } from "../../pages"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { addComments, selectors } from "../../entities/commentsSlice"
import { comments as mockComments } from "../../pages"
import cls from "./CommentsList.module.scss"

interface CommentsListProps {
	deal: Deal
}

const CommentsList: React.FC<CommentsListProps> = ({
	deal,
}: CommentsListProps) => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(addComments(mockComments))
	}, [dispatch])

	const comments = useSelector(selectors.selectAll)

	return (
		<div className={cls.commentsList}>
			<ul className={cls.commentsList__list}>
				{comments
					.filter((c) => c.dealId === deal.id)
					.map((c) => (
						<li key={c.id} className={cls.commentsList__item}>
							{c.name}
						</li>
					))}
			</ul>
		</div>
	)
}

export default CommentsList
