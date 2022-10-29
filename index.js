#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { showError, showSuccess, showText } from "./services/log.service.js";
import { saveKeyValue, getKeyValue } from "./services/storage.servive.js";
import { getWeather, getLatAndLon } from "./services/api.service.js";

async function makeOk(val) {
  let value = val.split(":")[1];
  let key = val.split(":")[0];

  if (key.charAt(1) == "c") {
    showSuccess(`Прогноз для города ${value}:`);
    getWeather(value);
  } else if (key.charAt(1) == "t") {
    try {
      saveKeyValue("token", value);
      showSuccess(`Токен установлен как: ${value}`);
    } catch (e) {
      showError("Токен не был сохранен, что-то пошло не так...");
    }
  } else if (key.charAt(1) == "s") {
    try {
      await getLatAndLon(value).then((res) => {
        if (res.data.length == 0) {
          showError(
            "Город по-умолчанию не был сохранен, введите верное название вашего города на английском языке."
          );
        } else {
          saveKeyValue("city", value);
          showSuccess(`Город по-умолчанию установлен как: ${value}`);
        }
      });
    } catch (e) {
      showError(
        "Город по-умолчанию не был сохранен, введите верное название вашего города на английском языке."
      );
    }
  } else {
    showText("Нет такой команды");
  }
}

function makeKey(val) {
  let key = val;
  if (key.charAt(1) == "c") {
    showText(`Нужно указать ваш город после ключа: -c City`);
  } else if (key.charAt(1) == "t") {
    showText(`Нужно указать ваш токен после ключа: -t yourTokenSymbols`);
  } else if (key.charAt(1) == "s") {
    showText(`Нужно указать ваш город по-умолчанию после ключа: -t yourCity`);
  } else if (key.charAt(1) == "h") {
    showText(
      "-h/-help - Помощь\n-c/-city City - Показать погоду в указаном городе\n-t/-token yourTokenSymbols - установить токен\n-s/-save yourCity- Установить город по-умолчанию"
    );
  } else {
    showError(`Такого ключе не существует, -h/-help для получения информации`);
  }
}

async function init() {
  if (process.argv.length < 3 && (await getKeyValue("city"))) {
    const savedCity = await getKeyValue("city");
    showSuccess(`Прогноз для города ${savedCity}:`);
    getWeather(savedCity);
    return;
  } else {
    const argsResult = getArgs(process.argv);
    if (argsResult[0] == "key") {
      makeKey(argsResult[1]);
    } else if (argsResult[0] == "ok") {
      makeOk(argsResult[1]);
    } else if (argsResult[0] == "err") {
      showError(argsResult[1]);
    }
  }
}

init();
