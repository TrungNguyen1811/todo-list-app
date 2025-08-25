const getValidateProps = (name, touched, errors) => ({
  help: touched[name] && errors[name],
  validateStatus: touched[name] && errors[name] ? "error" : "",
});

export { getValidateProps };
