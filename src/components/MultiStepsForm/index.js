import React, { useState } from 'react';
import Form from '../Form';
import { Paper, Stepper, Step, StepButton, Button } from '@material-ui/core';
import styles from './styles.scss';
import { stepSelector, stepFormSelector, stepLabelSelector } from './selectors';
// import { cntcl } from '../../helpers/app';

function MultiStepsForm({steps}) {
  const [activeStep, setActiveStep] = useState(0);
  const step = stepSelector({ steps, activeStep });

  const totalSteps = () => {
    return steps.length;
  };

  const isFirstStep = () => {
    return activeStep === 0;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    if (!isLastStep())
      setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSetStep = (step) => () => {
    setActiveStep(step);
  };

  const headerToolbar = (
    <div className={styles.toolbar}>
      <Button 
        key="prev-step" 
        variant="contained" 
        color="primary" 
        onClick={handleBack} 
        className={isFirstStep() ? styles.hide : ''}
      >
        Назад
      </Button>
      <Button 
        key="next-step" 
        variant="contained" 
        color="primary" 
        onClick={handleNext} 
        className={isLastStep() ? styles.hide : ''}
      >
        Далее
      </Button>
    </div>
  );

  const footerToolbar = null;
  
  return (
    <React.Fragment>
      <Paper elevation={3}>
        <Stepper alternativeLabel nonLinear activeStep={activeStep}>
          {steps.map((step, index) => {
            const { label } = step;
            return (
              <Step key={label}>
                <StepButton
                  onClick={handleSetStep(index)}
                >
                  {label}
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
      </Paper>
      <Paper elevation={3} className={styles.form_paper}>
        <Form 
          headerToolbar={headerToolbar} 
          footerToolbar={footerToolbar} 
          hideSave={true} 
          form={stepFormSelector({ step })}
          label={stepLabelSelector({ step })}
        />
      </Paper>
    </React.Fragment>
  );
}

export default MultiStepsForm;


