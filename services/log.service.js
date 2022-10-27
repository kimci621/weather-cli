import chalk from "chalk";

export function showError(text) {
  console.log(chalk.bgRed("Ошибка:\n" + text));
}
export function showSuccess(text) {
  console.log(chalk.bgGreen("Результат:\n" + text));
}
export function showText(text) {
  console.log(chalk.bgBlueBright("Вывод:\n" + text));
}
