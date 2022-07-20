import React from "react";

class SearchCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      object: props.object
    };
    this.onSelection = props.onSelection;
    this.onClick = this.onClick.bind(this);
  }

  render() {
    return (
      <div className="search-card" onClick={this.onClick} title={this.state.object?.longTitle}>
        <img src={this.state.object?.webImage.url} alt={this.state.object?.longTitle} loading="lazy" />
        <div className="details">
          <p>{this.state.object?.longTitle}</p>
        </div>
      </div>
    );
  }

  onClick() {
    this.onSelection(this.state.object);
  }
}

export default SearchCard;
