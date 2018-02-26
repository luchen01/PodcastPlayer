import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import PodcastList from './pages/podcast-list';
import PodcastEpisodeList from './pages/podcast-episode-list';
import AudioPlayer from './components/audioPlayer';
import logo from './images/horizonsH.png';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo}/>
        </header>
        <Router>
          <div className="App-body">
            <Route exact path="/" component={PodcastList}/>
            <Route path="/podcast/:slug" component={PodcastEpisodeList}/>
          </div>
        </Router>
        <footer className="App-footer">
          <AudioPlayer />
        </footer>
      </div>
    );
  }
}

export default App;
