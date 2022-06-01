let latitude = null;
let longitude = null;
let locationStr = "";

let dateObj = new Date();
let month = dateObj.getUTCMonth() + 1; //months from 1-12
let day = dateObj.getUTCDate();
let year = dateObj.getUTCFullYear();

let date = `${month}/${day}/${year}`;
console.log(date);
async function getLocation() {
  let data = await fetch(
    "https://se-weather-api.herokuapp.com/api/v1/geo?zip_code=10019"
  );
  response = await data.json();
  console.log(response);
  latitude = response.latitude;
  longitude = response.longitude;
  locationStr = response.region;

  getWeather(latitude, longitude, locationStr);
}

async function getWeather(latitude, longitude, locationStr) {
  let data = await fetch(
    `https://se-weather-api.herokuapp.com/api/v1/forecast?latitude=${latitude}&longitude=${longitude}&date=${date}`
  );
  response = await data.json();
  console.log(response.daily.data);
  let $htmlWrapper = document.querySelector("#content");
  let htmlTemplate = `<h1 style="margin: 0;">WEATHER FORECAST FOR ${locationStr.toUpperCase()}</h1>
  <div class="container">
    <div class="box">
        <span><h3 class="label">Today:</h3></span>
        <p>${
          response.daily.data[0].icon[0].toUpperCase() +
          response.daily.data[0].icon.slice(1)
        }</p>
        <p>${response.daily.data[0].temperatureHigh} / ${
    response.daily.data[0].temperatureLow
  } F</p>
    </div>
    
    <div class="box">
    <span><h3 class="label">${new Date(
      response.daily.data[1].time * 1000
    ).toLocaleString("en-us", { weekday: "long" })}:</h3></span>
    <p>${
      response.daily.data[1].icon[0].toUpperCase() +
      response.daily.data[1].icon.slice(1)
    }</p>
    <p>${response.daily.data[1].temperatureHigh} / ${
    response.daily.data[1].temperatureLow
  } F</p>
</div>

<div class="box">
<span><h3 class="label">${new Date(
    response.daily.data[2].time * 1000
  ).toLocaleString("en-us", { weekday: "long" })}:</h3></span>
<p>${
    response.daily.data[2].icon[0].toUpperCase() +
    response.daily.data[2].icon.slice(1)
  }</p>
<p>${response.daily.data[2].temperatureHigh} / ${
    response.daily.data[2].temperatureLow
  } F</p>
</div>
  </div>`;
  $htmlWrapper.innerHTML = htmlTemplate;
}

getLocation();
