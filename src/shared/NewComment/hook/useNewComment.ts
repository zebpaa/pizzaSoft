import type { Deal } from "@pages/index"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { addComment, selectors } from "@entities/commentsSlice"

export const useNewComments = (deal: Deal) => {
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

	return { inputValue, handleInputChange, handleKeyDown }
}
