export const signupInputs = {
  name: {
    id: "name",
    placeholder: "your name...",
    type: "text",
    required: true,
  },
  email: {
    id: "email",
    placeholder: "your email...",
    type: "email",
    required: true,
  },
  phone: {
    id: "phone",
    placeholder: "your phone...",
    type: "tel",
    required: true,
  },
  birthYear: {
    id: "birth year",
    placeholder: "your birth year...",
    type: "tel",
    required: true,
  },
  gender: {
    id: "gender",
    placeholder: "your gender...",
    type: "select",
    options: ["male", "female", "neither"],
    required: true,
  },
  dialect: {
    id: "dialect",
    placeholder: "your dialect...",
    type: "select",
    options: ["turkish", "kurd", "lor"],
  },
  password: {
    id: "password",
    placeholder: "password(at least 8)...",
    type: "password",
    required: true,
  },
};

export const loginInputs = {
  user: {
    id: "email or phone",
    placeholder: "your email or phone...",
    type: "text",
    required: true,
  },
  password: {
    id: "password",
    placeholder: "your password...",
    type: "password",
    required: true,
  },
};

export const adminUser = {
  user: "admin@ut.ac.voice",
  password: "@a$d#M1i2n_",
};

export const users = [
  {
    user: "admin@ut.ac.voice",
    password: "@a$d#M1i2n_",
  },
  {
    user: "hodaee",
    password: "hodaee1234",
  },
  {
    user: "aghaee",
    password: "aghaee1234",
  },
  {
    user: "abdi",
    password: "abdi1234",
  },
];
