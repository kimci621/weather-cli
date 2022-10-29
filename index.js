#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { showError, showSuccess, showText } from "./services/log.service.js";
import { saveKeyValue, getKeyValue } from "./services/storage.servive.js";

function makeOk(val) {
  let value = val.split(":")[1];
  let key = val.split(":")[0];
  if (key.charAt(1) == "c") {
    showSuccess(`Город установлен как: ${value}`);
  } else if (key.charAt(1) == "t") {
    try {
      saveKeyValue("token", value);
      showSuccess(`Токен установлен как: ${value}`);
    } catch (e) {
      showError("Токен не был сохранен, что-то пошло не так");
    }
  } else {
    showText("Нет такой команды");
  }
}

function makeKey(val, weather) {
  let key = val;
  if (key.charAt(1) == "c") {
    showText(`Нужно указать ваш город после ключа: -c yourCity`);
  } else if (key.charAt(1) == "t") {
    showText(`Нужно указать ваш токен после ключа: -t yourTokenSymbols`);
  } else if (key.charAt(1) == "h") {
    showText(
      "-h/-help - Помощь\n-c/-city yourCity - установить город\n-t/-token yourTokenSymbols - установить токен\n-s/-show - Получить прогноз погоды на ваш город"
    );
  } else if (key.charAt(1) == "s") {
    showText(`Прогноз погоды на сегодня: ${weather ? weather : "нет данных"}`);
  }
}

function init() {
  const argsResult = getArgs(process.argv);
  if (argsResult[0] == "key") {
    makeKey(argsResult[1]);
  } else if (argsResult[0] == "ok") {
    makeOk(argsResult[1]);
  } else if (argsResult[0] == "err") {
    showError(argsResult[1]);
  }
}

init();
