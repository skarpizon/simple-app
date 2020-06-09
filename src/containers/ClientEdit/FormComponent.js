import React from 'react';
import { OutlinedInput, Divider } from '@material-ui/core';
import FormController from '../../components/FormController';
import styles from './styles.scss';

class ClientFormComponent extends FormController {
  constructor(...args) {
    super(...args);
  }

  renderGroup = (fields) => {
    return (
      <div className={styles.group}> 
        {fields}
      </div>
    )
  }

  render() {
    return (
      <form className={styles.form} autoComplete="off">
        {this.renderGroup([
          this.renderFieldWithValidator({
            FieldComponent: OutlinedInput,
            field: "name",
            label: "Имя",
          }),
          this.renderFieldWithValidator({
            FieldComponent: OutlinedInput,
            field: "surname",
            label: "Фамилия",
          }),
          this.renderFieldWithValidator({
            FieldComponent: OutlinedInput,
            field: "middleName",
            label: "Отчество",
          }),
        ])}
        <Divider />
        {this.renderGroup([
          this.renderFieldWithValidator({
            FieldComponent: OutlinedInput,
            field: "phone",
            label: "Телефон",
          }),
          this.renderFieldWithValidator({
            FieldComponent: OutlinedInput,
            field: "email",
            label: "E-mail",
          }),
        ])}
      </form>
    );
  };
}

export default ClientFormComponent;
