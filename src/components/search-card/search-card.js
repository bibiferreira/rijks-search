import React from "react";

class SearchCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      object: props.object
    };
  }

  render() {
    return (
      <div className="search-card">
        <img src={this.state.object?.webImage.url} loading="lazy" />
        <div className="details">
          <p>{this.state.object?.longTitle}</p>
        </div>
      </div>
    );
  }
}

export default SearchCard;
