import {
  CONNECT_DATES,
  CONNECT_HABITS,
  CONNECT_YESTERDAYS_HABITS,
  FETCH_TODOS,
  FETCH_TODOS_FAIL,
  FETCH_TODOS_SUCCESS,
} from "../actions/habit.action";

const initialState = {
  today: new Date(),
  dates: [],
  habits: [],
  yesterdaysHabits: [],
  todos: [],
};

const habit = (state = initialState, action) => {
  switch (action.type) {
    case CONNECT_DATES:
      return {
        ...state,
        dates: action.payload,
      };
    case CONNECT_HABITS:
      return {
        ...state,
        habits: action.payload,
      };
    case CONNECT_YESTERDAYS_HABITS:
      return {
        ...state,
        yesterdaysHabits: action.payload,
      };
    case FETCH_TODOS:
      return {
        ...state,
        todos: action.payload,
      };
    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        todos: action.payload,
      };
    case FETCH_TODOS_FAIL:
      return {
        ...state,
        todos: action.payload,
      };
    default:
      return state;
  }
};

export default habit;
