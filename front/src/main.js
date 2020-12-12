import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
// Add firebase
import firebase from "firebase";

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: "AIzaSyC6FZ6OLcBQrFBB-572PeWyeNLUMi0_J8U",
  authDomain: "vue-upload-1951e.firebaseapp.com",
  databaseURL: "https://vue-upload-1951e.firebaseio.com",
  projectId: "vue-upload-1951e",
  storageBucket: "vue-upload-1951e.appspot.com",
  messagingSenderId: "230308073226",
  appId: "1:230308073226:web:246ad47b46cc5d286d34f3",
  measurementId: "G-ZRNR87EZ41",
});

let rootRef = firebase.database().ref();

new Vue({
  router,
  store,
  vuetify,
  rootRef,
  render: h => h(App)
}).$mount('#app')
