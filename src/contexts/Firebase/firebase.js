import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { getTodaysDate, collectIdsAndDocsFirebase } from "../../utilities";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    // UI Config
    this.uiConfig = {
      signInFlow: "popup",
      signInSuccessUrl: "/home",
      signInOptions: [
        app.auth.GoogleAuthProvider.PROVIDER_ID,
        app.auth.FacebookAuthProvider.PROVIDER_ID,
        app.auth.TwitterAuthProvider.PROVIDER_ID,
        app.auth.GithubAuthProvider.PROVIDER_ID
      ]
    };

    // Helper
    this.fieldValue = app.firestore.FieldValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    // Firebase APIs
    this.auth = app.auth();
    this.db = app.firestore();

    // Social Sign In Method Provider
    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
    this.githubProvider = new app.auth.GithubAuthProvider();
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  doSignOut = () => this.auth.signOut();
  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);
  doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);
  doSignInWithTwitter = () => this.auth.signInWithPopup(this.twitterProvider);
  doSignInWithGithub = () => this.auth.signInWithPopup(this.githubProvider);
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT
    });

  // *** Merge Auth and DB User API ***
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then(snapshot => {
            const dbUser = snapshot.data();

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {};
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***
  user = uid => this.db.doc(`users/${uid}`);
  users = () => this.db.collection("users");

  // *** Habit API ***
  todo = id => this.db.doc(`todos/${id}`);
  todos = () => this.db.collection("todos");
  addTodo = object => this.todos().add(object);
  habit = id => this.db.doc(`habits/${id}`);
  habits = () => this.db.collection("habits");
  addHabit = object => this.habits().add(object);
  getHabitsAndUpdateDate = () =>
    this.habits()
      .get()
      .then(snapshot => {
        let today = getTodaysDate(new Date());
        let updatedHabits = snapshot.docs.map(collectIdsAndDocsFirebase);

        this.dates()
          .where("date", "==", today)
          .get()
          .then(snapshot => {
            let dateId = snapshot.docs[0].id;
            this.date(dateId).update({ habits: updatedHabits });
          });
      });
  date = id => this.db.doc(`dates/${id}`);
  dates = () => this.db.collection("dates");
}

export default Firebase;
