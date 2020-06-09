import React from 'react'
import { FormModal } from '../../components/Modal'
import ClientFormComponent from './FormComponent';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import styles from './styles.scss';
import { connect } from 'react-redux';
import { saveClient } from '../../actions/clients';
import { formatClient } from '../../helpers/utils';

class Modal extends FormModal {

  handleSave = () => {
    const { saveClient } = this.props;
    const { data } = this.state;
    this.setState({ loading: true });
    if (this.isFormChanged()) 
      saveClient(data).then((back) => {
        this.handleSaved(formatClient(back.payload));
      });
    else  
      this.setState({ loading: false, isOpen: false });
  };

  handleSaved = (client) => {
    const { onSave } = this.props;
    if (onSave) onSave(client);
    this.setState({ loading: false, isOpen: false });
  };

  renderOpenButton = () => {
    const { formItem } = this.props;
    return (
      <IconButton 
        aria-label="delete" 
        onClick={this.handleClickOpen}
        className={styles.btn}
      >
        { formItem ? <EditIcon fontSize="large"/> : <AddIcon fontSize="large"/> }
      </IconButton>
    )
  };
  
}

const mapStateToProps = (state, props) => ({
  title: `${ props.id ? 'Редактирование' : 'Создание'} клиента`,
  form: ClientFormComponent,
});

const mapDispatchToProps = {
  saveClient,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
