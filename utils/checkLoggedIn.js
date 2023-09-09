export const checkLoggedIn = () => {
  if (localStorage.getItem("userInfo")) {
    const info = JSON.parse(localStorage.getItem("userInfo"));

    if (
      "phone_number" in info &&
      "name" in info &&
      "email" in info &&
      "gender" in info &&
      "birth_year" in info &&
      "password" in info &&
      "study" in info &&
      "dialect" in info
    )
      return true;
    return false;
  }

  return false;
};
