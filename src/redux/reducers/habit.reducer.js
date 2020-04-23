import {
  FETCH_DATES,
  FETCH_DATES_FAIL,
  FETCH_DATES_SUCCESS,
} from "../actions/habit.action";

const initialState = {
  today: new Date(),
};

const habit = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATES:
      return {
        ...state,
      };
    case FETCH_DATES_SUCCESS:
      return {
        ...state,
      };
    case FETCH_DATES_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};
