import "./Modal.css";
import React from "react";

import { Link } from "react-router-dom";

export default function Modal(props) {
  function stop(e) {
    e.stopPropagation();
  }
  return (
    <React.Fragment>
      <div className="modal">
        <div className="modal__block">
          <p className="modal__block-text">
            Вы не авторизованы. Чтобы продолжыть вам следует войти в свой
            аккаунт.
          </p>
          <div className="modal__block-btnBlock" onClick={(e) => stop(e)}>
            <Link to="/auth">
              <button onClick={() => props.closeModal()}>
                Страница авторизации
              </button>
            </Link>
            <button onClick={() => props.closeModal()}>
              Назад к главной страницы новостей
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
