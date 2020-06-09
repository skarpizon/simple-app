import React from 'react'
import { FormModal } from '../../../../components/Modal'
import ServiceFormComponent from './FormComponent';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import styles from './styles.scss';
import { connect } from 'react-redux';
import { MTableAction } from 'material-table';

class Modal extends FormModal {

  handleSave = () => {
    const { data } = this.state;
    if (this.isFormChanged()) {
      const { onSave } = this.props;
      if (onSave) onSave(data);
    }
    this.setState({ loading: false, isOpen: false });
  };

  renderOpenButton = () => {
    const { formItem, btn } = this.props;
    if (btn) {
      const { action, ...other } = btn;
      return <MTableAction {...other} action={{ ...action, onClick: this.handleClickOpen }}/>
    }
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
  title: `${ props.formItem ? 'Редактирование услуги в заказе' : 'Добавить услугу в заказ'}`,
  form: ServiceFormComponent,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
