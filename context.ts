import React from "react";
import { Person } from "./src/utilities/types";

export const dummyPerson: Person = {
  id: "-100",
  name: "",
  job: "",
  location: "",
  points: -100,
  profilePicture: "",
  badges: [],
  avatar: "",
};

export const AppStateContext = React.createContext(dummyPerson);
