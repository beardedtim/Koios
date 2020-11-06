import jsonschema from "jsonschema";
import R from "ramda";

const bodyInputSchema = R.lensPath(["input", "body"]);
const schemaDefinitions = R.lensPath(["definitions"]);
const bodyInput = R.lensPath(["body"]);

class InvalidBody extends Error {
  constructor(cause) {
    super();

    this.message = `Your request did not pass validation due to ${cause}. Please fix this and try your request again`;
    this.status = 400;
  }
}

export default (config) => async (req, res, next) => {
  const schema = R.view(bodyInputSchema, config);
  const definitions = R.view(schemaDefinitions, config);

  const data = R.view(bodyInput, req);

  try {
    await jsonschema.validate(
      data,
      { ...schema, definitions },
      { throwError: true }
    );
    next();
  } catch (e) {
    next(new InvalidBody(e.message));
  }
};
