let cityName = document.querySelector(".city-name h1");
let temperature = document.querySelector(".temperature span");
let sensationTemperature = document.querySelector(
	".sensation-temperature span"
);
let weatherIcon = document.querySelector(".weather-icon");
let weatherDescription = document.querySelector(".weather-icon--description");
let humidity = document.querySelector(".humidity span");
let pressure = document.querySelector(".pressure span");
let windSpeed = document.querySelector(".wind-speed");
let windDeg = document.querySelector(".wind-deg");
let windGust = document.querySelector(".wind-gust span");

const form = document.querySelector(".form");
let select = document.createElement("select");

const param = {
	url: "https://api.openweathermap.org/data/2.5/",
	appid: "2333f8550bd02a74a156139d04db9709",
	imgUrl: "https://openweathermap.org/img/wn/",
	imgFormat: "@2x.png",
};

let cities = [
	{
		id: 702550,
		name: "Lviv",
	},
	{
		id: 703448,
		name: "Kyiv",
	},
	{
		id: 292223,
		name: "Dubai",
	},
	{
		id: 3117735,
		name: "Madrid",
	},
	{
		id: 5879092,
		name: "Alaska",
	},
	{
		id: 6542283,
		name: "Milano",
	},
];

// create Select
function createSelect(arr) {


	for (let i = 0; i < arr.length; i++) {
		let option = document.createElement("option");

		// option.setAttribute("id", `${arr[i].id}`);
		option.setAttribute("class", `country-city`);
		option.value = `${arr[i].name}`;
		option.innerText = `${arr[i].name}`;
		select.appendChild(option);
	}
	select.classList.add("select-city");
	form.classList.add("form");
	form.innerText = "Select your city:";
	form.appendChild(select);
}

createSelect(cities);


// return ID city
function cityID(str) {
	let arr = cities;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].name.toLowerCase() === str.toLowerCase()) return arr[i].id;
	}
}

function celsius(temp) {
	let celsius = temp - 273.15;
	let fahrenheit = (temp - 273.15) * 1.8 + 32;
	if (document.querySelector(".checkbox").checked) return `${Math.round(fahrenheit)}`;
	return `${Math.round(celsius)}`;
}

function mToKm(speed) {
	let sp = speed * 3.6;
	return sp.toFixed(2);
}


// getWeather - gets the weather forecast (data)
function getWeather(id) {
	27
	//  API
	fetch(`${param.url}weather?id=${id}&APPID=${param.appid}`)
		.then((weather) => {
			return weather.json();
		})
		.then(showWeather);
}


function showWeather(data) {
	// here you display on the page

	cityName.innerHTML = `${data.name}   <sup>${data.sys.country}</sup>`;
	temperature.innerHTML = `${celsius(data.main.temp)}&deg;`;
	sensationTemperature.innerHTML = `${celsius(data.main.feels_like)}&deg;`;
	weatherIcon.innerHTML = `<img src="${param.imgUrl}${data.weather[0]["icon"]}${param.imgFormat}" alt="${data.weather[0]["main"]}">`;
	weatherDescription.innerText = `${data.weather[0]["description"]}`;
	humidity.innerHTML = `${Math.round(data.main.humidity)} %`;
	pressure.innerText = `${data.main.pressure.toFixed(2)} hPa`;
	windSpeed.innerHTML = `${mToKm(data.wind.speed)} km/h`;
	windGust.innerHTML = `${mToKm(data.wind.gust)} km/h`;
	windDeg.style.transform = `rotate(${data.wind.deg}deg)`;

	// console.log(data);
}

document.querySelector(".checkbox").onclick = () => {
	let check = document.querySelector(".checkbox");
	let degreeCF = document.querySelector(".degree-CF");
	let degreeIcon = document.querySelector(".degree-icon");

	if (check.checked) {
		degreeIcon.classList.add("input-active");
		degreeCF.innerText = "F";
		newCity(select.value);
	} else {
		degreeIcon.classList.remove("input-active");
		degreeCF.innerText = "C";
		newCity(select.value);
	}

};


document.querySelector('.next-btn').onclick = () => {
	let op = document.querySelectorAll('.country-city');
	for (let i = 0; i < op.length; i++) {
		if (select.value === op[i].value) {
			newCity(op[i + 1].value)
			return select.value = op[i + 1].value;
		}
		if (i === op.length - 2) {
			newCity(op[0].value);
			return select.value = op[0].value;
		}
	}
};


document.querySelector('.prew-btn').onclick = () => {
	let op = document.querySelectorAll('.country-city');
	for (let i = op.length - 1; i >= 0; i--) {
		if (select.value === op[i].value) {
			newCity(op[i - 1].value);
			return select.value = op[i - 1].value;
		}
		if (i === 1) {
			newCity(op[op.length - 1].value);
			return select.value = op[op.length - 1].value;
		}
	}
};

document.querySelector(".select-city").onchange = () => {
	newCity(select.value);
}

function newCity(val) {
	getWeather(cityID(val));
}

getWeather(cityID(select.value));

// //  API
// fetch("http://api.openweathermap.org/data/2.5/weather?id=702550&APPID=2333f8550bd02a74a156139d04db9709")
// 	.then(function (resp) {
// 		return resp.json();
// 	})
// 	.then(function (data) {
// 		console.log(data.name);
// 	})
//
