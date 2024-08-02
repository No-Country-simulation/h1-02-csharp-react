import { useEffect } from "react";

function isTouchDevice() {
	return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

const useClickOutside = (ref, handler, ignoreRef) => {
	useEffect(() => {
        
		const isTouchAvalaible = isTouchDevice();
		const listener = (event) => {
			event.stopPropagation();
			const element = event.target;
            //Se ejecuta cuando se clickea fuera del elemento referido. El ignore sirve para ignorar tambien un elemento del "out side"
			if (ref.current && !ref.current.contains(element) && (!ignoreRef || !ignoreRef.current || !ignoreRef.current.contains(element))) handler();
		};

		document.addEventListener('mousedown', listener);
        //Si el dispositivo soporta touch le meto el listener para touch
		if (isTouchAvalaible) document.addEventListener('touchstart', listener);
		return () => {
			document.removeEventListener('mousedown', listener);
			if (isTouchAvalaible) document.removeEventListener('touchstart', listener);
		};
	}, [ref, ignoreRef, handler]);
};

export default useClickOutside;