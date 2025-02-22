import { AddDeal } from "../../features"
import { Button, DealsTable } from "../../shared"
import { useDealsList } from "./hook/useDealsList"
import cls from "./DealsList.module.scss"

const DealsList: React.FC = () => {
	const { isOpen, setIsOpen, activeTab, setActiveTab, deals } = useDealsList()

	return (
		<>
			<AddDeal isOpen={isOpen} onHide={setIsOpen} deals={deals} />
			<div className={cls.content}>
				<div className={cls.createButton}>
					<Button width="368" onClick={() => setIsOpen(true)}>
						Создать
					</Button>
				</div>

				<div className={cls.content__buttonGroup}>
					<Button
						width="300"
						variant={activeTab === "all" ? "active" : undefined}
						onClick={() => setActiveTab("all")}
					>
						Все
					</Button>

					<Button
						width="300"
						variant={activeTab === "archive" ? "active" : undefined}
						onClick={() => setActiveTab("archive")}
					>
						Архив
					</Button>
				</div>
				<DealsTable deals={deals} activeTab={activeTab} />
			</div>
		</>
	)
}

export default DealsList
