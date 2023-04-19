const adminLoginFields = [
  {
    labelText: "USER NAME : ",
    labelFor: "user",
    id: "user",
    name: "user",
    type: "text",
    placeholder: "USER NAME",
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

const adminLoginState = {};
adminLoginFields.forEach((field) => {
  adminLoginState[field.id] = "";
});

export { adminLoginFields, adminLoginState };
