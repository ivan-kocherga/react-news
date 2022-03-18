import { createStore } from "@reduxjs/toolkit";

function reducer(state, action) {
  switch (action.type) {
    case "ru":
      return { type: "change_country", value: action.value };
    case "us":
      return { type: "change_country", value: action.value };
    case "ua":
      return { type: "change_country", value: action.value };

    default:
      return state;
  }
}

const store = createStore(reducer, {
  value:
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user")).country
      : "ua",
  type: "__INIT__",
});

export default store;
