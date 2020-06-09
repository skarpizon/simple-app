import React, { Component } from 'react';
import { FormControl, FormHelperText, InputLabel } from '@material-ui/core';
import styles from './styles.scss';
import { isEqual } from 'lodash-es';
import clsx from 'clsx';

class FormController extends Component {
  constructor(...args) {
    super(...args);
    this.validators={};
    this.state = {
      data: {},
      touched: {},
      errors: {},
    };
    this.inited = false;
  }

  componentDidMount() {
    this.init();
    const { formItem } = this.props;
    if (formItem) this.setState({ data: formItem });
  }

  componentDidUpdate(prevProps) {
    const { formItem: prevFormItem } = prevProps;
    const { formItem } = this.props;
    if (!isEqual(formItem, prevFormItem)) {
      this.setState({ data: formItem });
    }
  }
  
  init = () => {
    this.inited = true;
  }

  setFieldValue = (field, value) => {
    const { data } = this.state;
    data[field] = value;
    this.setState(data);
  }

  getFieldValue = (field) => {
    const { data } = this.state;
    return data[field] || '';
  }

  setFieldError = (field, error) => {
    const { errors } = this.state;
    errors[field] = error;
    this.setState(errors);
  }

  getFieldError = (field) => {
    const { errors } = this.state;
    return errors[field];
  }

  setFieldBlur = (field) => {
    const { touched } = this.state;
    touched[field] = true;
    this.setState(touched);
  }

  getFieldBlur = (field) => {
    const { touched } = this.state;
    return touched[field];
  }

  handleChange = (field, value) => {
    const { data, errors } = this.state;
    let error = undefined;
    data[field] = value;
    const validator = this.validators[field];
    if (validator) {
      error = validator(value);
    };
    if (!error) {
      const { handleChange } = this.props;
      if (handleChange)
        handleChange(data);
    }
    errors[field] = error;
    this.setState({ data, errors });
    this.postChange(field, value);
  }

  postChange = (field, value) => {
    return;
  }

  handleBlur = (field) => {
    this.setFieldBlur(field);
  }

  renderFieldWithValidator = ({ 
    FieldComponent, 
    validator, 
    field, 
    label, 
    hideLabel, 
    altValue, 
    defaultValue = '',
    key,
    containerStyles,
    ...props 
  }) => {
    if (validator) this.validators[field] = validator;
    const error = this.getFieldError(field);
    const touched = this.getFieldBlur(field);
    const addedProps = {};
    return (
      <div key={key || field} className={clsx(styles.item, containerStyles)}>
        <FormControl error={!!error && touched} variant="outlined" className={styles.form_control}>
          <InputLabel htmlFor={field}>{!hideLabel ? label : ''}</InputLabel>
          <FieldComponent 
            id={field}
            label={label}
            value={this.getFieldValue(field) || defaultValue}
            onChange={(event) => this.handleChange(field, event.target.value)} 
            onBlur={(event) =>this.handleBlur(field, event.target.value)}
            {...addedProps}
            {...props}
          />
          <FormHelperText id={field}>{touched && error || ' '}</FormHelperText>
        </FormControl>
      </div>
    );
  };

  renderFields = () => {
    return [(<div key="noset">Form fields not set</div>)]
  }

  render() {
    return (
      <form className={styles.form}>
        {this.renderFields()}
      </form>
    );
  };
}

export default FormController;

