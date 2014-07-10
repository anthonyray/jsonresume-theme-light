function duration(startDate,endDate){
	var startingDate = new Date(startDate).getTime();
	var endingDate = new Date(endDate).getTime();

	var seconds = (endingDate - startingDate) / 1000
	var days = Math.ceil(seconds / 3600*24);
	var months = Math.floor(seconds / (3600*24*30.5));
	var years = Math.floor(seconds / (3600*24*365.25));

	if (years > 0) return years + ' years'
	else return months + ' months'
}

module.exports.duration = duration;