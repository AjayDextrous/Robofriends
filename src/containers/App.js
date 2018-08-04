import React, { Component } from 'react';
import './App.css';
import './Basic';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import 'tachyons';

class App extends Component {

  constructor(){
    super();
    this.state = {
      'robots': [],
      'searchfield': ''
    }
  }

  onSearchChange = (event) => {
    this.setState({searchfield: event.target.value});
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      return response.json();
    })
    .then(users => {
      this.setState({'robots':users});
    })
  }

  render() {

    const {robots, searchfield} = this.state;
    const filteredRobots = robots.filter(robot =>{
        return robot.name.toLowerCase().includes(searchfield.toLowerCase())
        })

      return !robots.length?
        (
        <div className = 'tc'>
          <h1 className = 'title-robo'>Loading ...</h1>
        </div>
        ):(
        <div className = 'tc'>
        <h1 className = 'title-robo '>RoboFriends</h1>
          <SearchBox searchChange = {this.onSearchChange}/>
        <Scroll>
          <CardList robots={filteredRobots}/>
        </Scroll>
        </div>
        );
      }
  
}

export default App;
