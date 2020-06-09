import React from 'react';
import { ClientEditModal } from '../../containers/ClientEdit';
import Grouped from './Grouped';
import styles from './styles.scss';
import { parseClientFromOption } from '../../helpers/utils';

export default function ClientAutocomplete({ value, onChange, ...props}) {
  return (
    <div className={styles.client}>
      <Grouped onChange={onChange} {...props} value={value}/>
      <ClientEditModal formItem={parseClientFromOption(value)} onSave={(item) => onChange({ target: { value: item }})}/>
    </div>
  );
}