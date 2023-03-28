const addZero = (n) => {
    return n < 10 ? '0' + n : n;
};

const days = ['Sunday ', 'Monday', 'Tuesday', 'Wednesday', 'Wednesday', 'Friday', 'Saturday'];
const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

setInterval(() => {
    const currentTime = new Date();

    let d = days[currentTime.getDay()];
    let currentDay = addZero(currentTime.getDate());
    let m = month[currentTime.getMonth()];
    let Y = currentTime.getFullYear();
    // let H = addZero(currentTime.getHours());
    // let minutes = addZero(currentTime.getMinutes());
    // let currentDateTime = `${d}, ${currentDay} ${m} ${Y} ${H}:${minutes}`;
    let currenTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById(
        'current-day'
    ).innerHTML = `${d}, ${currentDay} ${m} ${Y} <br> ${currenTime}`;
});

const getData = async () => {
    const response = await fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=London&appid=5dd90d696b4316be0dfc33d6cf84bc2b&units=metric'
    );

    return await response.json();
};

// const changeDarkLightTheme = (sunrise, sunset) => {
//     const date = Math.floor(new Date() / 1000);
//     console.log(date);
//
//     if (date >= sunrise && date < sunset) {
//         // document.getElementById(
//         //     'weather-day'
//         // ).innerHTML = `<img alt="day_state" src="../img/city_day.jpg">`;
//         console.log('day');
//     } else if (date > sunset && date < sunrise) {
//         // document.getElementById(
//         //     'weather-day'
//         // ).innerHTML = `<img alt="day_state" src="../img/city_night.jpg">`;
//         console.log('night');
//     }
// };

const parseMillisecondsIntoReadableTime = (seconds) => {
    let date = new Date(seconds * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const getDayTime = (timeSunset, timeSunrise) => {
    const timeOfSunset = new Date(timeSunset * 1000);
    const hoursOfSunset = timeOfSunset.getHours();
    const minutesOfSunset = timeOfSunset.getMinutes();
    const timeOfSunsetInMinutes = hoursOfSunset * 60 + minutesOfSunset;

    const timeOfSunrise = new Date(timeSunrise * 1000);
    const hoursOfSunrise = timeOfSunrise.getHours();
    const minutesOfSunrise = timeOfSunrise.getMinutes();
    const timeOfSunriseMinutes = hoursOfSunrise * 60 + minutesOfSunrise;

    const dayTimeInMinutes = ((timeOfSunsetInMinutes - timeOfSunriseMinutes) / 60)
        .toFixed(2)
        .split('.');
    return (realDayTime = `${dayTimeInMinutes[0]}h ${dayTimeInMinutes[1]}m`);
};

const setData = (data) => {
    const temp = document.getElementById('celsius-field');
    const maxTemp = document.getElementById('celsius-max-field');
    const minTemp = document.getElementById('celsius-min-field');
    const weather = document.getElementById('weather');
    const humidity = document.getElementById('humidity');
    const pressure = document.getElementById('pressure');
    const wind = document.getElementById('wind');
    const sunrise = document.getElementById('sunrise');
    const sunset = document.getElementById('sunset');
    const dayTime = document.getElementById('dayTime');
    temp.innerHTML = Math.floor(data.main.temp) + temp.innerHTML;
    maxTemp.innerHTML = Math.floor(data.main.temp_max) + maxTemp.innerHTML;
    minTemp.innerHTML = Math.floor(data.main.temp_min) + minTemp.innerHTML;
    weather.innerHTML = `<div class="icon ${data.weather[0].main.toLocaleLowerCase()}"></div>${
        data.weather[0].main
    }`;
    humidity.innerHTML = data.main.humidity + humidity.innerHTML;
    pressure.innerHTML = data.main.pressure + pressure.innerHTML;
    wind.innerHTML = data.wind.speed + wind.innerHTML;
    sunrise.innerHTML = parseMillisecondsIntoReadableTime(data.sys.sunrise) + sunrise.innerHTML;
    sunset.innerHTML = parseMillisecondsIntoReadableTime(data.sys.sunset) + sunset.innerHTML;
    // changeDarkLightTheme(data.sys.sunrise, data.sys.sunset);
    dayTime.innerHTML = getDayTime(data.sys.sunset, data.sys.sunrise);
};

window.addEventListener('load', () => {
    getData().then((data) => {
        setData(data);
        console.log('TM: data', data);
    });
});
