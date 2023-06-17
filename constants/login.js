export const signupInputs = {
  name: {
    id: "full name",
    placeholder: "full name",
    type: "text",
    required: true,
  },
  email: {
    id: "email",
    placeholder: "email",
    type: "email",
    required: true,
  },
  phone: {
    id: "phone",
    placeholder: "phone number",
    type: "tel",
    required: true,
    maxLength: 11,
  },
  birthYear: {
    id: "birth year",
    placeholder: "birth year",
    type: "tel",
    required: true,
  },
  gender: {
    id: "gender",
    placeholder: "gender",
    type: "select",
    options: ["male", "female", "other"],
    required: true,
  },
  dialect: {
    id: "dialect",
    placeholder: "dialect",
    type: "select",
    options: ["turkish", "kurd", "lor", "other"],
  },
  study: {
    id: "study",
    placeholder: "education",
    type: "select",
    options: ["diploma", "bachelor", "masters", "PHD", "other"],
  },
  password: {
    id: "password",
    placeholder: "password(at least 8 charachters)",
    type: "password",
    required: true,
  },
};

export const loginInputs = {
  user: {
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

export const adminUser = {
  user: "admin@ut.ac.voice",
  password: "@a$d#M1i2n_",
};
