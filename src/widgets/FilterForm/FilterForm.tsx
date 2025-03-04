import type { RootState } from "../../entities/index"

import { useDispatch, useSelector } from "react-redux"

import {
	setFilterArchive,
	setFilterRole,
	setSort,
} from "../../entities/employeesSlice"
import cls from "./FilterForm.module.scss"

const FilterForm: React.FC = () => {
	const dispatch = useDispatch()
	const { role, isArchive } = useSelector(
		(state: RootState) => state.employees.filters,
	)

	const sortBy = useSelector((state: RootState) => state.employees.sortBy)

	const roleOptions = [
		{ value: "all", label: "Все должности" },
		{ value: "cook", label: "Повар" },
		{ value: "waiter", label: "Официант" },
		{ value: "driver", label: "Водитель" },
	]

	const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(setFilterRole(e.target.value))
	}

	const handleArchiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setFilterArchive(e.target.checked))
	}

	const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(setSort(e.target.value))
	}

	return (
		<div className={cls.content}>
			<div className={cls.filterForm}>
				<div className={cls.filterGroup}>
					<label htmlFor="filterRole">Должность:</label>
					<select
						value={role}
						onChange={handleRoleChange}
						className={cls.select}
						id="filterRole"
					>
						{roleOptions.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</div>

				<div className={cls.filterGroup}>
					<label htmlFor="sortBy">Сортировка:</label>
					<select
						value={sortBy}
						onChange={handleSortChange}
						className={cls.select}
						id="sortBy"
					>
						<option value="name_asc">По имени (А-Я)</option>
						<option value="name_desc">По имени (Я-А)</option>
						<option value="birthday_asc">
							По дате рождения (старые → новые)
						</option>
						<option value="birthday_desc">
							По дате рождения (новые → старые)
						</option>
					</select>
				</div>

				<div className={cls.checkboxGroup}>
					<label>
						<input
							type="checkbox"
							checked={isArchive}
							onChange={handleArchiveChange}
							id="filterArchive"
						/>
						<span>Показать архивных</span>
					</label>
				</div>
			</div>
		</div>
	)
}

export default FilterForm
