import React from 'react';
import {FormGroup, Label, Input} from 'reactstrap';

export const LegendLabel = ({legendTxt, labelTxt}) => {
  return (
    <div>
      <legend>{legendTxt}</legend>
      <Label>{labelTxt}</Label>
    </div>
  );
};

export const LegendWrapper = ({legendTxt, formGroupCheck, children}) => {
  return (
    <div>
      <legend>{legendTxt}</legend>
      <FormGroup check={formGroupCheck}>
        {children}
      </FormGroup>

    </div>
  );
};

export const ValidatedRadioInput = (
  {labelText, name, formGroupCheck, validation, valueIfPass, errorTextIfFail, onChange}
) => {
  return (
    <FormGroup check={formGroupCheck} >
      <Label>
        <Input className="ml-1" onChange={onChange} type="radio" name={name} disabled={!validation} />{'  '}
        {
          validation
          ? <div className="ml-4">{`${labelText}    Max:${valueIfPass}`}</div>
          : <div className="text-muted ml-4">{labelText}</div>
        }
      </Label>{'  '}
      {!validation && <div className="text-danger">{errorTextIfFail}</div>}
    </FormGroup>
  );
};

