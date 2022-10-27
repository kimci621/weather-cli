export function getArgs(args) {
  const [f, s, ...rest] = args;

  if (rest.length > 2) {
    return ["error", "Максимальное количество параметров - 2"];
  }

  if (rest.length == 1 && rest[0].charAt(0) == "-") {
    return rest[0];
  } else if (
    rest.length == 2 &&
    rest[0].charAt(0) == "-" &&
    rest[1].charAt(0) !== "-"
  ) {
    return ["success", `${rest[0]}: ${rest[1]}`];
  } else {
    return [
      "tip",
      "Пример команды: -flag или -flag param\n-help для помощи".trim(),
    ];
  }
}
