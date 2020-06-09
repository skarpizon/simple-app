import React from 'react';
import MaterialTable, { MTableAction } from 'material-table';
import { tableIcons, getLocalization } from './index';
// import { Typography, Toolbar } from '@material-ui/core';
// import styles from './styles.scss';
// import { cntcl } from '../../helpers/app';

export default function Table({
  title = 'Table',
  columns = [],
  data = [],
  actions,
  onDelete = () => {},
}) {

  return (
    <MaterialTable
      icons={tableIcons}
      title={title}
      columns={columns}
      data={data}
      localization={getLocalization()}
      options={{ 
        paging: false, 
        search: false, 
        tableLayout: 'fixed',
      }}
      editable={{
        onRowDelete: onDelete,
      }}
      actions={actions}
      components={{
        Action: props => {
          const { action: { renderItem } } = props;
          if (renderItem)
            return renderItem(props);
          return <MTableAction {...props}/>
        },
        // Toolbar: ({ title }) => (
        //   <div className={styles.header}>
        //     <Toolbar classes={cntcl('root',styles.toolbar)}>
        //       <Typography variant="h6" color="primary" classes={cntcl('root',styles.title)}>
        //         {title}
        //       </Typography>
        //       <div>1</div> 
        //     </Toolbar>
        //   </div>
        // ),
      }}
    />
  )
}
