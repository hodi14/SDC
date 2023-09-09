export const signupInputs = {
  name: {
    id: "full name",
    placeholder: "full name",
    type: "text",
    required: true,
    value: "",
  },
  email: {
    id: "email",
    placeholder: "email",
    type: "email",
    required: true,
    value: "",
  },
  phone: {
    id: "phone",
    placeholder: "phone number",
    type: "tel",
    required: true,
    maxLength: 11,
    value: "",
  },
  birth_year: {
    id: "birth year",
    placeholder: "birth year",
    type: "tel",
    required: true,
    value: "",
  },
  gender: {
    id: "gender",
    placeholder: "gender",
    type: "select",
    options: ["male", "female", "other"],
    required: true,
    value: "",
  },
  dialect: {
    id: "dialect",
    placeholder: "dialect",
    type: "select",
    options: ["turkish", "kurd", "lor", "other"],
    value: "",
  },
  study: {
    id: "study",
    placeholder: "education",
    type: "select",
    options: ["diploma", "bachelor", "masters", "PHD", "other"],
    value: "",
  },
  password: {
    id: "password",
    placeholder: "password(at least 8 charachters)",
    type: "password",
    required: true,
    value: "",
  },
};

export const loginInputs = {
  userId: {
    id: "email or phone",
    placeholder: "email or phone",
    type: "text",
    required: true,
  },
  password: {
    id: "password",
    placeholder: "password",
    type: "password",
    required: true,
  },
};
