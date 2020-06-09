import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './styles.scss';
import { cntcl } from '../../helpers/app';
import { isEqual } from 'lodash-es';


class FormModal extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      isOpen: false,
      loading: false,
      data: {},
    };
  }

  componentDidMount() {
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

  isFormChanged = () => {
    // need Override
    return true;
  }

  handleClickOpen = () => {
    this.setState({ isOpen: true});
  };

  handleClose = () => {
    this.setState({ isOpen: false});
  };

  handleChange = (data) => {
    const { handleChange } = this.props;
    
    this.setState({ data: data });
    if (handleChange)
      handleChange(data);
  };

  handleSave = () => {
    console.error("handleSave not overrided");
  };

  renderOpenButton = () => {
    return (
      <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
        Open
      </Button>
    )
  };

  renderFormComponent = () => {
    const { form: FormComponent, formItem } = this.props;
    if (FormComponent)
      return (<FormComponent handleChange={this.handleChange} formItem={formItem} />);
    else return (<div>FormComponent not set</div>);
  };

  render() {
    const { isOpen, loading } = this.state;
    const { title } = this.props;
    return (
      <div>
        {this.renderOpenButton()}
        <Dialog 
          open={isOpen} 
          onClose={this.handleClose} 
          aria-labelledby="form-dialog-title" 
          disableBackdropClick
          maxWidth="sm"
          fullWidth={true}
          classes={cntcl('paper', styles.modal_container)}
        >
          <DialogTitle id="form-dialog-title">{title}</DialogTitle>
          <DialogContent>
            {this.renderFormComponent()}
          </DialogContent>
          <div className={styles.actions}>
            <Button onClick={this.handleClose} variant="contained" color="primary" className={styles.btn}>
              Отмена
            </Button>
            <Button onClick={this.handleSave} variant="contained" color="primary" className={styles.btn}>
              { !loading ? "Сохранить" : (<CircularProgress className={styles.loader} size={24}/> ) }
            </Button>
          </div>
        </Dialog>
      </div>
    );
  };
}

export default FormModal;