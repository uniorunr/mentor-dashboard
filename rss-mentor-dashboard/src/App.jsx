import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase/app';
import FireBase from './firebase/firebase';
import 'firebase/auth';
import 'firebase/database';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import SimpleTable from './components/Dashboard/Dashboard';
import Footer from './components/Footer/Footer';

FireBase.init();

class App extends Component {
  constructor() {
    super();

    this.database = firebase
      .database()
      .ref()
      .child('JSONData');

    this.state = {
      mentor: null,
      mentorDataObj: null,
      database: null,
    };
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
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

    this.database.on('value', (snap) => {
      this.setState({
        database: snap.val(),
      });
    });
  };

  handleInput = (mentorInput) => {
    this.setState({
      mentor: mentorInput,
    });
  };

  render() {
    const { mentor, mentorDataObj, database } = this.state;
    return (
      <Fragment>
        <NavBar
          handleInput={this.handleInput}
          mentorDataObj={mentorDataObj}
          database={database}
        />
        {mentor && database ? (
          <SimpleTable mentor={mentor} database={database} />
        ) : null}
        <Footer link="https://github.com/uniorunr" text="uniorunr" />
      </Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
