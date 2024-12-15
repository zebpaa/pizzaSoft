import type { Deal } from "../../pages"

import { CommentsList, NewComment } from "../../shared"
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
