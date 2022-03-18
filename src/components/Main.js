import "./Main.css";
import React, { Component, useState } from "react";

import Slider from "react-slick";
import { Redirect } from "react-router-dom";
import Modal from "./help-components/Modal";

import store from "../api/store";
import newsApi from "../api/NewsAPI";
import helpFunc from "../api/helpFunc";

export default function Main() {
  let [modal, setModal] = useState(false);
  let [redirect, setRedirect] = useState({ redirect: false, index: 0 });

  function watchDetailsNewsElem(index) {
    if (localStorage.getItem("token") === null) {
      setModal(true);
    } else {
      setRedirect({ redirect: true, index: index });
    }
  }

  function closeModal() {
    setModal(false);
  }

  return (
    <div className="main">
      <div>
        <div className="main__title main-wrapper">
          <h1>Новостной сайт</h1>
          <p>Мир новостей откроет тебе глаза на окружающий свет</p>
        </div>
        <div className="main__title-slider">
          <SimpleSlider watchDetailsNewsElem={watchDetailsNewsElem} />
        </div>
        {modal ? <Modal closeModal={closeModal} /> : void 0}
        {redirect.redirect ? (
          <Redirect to={`news/${redirect.index}`} />
        ) : (
          void 0
        )}
      </div>
    </div>
  );
}

class SimpleSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsData: [],
      error: false,
    };
  }

  componentDidMount() {
    this.getNews();
    store.subscribe(() => {
      this.setState({ newsData: [] });
      this.getNews();
    });

    return () => store();
  }

  getNews() {
    newsApi
      .getStartNews()
      .then(async (res) => {
        let data = res.data.articles;
        if (data.length === 0) {
          this.setState({ newsData: data, error: true });
        }
        this.setState({ newsData: data });

        helpFunc.checkImg();
      })
      .catch((err) => {
        this.setState({ newsData: [], error: true });
      });
  }

  settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  render() {
    return this.state.newsData.length !== 0 ? (
      <div>
        <Slider {...this.settings}>
          {this.state.newsData.map((elem, index) => {
            return (
              <div className="slider__elem" key={index}>
                <img
                  className={"img-" + index}
                  src={elem.urlToImage}
                  onError={(e) => helpFunc.imgError(e)}
                />
                <h3 className="slider__elem-title">{elem.title}</h3>
                <p className="slider__elem-author">{elem.author}</p>
                <button
                  className="slider__elem-detail"
                  onClick={() => this.props.watchDetailsNewsElem(index)}
                >
                  Посмотреть детальнее
                </button>
              </div>
            );
          })}
        </Slider>
      </div>
    ) : !this.state.error ? (
      <p className="info">Загрузка данных...</p>
    ) : (
      <p className="info">Чо-то пошло не так...</p>
    );
  }
}
