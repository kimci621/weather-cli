import { homedir } from "os";
import { join } from "path";
import { writeFile, writeFileSync, promises } from "fs";

const filePath = join(homedir(), "./weather-data.json");

//сохранение новых данных в файл
export async function saveKeyValue(key, value) {
  let data = {};
  //если файл уже существует, записываем данные из файла в data
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file);
  }
  data[key] = value;
  //writeFile - записывает в существующий файл данные из второго параметра, либо либо создает файл и так же записывает
  promises.writeFile(filePath, JSON.stringify(data));
}

export async function getKeyValue(key) {
  if (isExist(filePath)) {
    const file = await promises.readFile(filePath);
    const data = JSON.parse(file);
    return data[key];
  }
  return undefined;
}

async function isExist(path) {
  try {
    //stat - показывает все данные существующего файла
    await promises.stat(path);
    return true;
  } catch (e) {
    return false;
  }
}

//os
//homedir - домашняя директория операционной системы

//path
//join - принимает 2 значения, объеденяет пути в один
//basename - название конечного файла
//dirname - путь до конечного файла
//dirname - путь до конечного файла
//extname - расширение конечного файла
//relative - принимает 2 значения, показывает путь между первым и вторым путем которые мы передали
//isAbsolute - true - если путь абсолютный, false если путь вида ../../some.txt
//resolve - показывает путь до текущей директории, можно передать например шаг назад .. и рез-тат будет на директорию выше текущей
//sep - сепаратор или разделитель между путями (/ или \)

//fs
//writeFileSync - запись файла синхронно
//writeFile - запись файла с помощью callback-ов
//promises - у promises много методов для работы с файлами, в основном работают с ним
