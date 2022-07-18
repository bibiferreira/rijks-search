import React from "react";
import './details.css';
import closeIcon from "../../images/close-icon.svg";

const Details = (props) => {
  const showHideClassName = props.show === true ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
    <section className="modal-main">
      <div>
        <img src={props.object?.webImage.url} loading="lazy" />
      </div>
      <div className="info">
        <div className="navigation-control">
          <h2>{props.object?.title}</h2>
          <button type="button" onClick={props.handleClose}>
            <img src={closeIcon} />
          </button>
        </div>

        <div>

          <Author maker={props.object?.principalOrFirstMaker} />
        </div>

      </div>


    </section>
  </div>
  )
}

const Author = (props) => {
  if(props.maker != null) {
    return (<p>By {props.maker}</p>);
  }
};

export default Details;
