import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      keyword: '',
    };
    this.searchSongs = this.searchSongs.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  // This is for the search results to show up when search button is clicked
  searchSongs(event) {
    event.preventDefault();
    const { keyword } = this.state;
    return axios.get(`http://www.songsterr.com/a/ra/songs.json?pattern=${keyword}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          songs: response.data
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // This is for the typed search term to show up as being typed, could be easily implemented to show results as you're typing.
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Songsterr Search</h2>
          <form onSubmit={this.searchSongs}>
            <input className="col-md-8" onChange={this.onChange} type="text" name="keyword" placeholder="Search..." />
            <button className="btn-success col-md-4" type="submit">Search</button>
          </form>
        </div>
        <div className="content">
        <p>Searching For: {this.state.keyword}</p>
          {this.state.songs.map((data) => <p key={data.id}><a href={'http://www.songsterr.com/a/wa/song?id=' + data.id}>{data.artist.name}: {data.title}</a></p>)}
          <hr />
        </div>
      </div>
    );
  }
}

export default App;
