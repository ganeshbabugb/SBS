const signupFields = [
  {
    labelText: "NAME : ",
    labelFor: "name",
    id: "name",
    name: "name",
    type: "text",
    placeholder: "Name",
  },
  {
    labelText: "REGISTER NO : ",
    id: "register_id",
    name: "register_id",
    type: "text",
    placeholder: "Register Number",
  },
  {
    labelText: "EMAIL ADDRESS : ",
    labelFor: "email_id",
    id: "email_id",
    name: "email_id",
    type: "email",
    placeholder: "Email address",
  },
  {
    labelText: "PASSWORD : ",
    labelFor: "password",
    id: "password",
    name: "password",
    type: "password",
    placeholder: "Password",
    helperText:
      "Your password must be at least 8 characters long and contain a combination of uppercase and lowercase letters, numbers, and symbols.",
  },
];

const signupState = {};
signupFields.forEach((field) => {
  signupState[field.id] = "";
});

export { signupFields, signupState };
