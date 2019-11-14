import React, { Component } from 'react';
import './App.css';
const DEFAULT_QUERY = 'react';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const list = [];

const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

const url = `${PATH_BASE}${PATH_SEARCH}`;
console.log(url);

const large = {
  width: '40%',
};

const mid = {
  width: '30%',
};

const small = {
  width: '30%',
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  setSearchTopStories(result) {
    this.setState({ result });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    console.log('I am working.');
    const updatedHits = this.state.list.result.hits.filter(isNotId);
    this.setState({ ...this.state.result, hits: updatedHits });
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  render() {
    const { searchTerm, result } = this.state;
    if (!result) {
      return null;
    }
    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange}>
            Search
          </Search>
        </div>
        <Table
          list={result.hits}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

const Search = ({ value, onChange, children }) => {
  return (
    <form>
      {children} <input type="text" value={value} onChange={onChange} />
    </form>
  );
};

const Table = ({ list, pattern, onDismiss }) => {
  return (
    <div className="table">
      {list.filter(isSearched(pattern)).map(item => (
        <div key={item.objectID} className="table-row">
          <span style={large}>
            <a href={item.url}>{item.title}</a>
          </span>
          <span style={mid}>{item.author}</span>
          <span style={small}>{item.num_comments}</span>
          <span style={small}>{item.points}</span>
          <span style={small}>
            <Button onClick={item => onDismiss(item.objectID)}>Dismiss</Button>
          </span>
        </div>
      ))}
    </div>
  );
};

const Button = ({ onclick, className = '', children }) => {
  return (
    <button onClick={onclick} className="button-inline" type="button">
      {children}
    </button>
  );
};

export default App;
