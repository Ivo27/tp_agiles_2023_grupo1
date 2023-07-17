export async function copyToClipboard(text: string) {
	try {
		await navigator.clipboard.writeText(text);
	} catch (err) {
		console.error('Failed to copy text: ', err);
	}
}

export const validateMail = (mail: string): boolean => {
	return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(mail);
};
