export function formatDate(dateString: string): string {
	const date = new Date(dateString);
	const today = new Date();

	const padZero = (num: number): string => {
		return num.toString().padStart(2, "0");
	};

	if (
		date.getDate() === today.getDate() &&
		date.getMonth() === today.getMonth() &&
		date.getFullYear() === today.getFullYear()
	) {
		return date.toLocaleTimeString(); // Return time if date is today
	} else if (date.getFullYear() !== today.getFullYear()) {
		return `${padZero(date.getDate())}/${padZero(
			date.getMonth() + 1
		)}/${date.getFullYear()}`; // Return full dd/mm/yy if year is different
	} else {
		return `${padZero(date.getDate())}/${padZero(date.getMonth() + 1)}`; // Return dd/mm if date is within the current year
	}
}
