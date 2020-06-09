import React from 'react';
import { connect } from 'react-redux';
import { ClientAutocomplete } from '../../../components/Autocomplete';
import FormController from '../../../components/FormController';
import styles from './styles.scss';
import { getClients } from '../../../actions/clients';
import { clientsSelector } from '../../../selectors/clients';

class OrderClientForm extends FormController {
  constructor(...args) {
    super(...args);
  }

  init = () => {
    const { clients: { loaded, inited }, getClients } = this.props;
    if (!inited && !loaded && !this.inited) getClients();
    this.inited = true;
  }

  renderFields = () => {
    const { clients } = this.props;
    const { loaded } = clients;
    const options = clientsSelector(clients);
    
    return [
      this.renderFieldWithValidator({
        FieldComponent: ClientAutocomplete,
        field: "client",
        label: "Клиент",
        defaultValue: null,
        options: options,
        groupBy: (option) => option.firstLetter,
        getOptionLabel: (option) => option.title,
        getOptionSelected: (option, value) => option.id === value.id,
        altValue: true,
        hideLabel: true,
        disabled: !loaded,
      }),
    ];
  }

  render() {
    return (
      <form className={styles.form}>
        {this.renderFields()}
      </form>
    );
  };
}

const mapStateToProps = (state) => ({
  clients: state.clients,
});

const mapDispatchToProps = {
  getClients,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderClientForm);
