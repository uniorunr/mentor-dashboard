## Dashboard with Github Authentication and Realtime Database

The dashboard is designed for mentors to track student performance.

The live version of the dashboard - https://rss-mentor-dashboard-8a0db.firebaseapp.com/

### Flow:

![dashboard_stack](https://user-images.githubusercontent.com/33601725/56366257-64f56480-61fb-11e9-83ee-6c4b897530c7.png)

Raw initial data goes to Google Sheets tables. App Script, added to Google Sheets tables, trigger after changes made in any of tables. This script processes and merge data from tables into JSON file which will be sent to Firebase Realtime Database. On the application side, we need to connect to the Realtime Database and add JSON to the state of App in order for the dashboard to be able to reflect changes in Firebase Database without page reloading. 

You can find out more in my [guide](https://gist.github.com/uniorunr/112975fb69ccd2b1a8731a5f5daaced0) on Russian.

### Stack:
- [Google Scripts](https://script.google.com/)
- [Firebase](https://firebase.google.com/)
  - [Authentication](https://firebase.google.com/products/auth/) 
  - [Hosting](https://firebase.google.com/products/hosting/)
  - [Realtime Database](https://firebase.google.com/products/realtime-database/)
- [React](https://reactjs.org/)
