import React, { useState } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-rangeslider';
import { Badge } from 'reactstrap';
import { setSelectedDate } from '../actions/DateActions';

const { dateSliderArray } = require('../helpers/helpers');

const mapStateToProps = (state) => {
  return {
    date: state.date,
    stocks: state.stocks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedDate: (date) => {
      dispatch(setSelectedDate(date));
    },
  };
};

const DateSliderContainer = () => {
  super(props);
  const [state, setState] = useState({
    current: props.date.current,
  });

  const onChange = (sliderVal) =>
    setState({ current: dateSliderArray[sliderVal] });

  const onChangeComplete = () => {
    let { current } = state;
    props.setSelectedDate(current);
  };

  const format = (sliderVal) => dateSliderArray[sliderVal];
  let current = state.current;
  return (
    <div>
      <Slider
        min={0}
        max={dateSliderArray.length - 1}
        step={1}
        value={dateSliderArray.indexOf(current)}
        format={format}
        onChange={onChange}
        onChangeComplete={onChangeComplete}
      />
      <h3 className='float-right mr-3'>
        Date: <Badge color='secondary'>{current}</Badge>
      </h3>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DateSliderContainer);
