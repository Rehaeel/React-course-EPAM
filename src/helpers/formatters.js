export const formatDuration = (duration) => {
	const hours = Math.trunc(duration / 60)
		.toString()
		.padStart(2, '0');
	const minutes = (duration % 60).toString().padStart(2, '0');
	return ` ${hours}:${minutes} `;
};

const padTwoPlaces = (input) => {
	return input.toString().padStart(2, '0');
};

export const convertDate = (date) => {
	let [day, month, year] = date.split('/');
	day = padTwoPlaces(day);
	month = padTwoPlaces(month);
	year = padTwoPlaces(year);

	return `${day}.${month}.${year}`;
};
