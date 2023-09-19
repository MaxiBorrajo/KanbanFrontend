//Form validation rules
const rules = {
  //Email rules
  email: (value) => {
    const regular_expression_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regular_expression_email.test(value)) return "E-mail must be valid.";

    return true;
  },
  //Confirm password rules
  confirm_password: (password) => (value) => {
    if (value !== password) return "Passwords don't match";

    return true;
  },
  //Password rules
  password: (value) => {
    const regular_expression_password =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!regular_expression_password.test(value))
      return "Password field must have, at least, one lowercase letter, one uppercase letter, one digit, one special character, and be 8 characters or longer.";

    return true;
  },
  //Is required rule
  required: (value) => {
    if (!value && value !== 0) {
      return "This field is required.";
    }
    return true;
  },
  //Maximum value of input rule
  maximum_value: (maximum_value) => (value) => {
    if (value > maximum_value) {
      return `The maximum value allowed is ${maximum_value}`;
    }
    return true;
  },
  //Minimum value of input rule
  minimum_value: (minimum_value) => (value) => {
    if (value < minimum_value) {
      return `The minimun value allowed is ${minimum_value}`;
    }
    return true;
  },
};

//Exports
export default rules;