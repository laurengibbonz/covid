const url = `https://api.covidtracking.com/v1/us/current.json`;

function handleErrors(response) {
	if(!response.ok) {
		throw (`${response.status}: ${response.statusText}`);
	}
	return response.json();
}

function updateUI(data) {
	console.log(data);
	let dateString = data[0].date.toString();
	let year = dateString.substr(0, 4);
	let month = dateString.substr(4, 2) - 1; //Javascript indexes date months
	let day = dateString.substr(6, 2);
	let jsDate = new Date(year, month, day).toLocaleDateString("en-US");
    document.querySelector('#content').innerHTML += jsDate;
	document.querySelector('#content').innerHTML += `<h3>${data[0].death}</h3>`;
}

function failUI(error) {
	console.log(error);
}

fetch(url)
.then(function(response) {
   return handleErrors(response);
})
.then(function(data) {
   return updateUI(data);
})
.catch(function(error) {
   return failUI(error);
});