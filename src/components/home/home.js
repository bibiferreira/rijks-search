import React from "react";
import './home.css';
import SearchBar from "../search-bar/search-bar";
import SearchCard from "../search-card/search-card";
import Details from "../details/details";

//the API doc tells that pages from 0 to n but I found out that it starts from 1.
const startingPage = 1;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      currentPage: startingPage,
      totalCount: 0,
      objects: [],
      selected: null
    };
    this.search = this.search.bind(this);
    this.loadNextPage = this.loadNextPage.bind(this);
    this.nextPageButton = this.nextPageButton.bind(this);
    this.searchFooter = this.searchFooter.bind(this);
    this.hideDetails = this.hideDetails.bind(this);
    this.openDetails = this.openDetails.bind(this);
  }

  render() {
    return (
      <>
        <SearchBar action={this.search} />

        {this.details()}

        <div className="search-results">
          {this.cards()}
        </div>

        {this.searchFooter()}
      </>
    );
  }

  cards() {
    const cards = [];
    this.state.objects.forEach((data) => {
      cards.push(<SearchCard object={data} key={data.id} onSelection={ () => this.openDetails(data) } />)
    });
    return cards;
  }

  details() {
    if (this.state.selected != null) {
      return (<Details object={this.state.selected} handleClose={this.hideDetails} />);
    }
  }

  openDetails(object) {
    let originalState = this.state;
    originalState.selected = object;
    console.log(originalState);
    this.setState(originalState);
  }

  hideDetails() {
    let originalState = this.state;
    originalState.selected = null;
    this.setState(originalState);
  }

  nextPageButton() {
    if(this.state.objects.length < this.state.totalCount) {
      return (<button onClick={this.loadNextPage}>More results</button>)
    }
  }

  searchFooter() {
    if(this.state.term.length > 0) {
      return (
        <div className="search-footer">
          <div className="button-wrapper">{this.nextPageButton()}</div>
          <p>Showing {this.state.objects.length} of {this.state.totalCount} results</p>
        </div>
      );
    }
  }

  search(term) {
    this.loadResults(term, startingPage, (result) => {
      let originalState = this.state;
      originalState.term = term;
      originalState.currentPage = startingPage;
      originalState.totalCount = result.count;
      originalState.objects = result.artObjects;
      console.log(result);
      this.setState(originalState);
    });
  }

  loadNextPage() {
    const nextPage = this.state.currentPage + 1;
    this.loadResults(this.state.term, nextPage, (result) => {
      let originalState = this.state;
      originalState.currentPage = nextPage;
      originalState.objects = originalState.objects.concat(result.artObjects)
      this.setState(originalState);
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
          
        }
      )
  }
}

export default Home;
