const useBlobToBase64 = (blob)=>{
    return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			if (typeof reader.result === 'string') {
				const base64String = reader.result.split(',')[1];
				resolve(base64String);
			} else {
				reject(new Error('Failed to read blob as string'));
			}
		};
		reader.onerror = reject;
		reader.readAsDataURL(blob);
	});
}

export default useBlobToBase64;