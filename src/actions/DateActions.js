const { DEFAULT_LATEST_DATE } = require('../helpers/helpers');

export const NOW_SELECTING_DATE = 'NOW_SELECTING_DATE';
export const SET_SELECTED_DATE = 'SET_SELECTED_DATE';

export const selectingDate = (date) => {
  return {
    type: NOW_SELECTING_DATE,
    data: date,
  };
};
export const setSelectedDate = (date = DEFAULT_LATEST_DATE) => {
  return {
    type: SET_SELECTED_DATE,
    data: date,
  };
};
