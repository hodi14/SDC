import { createContext } from "react";

export const loadingContext = createContext({
  apiLoading: false,
  setApiLoading: () => null,
});
