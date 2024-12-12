import type { Deal } from "@pages/index"

import { CommentsList, NewComment } from "@shared/index"

import cls from "./Comments.module.scss"

interface CommentsProps {
	deal: Deal
}

const Comments: React.FC<CommentsProps> = ({ deal }: CommentsProps) => {
	return (
		<div className={cls.comments}>
			<div className={cls.comments__newComment}>
				<NewComment deal={deal} />
			</div>
			<CommentsList deal={deal} />
		</div>
	)
}

export default Comments
