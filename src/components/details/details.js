import React from "react";
import './details.css';
import closeIcon from "../../images/close-icon.svg";

class Details extends React.Component {

  constructor(props) {
    super(props);
    this.show = props.show;
    this.object = props.object;
    this.handleClose = props.handleClose;
    this.state = {
      extendedInfo: null
    }
    this.close = this.close.bind(this);
  }

  render() {
    const showHideClassName = this.object != null ? "modal display-block" : "modal display-none";
    console.log(this.object);
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <div>
            <img src={this.object?.webImage.url} loading="lazy" />
          </div>
          <div className="info">
            <div className="navigation-control">
              <h2>{this.object?.title}</h2>
              <button type="button" onClick={this.close}>
                <img src={closeIcon} />
              </button>
            </div>

            <div className="author">By {this.object.principalOrFirstMaker}</div>

            <div className="extended-details">
              <ul>
                <li><p>{this.state.extendedInfo?.plaqueDescriptionEnglish}</p></li>
                <li><strong>Acquisition: </strong>{this.getAcquisitionDate()}</li>
                <li><p><strong>Dimensions: </strong>{this.state.extendedInfo?.dimensions.map(dim => `${dim.value}${dim.unit} ${dim.type}`).join(", ")}</p></li>
                <li><a href={this.object.links.web} target="_blank">See it on Rijks Museum</a></li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    )
  }

  close() {
    this.handleClose();
  }

  getAcquisitionDate() {
    if (this.state.extendedInfo?.acquisition.date != null) {
      const date = new Date(this.state.extendedInfo?.acquisition.date);
      return date.getFullYear();
    }
    return ""
  }

  componentDidMount() {
    const url = `${this.object?.links.self}?key=${process.env.REACT_APP_SEARCH_API_KEY}`;
    console.log(url);
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            extendedInfo: result.artObject
          });
        },
        (error) => {
          // this.setState({
          //   isLoaded: true,
          //   error
          // });
        }
      )
  }

}

export default Details;
