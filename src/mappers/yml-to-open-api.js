import R from "ramda";

export default (yml) => {
  const name = R.propOr("UNKNOWN_SERVICE", "name", yml);

  return { name };
};
