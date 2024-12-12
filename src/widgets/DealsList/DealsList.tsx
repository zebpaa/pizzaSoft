import { AddDeal } from "@features/index"

import { Button, DealsTable } from "../../shared"
import { useDealsList } from "./hook/useDealsList"
import cls from "./DealsList.module.scss"

const DealsList: React.FC = () => {
	const { isOpen, setIsOpen, activeTab, setActiveTab, deals } = useDealsList()

	return (
		<>
			<AddDeal isOpen={isOpen} onHide={setIsOpen} deals={deals} />
			<div className={cls.content}>
				<div
					className={cls.content__createButton}
					onClick={() => setIsOpen(true)}
				>
					<Button width="368">Создать</Button>
				</div>

				<div className={cls.content__buttonGroup}>
					<div onClick={() => setActiveTab("all")}>
						<Button
							width="300"
							variant={activeTab === "all" ? "active" : undefined}
						>
							Все
						</Button>
					</div>
					<div onClick={() => setActiveTab("archive")}>
						<Button
							width="300"
							variant={activeTab === "archive" ? "active" : undefined}
						>
							Архив
						</Button>
					</div>
				</div>
				<DealsTable deals={deals} activeTab={activeTab} />
			</div>
		</>
	)
}

export default DealsList
