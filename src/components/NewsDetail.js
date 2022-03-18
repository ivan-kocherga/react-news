import "./NewsDetail.css";

import React, { useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";

import newsApi from "../api/NewsAPI";
import helpFunc from "../api/helpFunc";

export default function NewsDetail() {
  let [data, setData] = useState([]);
  let { id } = useParams();
  let [imgErrorHandler, setImgErrorHandler] = useState(false);
  let [redirect, setRedirect] = useState(false);
  let [error, setError] = useState(false);
  let [load, setLoad] = useState(true);
  let urlParams = helpFunc.getQueryStringParams(document.location.search);

  useEffect(() => {
    if (newsApi.info.lastUpdate !== null) {
      setLoad(false);
      if (Boolean(newsApi.info.lastUpdate.data.articles[id]) === false) {
        setError(true);
        return void 0;
      }
      let data_ = newsApi.info.lastUpdate.data.articles[id];
      data_["dateBeauty"] = helpFunc.dateBeautyFunc(data_.publishedAt);
      setData(data_);
    } else {
      if (urlParams.lastQuestion) {
        newsApi
          .getSearchNews(urlParams.lastQuestion)
          .then((res) => {
            setLoad(false);
            if (Boolean(res.data.articles[id]) === false) {
              setError(true);
              return void 0;
            }
            setData(res.data.articles[id]);
          })
          .catch(() => {
            setError(true);
          });
      } else if (urlParams.county) {
        newsApi
          .getNewsCountry(urlParams.county)
          .then((res) => {
            setLoad(false);
            if (Boolean(res.data.articles[id]) === false) {
              setError(true);
              return void 0;
            }
            setData(res.data.articles[id]);
          })
          .catch(() => {
            setError(true);
            setLoad(false);
          });
      }
    }
  }, []);

  function back() {
    setRedirect(true);
  }

  function imgError(e) {
    setImgErrorHandler(true);
    e.target.style.display = "none";
  }

  return (
    <div className="newsDetail">
      <div className="newsDetail-wrapper">
        <div className="back">
          <a onClick={() => back()}>Вернуться назад</a>
        </div>
        {!error && !load ? (
          <div>
            {!imgErrorHandler ? (
              <div className="img-shadow">
                <img
                  className="img"
                  src={data.urlToImage}
                  onError={(e) => imgError(e)}
                />
                <h1 className="newsDetail__title-title">{data.title}</h1>
              </div>
            ) : (
              <h1 className="newsDetail__title-title2">{data.title}</h1>
            )}
            <div className="newsDetail__title">
              <p className="newsDetail__title-author">
                Автор: <span>{data.author ? data.author : "Инкогнито"}</span>
              </p>
              <p className="newsDetail__title-date">
                Дата: <span>{data.dateBeauty}</span>
              </p>
            </div>
            <div className="content">
              <p>{data.description}</p>
              <p>
                Источник:{" "}
                <a target="_blank" href={data.url}>
                  Клик и вы там
                </a>
              </p>
            </div>
          </div>
        ) : load ? (
          <p>Загрузка...</p>
        ) : (
          <p>Кое что пошло не так. Возможно новость удалили(</p>
        )}
      </div>
      {redirect ? (
        <Redirect
          to={
            urlParams.lastQuestion
              ? `/news?request=${urlParams.lastQuestion}`
              : "/news"
          }
        />
      ) : (
        void 0
      )}
    </div>
  );
}
