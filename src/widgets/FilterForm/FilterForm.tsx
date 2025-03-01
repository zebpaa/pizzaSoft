import cls from "./FilterForm.module.scss"

// сортировки списка сотрудников по имени и дате рождения
// по должности и их статусу.
// Должность - выпадающий список, содержащий (Повар, Официант, Водитель).

const FilterForm: React.FC = () => {
	const options = ["Повар", "Официант", "Водитель"]

	return (
		<div className={cls.content}>
			<div className={cls.filterForm}>
				<select>{options && options.map((o) => <option>{o}</option>)}</select>
				<label htmlFor="">
					<span>в архиве</span>
					<input type="checkbox" />
				</label>
			</div>
		</div>
	)
}

export default FilterForm
