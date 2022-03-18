import "./News.css";
import React, { useEffect, useState } from "react";

import { Redirect } from "react-router-dom";
import Masonry from "react-responsive-masonry";

import Modal from "./help-components/Modal";
import newsApi from "../api/NewsAPI";
import helpFunc from "../api/helpFunc";
import store from "../api/store";

export default function News() {
  let [news, setNews] = useState([]);
  let [error, setError] = useState(false);
  let [modal, setModal] = useState(false);
  let [notNews, setNotNews] = useState(false);
  let [index, setRedirect] = useState({ redirect: false, index: null });
  let [params, setParams] = useState("");
  let [searchInputValue, setSearchInputValue] = useState("Украины");

  let urlParams = helpFunc.getQueryStringParams(
    document.location.search
  ).request;
  let [value, setValue] = useState(Boolean(urlParams) ? urlParams : "");

  useEffect(() => {
    if (Boolean(urlParams)) {
      updateNewsParams(urlParams);
      setParams(urlParams);
      setSearchInputValue(urlParams);
    } else {
      startNews();
    }
    helpFunc.checkImg();

    const sub = store.subscribe(() => {
      setSearchInputValue(
        store.getState().value === "ua"
          ? "Украина"
          : store.getState().value === "ru"
          ? "Росия"
          : store.getState().value === "us"
          ? "Америка"
          : "Неизвестно"
      );
      reloadNews();
    });

    setSearchInputValue(
      newsApi.country === "ua"
        ? "Украина"
        : newsApi.country === "ru"
        ? "Росия"
        : newsApi.country === "us"
        ? "Америка"
        : "Неизвестно"
    );

    return () => sub();
  }, []);

  function detailWatchNewsElem(index) {
    if (localStorage.getItem("token") === null) {
      setModal(true);
    } else {
      setRedirect({ redirect: true, index });
    }
  }

  async function searchNews() {
    if (value.trim() !== "") {
      setParams(value.trim());
      setSearchInputValue(value.trim());
      setNews([]);
      updateNewsParams(value.trim());
    }
  }

  function updateNewsParams(str) {
    newsApi
      .getSearchNews(str)
      .then((res) => {
        let data = res.data.articles;
        if (data.length === 0) {
          setNotNews(true);
        }
        setNews(data);
      })
      .catch((error) => {
        setError(error);
      });
  }

  function startNews() {
    newsApi
      .getStartNews()
      .then(async (res) => {
        let data = res.data.articles;
        setNews(data);
      })
      .catch((error) => {
        setError(error);
      });
  }

  function reloadNews() {
    setParams("");
    setValue("");
    setNews([]);
    startNews();
  }

  function closeModal() {
    setModal(false);
  }

  return (
    <div className="news">
      <div className="news-wrapper">
        <div className="news__title">
          <h1>Новости {searchInputValue}</h1>
          <div className="news__title-search">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Какие новости вы хотите найти?"
            />
            <button onClick={searchNews}>Готово</button>
            <button onClick={reloadNews}>Сбросить</button>
          </div>
        </div>
        {news.length > 0 ? (
          <Masonry columnsCount={3}>
            {news.map((elem, index) => {
              return (
                <div className="news__elem slider-elem" key={index}>
                  <img
                    className={"img-" + index}
                    src={elem.urlToImage}
                    onError={(e) => helpFunc.imgError(e)}
                  />
                  <h3 className="news__elem-title">{elem.title}</h3>
                  <p
                    className="news__elem-description"
                    dangerouslySetInnerHTML={{ __html: elem.description }}
                  />
                  <p className="news__elem-author">{elem.author}</p>
                  <button
                    className="news__elem-detail"
                    onClick={() => detailWatchNewsElem(index)}
                  >
                    Посмотреть детальнее
                  </button>
                </div>
              );
            })}
          </Masonry>
        ) : error ? (
          <div className="load-error">
            <p>Ошибка {error}</p>
            <p>Дайте денег и я куплю api:)</p>
          </div>
        ) : notNews ? (
          <p className="load">Новостей не найдено...</p>
        ) : (
          <p className="load">Загрузка...</p>
        )}
      </div>
      {modal ? <Modal closeModal={closeModal} /> : void 0}
      {index.redirect && value ? (
        <Redirect to={`news/${index.index}?lastQuestion=${value.trim()}`} />
      ) : index.redirect ? (
        <Redirect to={`news/${index.index}?county=${store.getState().value}`} />
      ) : (
        void 0
      )}
      {Boolean(params) ? (
        <Redirect to={`news?request=${params}`} />
      ) : (
        <Redirect to={"news"} />
      )}
    </div>
  );
}
