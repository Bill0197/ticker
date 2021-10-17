export const SET_CURRENT_TICKER = 'SET_CURRENT_TICKER';
export const UPDATE_CURRENT_TICKER = 'UPDATE_CURRENT_TICKER';

export const setCurrentTicker = (data) => {
  return {
    type: SET_CURRENT_TICKER,
    data: data,
  };
};

export const updateCurrentTicker = (data) => {
  return {
    type: UPDATE_CURRENT_TICKER,
    data: data,
  };
};
