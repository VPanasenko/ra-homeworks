const TextRenderLine = ({ value, onChange }) => {
	const handleTRL = () => {
		if (textareaRef !== null && textareaRef != undefined) {
			onChange(textareaRef.value);
		}
	}

	let textareaRef = null;

	return (
		<div className="type-text">
			<textarea
				name="text"
				id="font-text"
				cols="30"
				rows="2"
				placeholder="Введите текст для футболки"
				ref={ta => textareaRef = ta}
				onChange={handleTRL.bind(this)}
				value={value}
			/>
		</div>
	);
};
