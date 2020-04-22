import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { getTodaysDate, collectIdsAndDocsFirebase } from "./utilities";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
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
        app.auth.GithubAuthProvider.PROVIDER_ID,
      ],
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
  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);
  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  // *** Merge Auth and DB User API ***
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then((snapshot) => {
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
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***
  user = (uid) => this.db.doc(`users/${uid}`);
  users = () => this.db.collection("users");
  deleteUserAndUserData = async (uid) => {
    await this.user(uid)
      .delete()
      .then(() => console.log("User successfully deleted."))
      .catch((error) => console.error(`Error removing user: ${error}`));
    await this.todos()
      .where("user", "==", uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          let batch = this.db.batch();
          snapshot.forEach((doc) => batch.delete(doc.ref));
          return batch
            .commit()
            .then(() => console.log("Todos successfully deleted."))
            .catch((error) => console.error(error));
        }
      });
    await this.habits()
      .where("user", "==", uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          let batch = this.db.batch();
          snapshot.forEach((doc) => batch.delete(doc.ref));
          return batch
            .commit()
            .then(() => console.log("Todos successfully deleted."))
            .catch((error) => console.error(error));
        }
      });
    await this.dates()
      .where("user", "==", uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          let batch = this.db.batch();
          snapshot.forEach((doc) => batch.delete(doc.ref));
          return batch
            .commit()
            .then(() => console.log("Todos successfully deleted."))
            .catch((error) => console.error(error));
        }
      });
    await this.auth.currentUser
      .delete()
      .then(() => console.log("User deleted."))
      .catch((error) => console.error(error));
  };

  // *** Habit API ***
  todo = (id) => this.db.doc(`todos/${id}`);
  todos = () => this.db.collection("todos");
  addTodo = (object) => this.todos().add(object);
  habit = (id) => this.db.doc(`habits/${id}`);
  habits = () => this.db.collection("habits");
  addHabit = (object) => this.habits().add(object);
  getHabitsAndUpdateDate = () =>
    this.habits()
      .where("user", "==", this.auth.currentUser.uid)
      .get()
      .then((snapshot) => {
        const today = getTodaysDate(new Date());
        const updatedHabits = snapshot.docs.map(collectIdsAndDocsFirebase);
        this.dates()
          .where("date", "==", today)
          .where("user", "==", this.auth.currentUser.uid)
          .get()
          .then((snapshot) => {
            const dateId = snapshot.docs[0].id;
            const currentDate = snapshot.docs.map(collectIdsAndDocsFirebase)[0];
            const currentDateHabits = currentDate.habits;
            const updatedHabitsForDate = updatedHabits.map((habit, idx) => {
              const indexOfHabit = currentDateHabits.findIndex(
                (el) => el.id === habit.id
              );
              if (indexOfHabit !== -1) {
                return { ...habit, done: currentDateHabits[indexOfHabit].done };
              }
              return { ...habit, done: false };
            });
            this.date(dateId).update({ habits: updatedHabitsForDate });
          });
      });
  toggleHabit = (habit, date) =>
    this.dates()
      .where("date", "==", date)
      .where("user", "==", this.auth.currentUser.uid)
      .get()
      .then((snapshot) => {
        let date = snapshot.docs[0];
        let updatedHabits = date.data().habits.map((h) => {
          if (h.id === habit.id) {
            h.done = !h.done;
          }
          return h;
        });

        this.date(date.id).update({ habits: updatedHabits });
      });
  date = (id) => this.db.doc(`dates/${id}`);
  dates = () => this.db.collection("dates");
  createDateWithHabits = (date, uid) =>
    this.habits()
      .where("user", "==", uid)
      .get()
      .then((snapshot) => {
        let habits = snapshot.docs.map(collectIdsAndDocsFirebase);

        habits = habits.map((habit) => ({ ...habit, done: false }));

        this.dates().add({
          user: uid,
          date: date,
          habits: habits,
        });
      });
}

export default Firebase;
