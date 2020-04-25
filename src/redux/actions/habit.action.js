import { collectIdsAndDocsFirebase } from "../../utilities";

export const CONNECT_DATES = "CONNECT_DATES";
export const CONNECT_HABITS = "CONNECT_HABITS";
export const CONNECT_YESTERDAYS_HABITS = "CONNECT_YESTERDAYS_HABITS";
export const FETCH_TODOS = "FETCH_TODOS";
export const FETCH_TODOS_SUCCESS = "FETCH_TODOS_SUCCESS";
export const FETCH_TODOS_FAIL = "FETCH_TODOS_FAIL";

export const getDates = (snapshot) => ({
  type: CONNECT_DATES,
  payload: snapshot.docs.map(collectIdsAndDocsFirebase),
});

export const getHabits = (snapshot) => ({
  type: CONNECT_HABITS,
  payload: snapshot.docs.map(collectIdsAndDocsFirebase)[0],
});
