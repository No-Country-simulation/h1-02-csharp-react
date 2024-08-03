import { useCallback, useEffect} from 'react';

const TEXTAREA_PX_LINE_HEIGHT = 24;
const TEXTAREA_REM_LINE_HEIGHT = 1.5;

export default function useAutoResizeTextarea(textareaRef, value) {
	const adjustHeight = useCallback(() => {
		const textarea = textareaRef.current;
		if (textarea) {
			textarea.style.height = 'auto';
			//ScrollHeight / TEXTAREA_LINE_HEIGHT = Cantidad de lineas, que tendria que tener el textarea
			const fullLines = textarea.scrollHeight / TEXTAREA_PX_LINE_HEIGHT;
			textarea.style.height = `${fullLines * TEXTAREA_REM_LINE_HEIGHT}rem`;
		}
	}, [textareaRef]);
	useEffect(() => {
		adjustHeight();
	}, [value, adjustHeight]);
}
