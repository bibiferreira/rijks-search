import React from "react";
import SearchBar from "../search-bar/search-bar";
import SearchCard from "../search-card/search-card";

//the API doc tells that pages from 0 to n but I found out that it starts from 1.
const startingPage = 1;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      currentPage: startingPage,
      totalCount: 0,
      objects: []
    };
    this.search = this.search.bind(this);
    this.loadNextPage = this.loadNextPage.bind(this);
  }

  render() {
    const {totalCount} = this.state;
    return (
      <>
        <SearchBar action={this.search} />
        <div>{this.cards()}</div>
        {this.nextPageButton()}
        <p>Total results - {totalCount}</p>
      </>
    );
  }

  cards() {
    const cards = [];
    this.state.objects.forEach((data) => {
      cards.push(<SearchCard object={data} key={data.id} />)
    });
    return cards;
  }

  nextPageButton() {
    if(this.state.objects.length < this.state.totalCount) {
      return (<button onClick={this.loadNextPage}>Load more ...</button>)
    }
  }

  search(term) {
    this.loadResults(term, startingPage, (result) => {
      this.setState({
        term: term,
        currentPage: startingPage,
        totalCount: result.count,
        objects: result.artObjects
      });
    });
  }

  loadNextPage() {
    const nextPage = this.state.currentPage + 1;
    let currentResults = this.state.objects;
    this.loadResults(this.state.term, nextPage, (result) => {
      this.setState({
        term: this.state.term,
        currentPage: nextPage,
        totalCount: this.state.totalCount,
        objects: currentResults.concat(result.artObjects)
      });
    });
  }

  loadResults(term, page, resultHandler) {
    const url = `https://www.rijksmuseum.nl/api/nl/collection?key=${process.env.REACT_APP_SEARCH_API_KEY}&q=${term}&p=${page}&ps=20&imgonly=True`
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          resultHandler(result);
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
