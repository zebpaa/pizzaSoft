import DealInfo from "./DealInfo/DealInfo"
import Home from "./Home/Home"

export type Deal = {
	id: number
	name: string
	status: "Новый" | "Провал" | "Успешно" | "В работе" | "Почти завершен"
	creationDate: string
	phone: string
	budget: string
	fullName: string
}

export type Comment = {
	id: number
	dealId: number
	name: string
}

export const deals: Deal[] = [
	{
		id: 1,
		name: "Тест",
		status: "Новый",
		creationDate: "30.01.2024",
		phone: "+7 (998) 876-54-32",
		budget: "17000 руб.",
		fullName: "Олег Олегович Олегов",
	},
	{
		id: 2,
		name: "Тест1",
		status: "Новый",
		creationDate: "31.01.2024",
		phone: "",
		budget: "",
		fullName: "",
	},
	{
		id: 3,
		name: "Тест2",
		status: "В работе",
		creationDate: "31.01.2024",
		phone: "",
		budget: "",
		fullName: "",
	},
	{
		id: 4,
		name: "Тест3",
		status: "В работе",
		creationDate: "31.01.2024",
		phone: "",
		budget: "",
		fullName: "",
	},
	{
		id: 5,
		name: "Тест4",
		status: "Почти завершен",
		creationDate: "31.01.2024",
		phone: "",
		budget: "",
		fullName: "",
	},
	{
		id: 6,
		name: "Тест5",
		status: "Провал",
		creationDate: "31.01.2024",
		phone: "",
		budget: "",
		fullName: "",
	},
	{
		id: 7,
		name: "Тест6",
		status: "Успешно",
		creationDate: "31.01.2024",
		phone: "",
		budget: "",
		fullName: "",
	},
]

export const comments: Comment[] = [
	{
		id: 1,
		dealId: 1,
		name: "Текст комментария 1",
	},
	{
		id: 2,
		dealId: 1,
		name: "Текст",
	},
	{
		id: 3,
		dealId: 1,
		name: "Текст комментария 2",
	},
	{
		id: 4,
		dealId: 1,
		name: "Текст 5",
	},
	{
		id: 5,
		dealId: 2,
		name: "Текст комментария 2",
	},
	{
		id: 6,
		dealId: 2,
		name: "Текст комментария 7",
	},
	{
		id: 7,
		dealId: 3,
		name: "Текст комментария 3",
	},
	{
		id: 8,
		dealId: 4,
		name: "Текст комментария 4",
	},
	{
		id: 9,
		dealId: 5,
		name: "Текст комментария 5",
	},
	{
		id: 10,
		name: "Текст комментария 6",
		dealId: 6,
	},
	{
		id: 11,
		dealId: 7,
		name: "Текст комментария 10",
	},
]

export { Home, DealInfo }
