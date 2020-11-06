import Pino from "pino";
import R from "ramda";
import * as Env from "./config/env.js";

export default Pino({
  name: Env.name,
  level: Env.log_level,
  prettyPrint: R.ifElse(
    R.always(R.or(Env.is_prod, Env.is_stag)),
    R.always({
      level_first: true,
    }),
    R.always(undefined)
  ),
  redact: ["password", "*.password"],
  serializers: Pino.stdSerializers,
});
