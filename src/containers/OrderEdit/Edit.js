import React from 'react';
import { Box, Container } from "@material-ui/core";
import MultiStepsForm from "../../components/MultiStepsForm";
import styles from './styles.scss';
import { cntcl } from '../../helpers/app';
import OrderClientForm from './forms/client';
import OrderServicesForm from './forms/services';

const steps = [
  {
    label: 'Клиент',
    formComponent: OrderClientForm,
  },
  {
    label: 'Услуги',
    formComponent: OrderServicesForm,
  },
];

function OrderEdit() {

  const handleSave = () => {
    console.log('save order');
  }
  return (
    <Box>
      <Container classes={cntcl('root',styles.container)}>
        <MultiStepsForm steps={steps} handleSave={handleSave}/>
      </Container>
    </Box>
  )
};

export default OrderEdit;