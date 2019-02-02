import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Table from './components/Dashboard/Dashboard';

class App extends Component {
  state = {
    mentor: null,
  };

handleInput = (mentorInput) => {
  this.setState({
    mentor: mentorInput,
  });
}

render() {
  const { mentor } = this.state;
  return (
    <Fragment>
      <NavBar handleInput={this.handleInput} />
      {mentor ? <Table mentor={mentor} /> : null}
    </Fragment>
  );
}
}

ReactDOM.render(<App />, document.getElementById('root'));
