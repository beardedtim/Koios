import ExpressPino from "express-pino-logger";

import Log from "../log.js";

export default () =>
  ExpressPino({
    logger: Log,
  });
