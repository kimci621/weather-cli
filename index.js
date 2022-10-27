#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { showError, showSuccess, showText } from "./services/log.service.js";

function init() {
  if (getArgs(process.argv)[0] == "error") {
    showError(getArgs(process.argv)[1]);
  } else if (getArgs(process.argv)[0] == "success") {
    showSuccess(getArgs(process.argv)[1]);
  } else {
    showText(getArgs(process.argv)[1]);
  }
}

init();
