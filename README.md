# Your Toolbox

Habit tracker and todo list. This was created to be different from other habit trackers by having the calendar shows which habits on which days have not been completed.

## Key Features

- Daily habit tracker
- Calendar to show habits completed on which days
- Todo list

## Tech Stack

- React
- React Context API
- Emotion
- FontAwesome
- Firebase Cloud Firestore

### Deployed on Firebase Hosting

## Environment Variables

```env
.env.production file

REACT_APP_API_KEY=xxxxx
REACT_APP_AUTH_DOMAIN=xxxxx
REACT_APP_DATABASE_URL=xxxxx
REACT_APP_PROJECT_ID=xxxxx
REACT_APP_STORAGE_BUCKET=xxxxx
REACT_APP_MESSAGING_SENDER_ID=xxxxx
REACT_APP_APP_ID=xxxxx
```

## Future Features + Needs Work

- Add testing
- Test app using Lighthouse
- Add social component to keep people accountable
- Add goal tracker to help create better habits
- Reduce calls to Firebase Cloud Firestore

## Installation Instructions

To get client running locally:

- Clone this repo
- Create a Firebase account, with Firebase Cloud Firestore
- Copy configuration into `.env.production` file to root directory of repo
- npm install
- `yarn start`
