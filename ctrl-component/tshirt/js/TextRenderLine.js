const TextRenderLine = ({ value, onChange }) => {

	const filterInputValue = function (nonFilteredValue) {
		const re = /[^a-zA-Z( )(\r\n|\r|\n))]+/g;
		return nonFilteredValue.slice(0).replace(re, '').toLowerCase();
	}

	const handleTRL = (event) => {
		onChange(filterInputValue(event.currentTarget.value));
	}

	return (
		<div className="type-text">
			<textarea
				name="text"
				id="font-text"
				cols="30"
				rows="2"
				placeholder="Введите текст для футболки"
				onChange={handleTRL}
				value={value}
			/>
		</div>
	);
};
