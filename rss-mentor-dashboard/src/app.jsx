import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase/app';
import FireBase from './firebase/firebase';
import 'firebase/auth';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Table from './components/Dashboard/Dashboard';

FireBase.init();

class App extends Component {
  state = {
    mentor: null,
    mentorDataObj: null,
  };

  componentDidMount = async () => {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          mentorDataObj: user,
        });
      }
    });

    const mentorFromStorage = localStorage.getItem('selectedMentor');
    if (mentorFromStorage) {
      this.setState({
        mentor: mentorFromStorage,
      });
    }
  }

  handleInput = (mentorInput) => {
    this.setState({
      mentor: mentorInput,
    });
  }

  handleLogout = () => {
    console.log(this.state);
  }

  render() {
    const { mentor, mentorDataObj } = this.state;
    return (
      <Fragment>
        <NavBar
          handleInput={this.handleInput}
          mentorDataObj={mentorDataObj}
          handleLogout={this.handleLogout}
        />
        {mentor ? <Table mentor={mentor} /> : null}
      </Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
