import axios from "axios";
import store from "./store";

const apiKey = "daa69aeb1d3b4436a905ac982d927efe";
let country =
  localStorage.getItem("user") !== null
    ? JSON.parse(localStorage.getItem("user")).country
    : "ua";

let info = {
  lastUpdate: null,
  previousValues: null,
  history: [],
};

function getStartNews() {
  return new Promise((resolve, reject) => {
    console.log("server...");
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`
      )
      .then((res) => {
        info.lastUpdate = res;
        info.history.push(res);
        resolve(res);
      })
      .catch((err) => {
        reject(err.response.status);
      });
  });
}

function getSearchNews(newsName) {
  info.previousValues = info.lastUpdate;
  return new Promise((resolve, reject) => {
    console.log("server...");
    axios
      .get(
        `https://newsapi.org/v2/everything?q=${newsName}&sortBy=popularity&apiKey=${apiKey}`
      )
      .then((res) => {
        info.lastUpdate = res;
        info.history.push(res);
        resolve(res);
      })
      .catch((err) => {
        reject(err.response.status);
      });
  });
}

function getNewsCountry(getCountry) {
  info.previousValues = info.lastUpdate;
  return new Promise((resolve, reject) => {
    console.log("server...");
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=${getCountry}&apiKey=${apiKey}`
      )
      .then((res) => {
        info.lastUpdate = res;
        info.history.push(res);
        resolve(res);
      })
      .catch((err) => {
        reject(err.response.status);
      });
  });
}

function setCountry(getCountry) {
  country = getCountry;
}

function init() {
  store.subscribe(() => {
    country = store.getState().value;
    console.log(store.getState().value);
    let user = JSON.parse(localStorage.getItem("user"));
    user.country = store.getState().value;
    localStorage.setItem("user", JSON.stringify(user));
  });
}

init();

export default {
  getStartNews,
  getSearchNews,
  setCountry,
  getNewsCountry,
  info,
  country,
};
