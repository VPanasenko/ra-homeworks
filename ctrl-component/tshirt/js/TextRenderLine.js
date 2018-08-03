const TextRenderLine = ({ value, onChange }) => {
	handleTRL = () => {
		if (textareaRef) {
			onChange(textareaRef.value);
		}
	}

	textareaRef = null;

	return (
		<div className="type-text">
			<textarea
				name="text"
				id="font-text"
				cols="30"
				rows="2"
				placeholder="Введите текст для футболки"
				ref={ta => textareaRef = ta}
				onChange={handleTRL}
				value={value}
			/>
		</div>
	);
};
