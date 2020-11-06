import { v4 as uuid } from "uuid";

export default () => (req, res, next) => {
  res.set("X-Req-ID", uuid());

  return next();
};
