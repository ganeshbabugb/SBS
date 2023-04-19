const loginFields = [
  {
    labelText: "REGISTER ID : ",
    labelFor: "register_id",
    id: "register_id",
    name: "register_id",
    type: "text",
    placeholder: "Register Number",
  },
  {
    labelText: "PASSWORD : ",
    labelFor: "password",
    id: "password",
    name: "password",
    type: "password",
    placeholder: "Password",
  },
];

const loginState = {};
loginFields.forEach((field) => {
  loginState[field.id] = "";
});

export { loginFields, loginState };
