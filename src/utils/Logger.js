import * as leeks from "leeks.js"

export default class Logger {
  static #colors = {
    time: leeks.colors.gray,
    log: leeks.colors.green,
    info: leeks.colors.green,
    error: leeks.colors.red,
    warn: leeks.colors.yellow,
    debug: leeks.colors.magenta,
    command: leeks.colors.cyan
  }

  static get log() {
    return this.#_log.bind(this, "log");
  }

  static get info() {
    return this.#_log.bind(this, "info");
  }
  
  static get error() {
    return this.#_log.bind(this, "error");
  }

  static get warn() {
    return this.#_log.bind(this, "warn");
  }

  static get debug() {
    return this.#_log.bind(this, "debug");
  }

  static get command() {
    return this.#_log.bind(this, "command");
  }

  static #_log(type, name, message) {
    const d = new Date();
    const time = d.toString().split(" ")[4];
    const date = `${(d.getMonth() + 1).toString().padStart(2, "0")}-${d.getDate()}-${d.getFullYear()}`;
    if (!name) throw new TypeError("Missing Logger Name");
    if (!message ) {
      message = name;
      name = "General";
    }
    if (typeof message !== "string") {
      if (message instanceof Buffer || typeof message === "function") message = message.toString();
      if (typeof message === "object") message = util.inspect(message, { depth: null, colors: true, showHidden: true });
    }

    process.stdout.write(`[${Logger.#colors.time(time)}] ${Logger.#colors[type](this.ucwords(type))} | ${name instanceof Array ? name.map(n => Logger.#colors[type](n)).join(" | ") : Logger.#colors[type](name.toString())} | ${Logger.#colors[type](message)}\n`);
  }


  /**
	 * first letter of every word uppercase.
	 *
	 * @static
	 * @param {string} str - The string to perform the operation on.
	 * @returns {string}
	 * @memberof Strings
	 * @example Strings.ucwords("some string of words");
	 */
  static ucwords (str) {
    return str.toString().toLowerCase().replace(/^(.)|\s+(.)/g, (r) => r.toUpperCase());
  }
}
