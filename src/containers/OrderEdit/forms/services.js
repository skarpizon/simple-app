import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.scss';
import { getClients } from '../../../actions/clients';
import Table, { tableIcons } from '../../../components/Table';
import { OrderServiceEditModal } from '../components/ServiceEdit';

class OrderServicesForm extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      data: [],
      columns: [],
    }
  }

  componentDidMount() {
    this.setState({
      data: this.getData(),
      columns: this.getColumns(),
      actions: this.getActions(),
    });
  }

  handleSave = (newItem) => {
    const { id, tempId } = newItem;
    const { data } = this.state;
    let newData = [];
    if (id || tempId) {
      const index = data.findIndex((item) => item.id === id || item.tempId === tempId);
      if (index !== -1) {
        newData = [ ...data.slice(0, index), newItem, ...data.slice(index + 1)];
      } 
    } else {
      newData = [ ...data, { ...newItem, tempId: `temp_${Date.now()}`  }];
    }
    
    this.setState({ data: newData });
  }

  handleDelete = ({ id, tempId }) => {
    return new Promise((resolve, reject) => {
      const { data } = this.state;
      const index = data.findIndex((item) => item.id === id || item.tempId === tempId);
      if (index !== -1) {
        const newData = [...data.slice(0, index), ...data.slice(index + 1)]
        this.setState({ data: newData });
        resolve();
      };
      reject();
    });
  }

  getData = () => {
    return [];
  }

  renderWorkers = (workers) => {
    if (!workers || !workers.length)
      return '';
    return workers.map((item) => item.name).join(', ');
  }

  getColumns = () => {
    return [
      { title: 'Код', field: 'code', width: 100 },
      { title: 'Наименование', field: 'name' },
      { title: 'Исполнители', field: 'workers', render: (rowData) => this.renderWorkers(rowData.workers)},
      { title: 'Стоимость', field: 'cost', width: 120 },
      { title: 'Количество', field: 'quantity', width: 120 },
      { title: 'Сумма', render: (rowData) => rowData.cost && rowData.quantity ? rowData.cost*rowData.quantity : '', width: 140 },
    ];
  }

  getActions = () => {
    return [
      {
        icon: tableIcons.Edit,
        tooltip: 'Редактировать',
        onClick: () => null,
        renderItem: (props) => 
          <OrderServiceEditModal formItem={props.data} btn={props} onSave={this.handleSave}/>
      },
      {
        icon: tableIcons.Add,
        tooltip: 'Добавить запись',
        isFreeAction: true,
        onClick: () => null,
        renderItem: (props) => 
          <OrderServiceEditModal btn={props} onSave={this.handleSave}/>
      }
    ];
  }
  

  render() {
    const { columns, data, actions } = this.state;
    
    return (
      <form className={styles.form__full}>
        <Table
          title="Оказываемые услуги"
          columns={columns}
          data={data}
          actions={actions}
          onDelete={this.handleDelete}
        />
      </form>
    );
  };
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderServicesForm);
