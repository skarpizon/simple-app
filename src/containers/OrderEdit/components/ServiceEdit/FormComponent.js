import React from 'react';
import { connect } from 'react-redux';
import { OutlinedInput, Divider, Typography } from '@material-ui/core';
import { GroupedAutocomplete } from '../../../../components/Autocomplete';
import FormController from '../../../../components/FormController';
import { getServices } from '../../../../actions/services';
import { getUsers } from '../../../../actions/users';
import styles from './styles.scss';
import { formatNumber } from '../../../../helpers/utils';

class OrderServiceFormComponent extends FormController {
  constructor(...args) {
    super(...args);
  }

  init = () => {
    const { services: { loaded: servicesLoaded, inited: servicesInited }, getServices } = this.props;
    if (!servicesLoaded && !servicesInited || !this.inited) getServices();
    const { users: { loaded: usersLoaded, inited: usersInited }, getUsers } = this.props;
    if (!usersLoaded && !usersInited || !this.inited) getUsers();
    this.setState({
      data: {
        fixedPrice: true, 
        quantity: 1,
      }
    });
    this.inited = true;
  }

  postChange = (field, value) => {
    if (field === 'service') {
      const { data } = this.state;
      if (!value) {
        this.setState({
          data: {
            ...data,
            code: null,
            name: null, 
            cost: null,
          },
        });
      } else {
        const { code, name, fixedPrice, cost } = value;
        const newData = {
          ...data,
          code,
          name, 
          fixedPrice: fixedPrice, 
          cost,
        };
        
        this.setState({ data: newData});
        const { handleChange } = this.props;
        if (handleChange)
          handleChange(newData);
      }
    }
  }

  renderGroup = (fields, title = null) => {
    return (
      <div>
        { !!title && (
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>)
        }
        <div className={styles.group}> 
          {fields}
        </div>
      </div>
    )
  }

  render() {
    const { 
      services: { loaded: servicesLoaded, items: servicesOptions },
      users: { loaded: usersLoaded, items: usersOptions },
    } = this.props;
    const { data: { fixedPrice, cost, quantity } } = this.state;
    
    return (
      
      <form className={styles.form} autoComplete="off">
        {this.renderGroup([
          this.renderFieldWithValidator({
            FieldComponent: GroupedAutocomplete,
            field: "service",
            label: "Услуга из библиотеки",
            defaultValue: null,
            options: servicesOptions,
            groupBy: (option) => option.group,
            getOptionLabel: (option) => option.name,
            getOptionSelected: (option, value) => option.id === value.id,
            altValue: true,
            hideLabel: true,
            containerStyles: styles.service,
            disabled: !servicesLoaded,
          }),
          this.renderFieldWithValidator({
            FieldComponent: OutlinedInput,
            field: "code",
            label: "Код",
            type: "number",
            disabled: true,
            containerStyles: styles.code,
          }),
          this.renderFieldWithValidator({
            FieldComponent: OutlinedInput,
            field: "name",
            label: "Наименование",
            disabled: true,
            containerStyles: styles.name,
          }),
        ])}
        <Divider />
        {this.renderGroup([
          this.renderFieldWithValidator({
            FieldComponent: GroupedAutocomplete,
            field: "workers",
            label: "Работники",
            defaultValue: [],
            options: usersOptions,
            groupBy: (option) => option.group,
            getOptionLabel: (option) => option.name,
            getOptionSelected: (option, value) => option.id === value.id,
            altValue: true,
            hideLabel: true,
            containerStyles: styles.workers,
            disabled: !usersLoaded,
            multiple: true,
            width: '100%',
          }),
        ], "Исполнители")}
        <Divider />
        {this.renderGroup([
          this.renderFieldWithValidator({
            FieldComponent: OutlinedInput,
            field: "cost",
            type: "number",
            label: "Стоимость",
            containerStyles: styles.cost,
            endAdornment: (<div className={styles.cost_adornment}>{ fixedPrice ? 'р.' : 'р/час' }</div>),
          }),
          this.renderFieldWithValidator({
            FieldComponent: OutlinedInput,
            field: "quantity",
            type: "number",
            label: `Количество ${ fixedPrice ? ' работ' : ' часов'}`,
            containerStyles: styles.quantity,
          }),
        ], "Цена")}
        { !!cost && !!quantity && (
          <div className={styles.price}>
            <Typography variant="h6" gutterBottom>
              Сумма: {formatNumber(cost * quantity)} р.
            </Typography>
          </div>
        )}
        
      </form>
    );
  };
}

const mapStateToProps = (state) => ({
  services: state.services,
  users: state.users,
});

const mapDispatchToProps = {
  getServices,
  getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderServiceFormComponent);
