export function getArgs(args) {
  const [nodePath, filePath, ...rest] = args;

  if (rest.length > 2) {
    return ["error", "Максимальное количество параметров - 2"];
  } else if (rest.length == 1 && rest[0].charAt(0) == "-") {
    return ["key", `${rest[0]}`];
  } else if (
    rest.length == 2 &&
    rest[0].charAt(0) == "-" &&
    rest[1].charAt(0) !== "-"
  ) {
    return ["ok", `${rest[0]}:${rest[1]}`];
  } else {
    return [
      "err",
      "Пример команды: -flag или -flag param\n-h или -help для помощи".trim(),
    ];
  }
}
