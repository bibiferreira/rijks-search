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
      <p>{this.state.object?.title}</p>
    );
  }
}

export default SearchCard;
