import { getKeyValue } from "./storage.servive.js";
import { showError } from "./log.service.js";
import axios from "axios";

export async function getLatAndLon(city) {
  const token = await getKeyValue("token");
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${token}`;
  return axios.get(url);
}

export async function getWeather(city) {
  const token = await getKeyValue("token");
  let res = await getLatAndLon(city);
  let lat = res.data[0].lat;
  let lon = res.data[0].lon;
  const url = "https://api.openweathermap.org/data/2.5/weather";
  await axios
    .get(url, {
      params: {
        lang: "ru",
        units: "metric",
        lat: lat,
        lon: lon,
        appid: token,
      },
    })
    .then((res) => {
      //результат
      console.log(`
        Погода на сегодня в городе ${res.data.name}:
        ${res.data.weather[0].description}\n
        Температура:
        Средняя: ${res.data.main.temp} С*
        Чувствуется как: ${res.data.main.feels_like} С*
        Максимум: ${res.data.main.temp_max} С*
        Минимум: ${res.data.main.temp_min} С*\n

        Скорость ветра: ${res.data.wind.speed} м/с\n
        
        Видимость: ${res.data.visibility} м
      `);
    })
    .catch((err) => {
      console.log(
        showError(
          "Что-то не так с openweathermap api, проверьте токен или название города, код ошибки:"
        ),
        err.message
      );
    });
}
