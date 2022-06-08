import React from 'react';
import { QuestionMarkPopper } from './QuestionMarkPopper';

const QuestionMarkStory = { title: 'Components/QuestionMark', component: QuestionMarkPopper };

export default QuestionMarkStory;

const styleguideTooltipExampleContainer = {
  margin: '130px auto',
  width: '400px',
};

export const QuestionMarkDefault = () => {
  const shortDescription = <div>Lorem ipsum</div>;
  return (
    <div style={styleguideTooltipExampleContainer}>
      <QuestionMarkPopper placement={'top-start'}>{shortDescription}</QuestionMarkPopper>
    </div>
  );
};
QuestionMarkDefault.story = {
  name: 'QuestionMark',
};

export const InfoMarkDefault = () => {
  const shortDescription = <div>Lorem ipsum</div>;
  return (
    <div style={styleguideTooltipExampleContainer}>
      <QuestionMarkPopper placement={'top-start'} icon={'infoIcon'}>
        {shortDescription}
      </QuestionMarkPopper>
    </div>
  );
};
InfoMarkDefault.story = {
  name: 'InfoMark',
};
