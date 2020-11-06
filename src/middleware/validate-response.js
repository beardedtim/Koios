import R from "ramda";
import jsonschema from "jsonschema";

const bodyOutputs = R.lensPath(["output"]);
const schemaDefinitions = R.lensPath(["definitions"]);

const outputSchemaDefintiion = R.lensPath(["body"]);

const schema_by_status = R.curryN(2, (schemas, status) =>
  R.find(R.propEq("status", status), schemas)
);

class InvalidResponse extends Error {
  constructor(reasons) {
    super();

    this.message = `The response from this server was unacceptable due to
    ${reasons.join("\n")}.
Fix the server or turn it on sloppy mode.`;
    this.code = 500;
  }
}

export default (config) => (req, res, next) => {
  const schemas = R.view(bodyOutputs, config);
  const definitions = R.view(schemaDefinitions, config);

  const back_res = res.json.bind(res);
  const back_status = res.status.bind(res);

  let code;
  res.status = (status_code) => {
    code = status_code;
    back_status(code);

    return res;
  };

  res.json = (body) => {
    res.json = back_res;
    res.status = back_status;

    if (!code) {
      code = 200;
    }

    const schema = schema_by_status(schemas, code);

    if (!schema && !config.sloppy) {
      console.log(schema);
      res.json = back_res;
      res.status = back_status;
      next(new InvalidResponse(`No status code matches "${code}".`));
      return res;
    } else {
      try {
        jsonschema.validate(
          body,
          { ...R.view(outputSchemaDefintiion, schema), definitions },
          { throwAll: true }
        );
        back_res(body);
        return res;
      } catch (e) {
        next(new InvalidResponse(e.errors));
      }
    }
  };

  next();
};
