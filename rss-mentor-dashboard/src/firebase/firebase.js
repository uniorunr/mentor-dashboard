import * as firebase from 'firebase/app';
import 'firebase/auth';

const API_KEY = 'AIzaSyCum54wsr0slpXjQFvIToTEUUlCDkf0RuI';
const AUTH_DOMAIN = 'rss-mentor-dashboard-8a0db.firebaseapp.com';
const DATABASE_URL = 'https://rss-mentor-dashboard-8a0db.firebaseio.com';
const PROJECT_ID = 'rss-mentor-dashboard-8a0db';
const STORAGE_BUCKET = 'rss-mentor-dashboard-8a0db.appspot.com';
const MESSAGING_SENDER_ID = '917025581702';

class FireBase {
  static init() {
    const config = {
      apiKey: API_KEY,
      authDomain: AUTH_DOMAIN,
      databaseURL: DATABASE_URL,
      projectId: PROJECT_ID,
      storageBucket: STORAGE_BUCKET,
      messagingSenderId: MESSAGING_SENDER_ID,
    };
    firebase.initializeApp(config);
  }

  static async auth() {
    const token = await firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then(result => result.credential.accessToken)
      .catch((error) => {
        throw new Error(error);
      });

    const userData = await fetch(`https://api.github.com/user?access_token=${token}`)
      .then(response => response.json())
      .catch((error) => {
        throw new Error(error);
      });

    const user = firebase.auth().currentUser;

    localStorage.setItem('userStatus', 'loggedIn');

    user.updateProfile({
      displayName: userData.login,
      photoURL: userData.avatar_url,
    }).catch((error) => {
      throw new Error(error);
    });
  }

  static logout(callback) {
    firebase.auth().signOut().then(() => {
      window.location.reload();
      callback();
    }).catch((error) => {
      throw new Error(error);
    });
    localStorage.removeItem('selectedMentor');
  }
}

export default FireBase;
