import { createSelector } from 'reselect';
import { get } from 'lodash-es';

const stepSelector = createSelector(
  ({steps}) => steps,
  ({activeStep}) => activeStep,
  (steps, step) => steps[step] || {}
);

const stepFormSelector = createSelector(
  ({step}) => step,
  (step) => get(step, 'formComponent') || null
);

const stepLabelSelector = createSelector(
  ({step}) => step,
  (step) => get(step, 'label') || null
);

export {
  stepSelector,
  stepFormSelector,
  stepLabelSelector,
};