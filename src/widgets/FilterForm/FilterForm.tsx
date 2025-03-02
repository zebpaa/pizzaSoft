// сортировки списка сотрудников по имени и дате рождения
// по должности и их статусу.
// Должность - выпадающий список, содержащий (Повар, Официант, Водитель).

// import { useDispatch, useSelector } from "react-redux"

// import { RootState } from "../../app/store"
// import { setSort, updateFilters } from "../../features/employees/employeesSlice"
import cls from "./FilterForm.module.scss"

const FilterForm: React.FC = () => {
	// const options = ["Повар", "Официант", "Водитель"]

	// const dispatch = useDispatch()
	// const { role: selectedRole, isArchive } = useSelector(
	// 	(state: RootState) => state.employees.filters,
	// )
	// const { sortBy } = useSelector((state: RootState) => state.employees)

	const roleOptions = [
		{ value: "all", label: "Все должности" },
		{ value: "cook", label: "Повар" },
		{ value: "waiter", label: "Официант" },
		{ value: "driver", label: "Водитель" },
	]

	const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		// dispatch(updateFilters({ role: e.target.value }))
	}

	const handleArchiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// dispatch(updateFilters({ isArchive: e.target.checked }))
	}

	const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		// dispatch(setSort(e.target.value))
	}

	return (
		<div className={cls.content}>
			<div className={cls.filterForm}>
				<div className={cls.filterGroup}>
					<label>Должность:</label>
					<select
						// value={selectedRole}
						onChange={handleRoleChange}
						className={cls.select}
					>
						{roleOptions.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</div>

				<div className={cls.filterGroup}>
					<label>Сортировка:</label>
					<select
						// value={sortBy}
						onChange={handleSortChange}
						className={cls.select}
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
							// checked={isArchive}
							onChange={handleArchiveChange}
						/>
						<span>Показать архивных</span>
					</label>
				</div>
			</div>
		</div>
	)
}

export default FilterForm
