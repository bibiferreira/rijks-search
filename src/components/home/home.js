import React from "react";
import SearchBar from "../search-bar/search-bar";
import SearchCard from "../search-card/search-card";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: {
        count: 0
      }
    };
    this.search = this.search.bind(this);
  }

  render() {
    const {results} = this.state;
    return (
      <>
        <SearchBar action={this.search} />
        {this.cards()}
        <p>Total results - {results.count}</p>
      </>
    );
  }

  cards() {
    const cards = [];
    this.state.results.artObjects?.forEach((data) => {
      cards.push(<SearchCard object={data} key={data.id} />)
    });
    return cards;
  }

  search(term) {
    const url = `https://www.rijksmuseum.nl/api/nl/collection?key=${process.env.REACT_APP_SEARCH_API_KEY}&q=${term}`
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            results: result
          });
          console.log(this.state);
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

export default Home;
