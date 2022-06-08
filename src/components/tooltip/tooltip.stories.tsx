import React from 'react';
import { Icon } from '../icons';
import { Tooltip } from './Tooltip';

const TooltipStory = { title: 'Components/Tooltip (Deprecated)', component: Tooltip };

export default TooltipStory;

const styleguideTooltipExampleContainer = {
  margin: '130px auto',
  width: '400px',
};
const styleguideTooltipsRow = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '20px',
};

export const TooltipDefault = () => {
  const shortDescription = <div>Lorem ipsum</div>;
  return (
    <div style={styleguideTooltipExampleContainer}>
      <div style={styleguideTooltipsRow}>
        <Tooltip
          trigger={<button>top left</button>}
          children={shortDescription}
          position="top left"
          offsetY={10}
        />
        <Tooltip
          trigger={<button>top center</button>}
          children={shortDescription}
          position="top center"
          offsetY={10}
        />
        <Tooltip
          trigger={<button>top right</button>}
          children={shortDescription}
          position="top right"
          offsetY={10}
        />
      </div>

      <div style={styleguideTooltipsRow}>
        <Tooltip
          trigger={<button>left center</button>}
          children={shortDescription}
          position="left center"
          offsetX={10}
        />
        <Tooltip
          trigger={<button>right center</button>}
          children={shortDescription}
          position="right center"
          offsetX={10}
        />
      </div>

      <div style={styleguideTooltipsRow}>
        <Tooltip
          trigger={<button>bottom left</button>}
          children={shortDescription}
          position="bottom left"
          offsetY={10}
        />
        <Tooltip
          trigger={<button>bottom center</button>}
          children={shortDescription}
          position="bottom center"
          offsetY={10}
        />
        <Tooltip
          trigger={<button>bottom right</button>}
          children={shortDescription}
          position="bottom right"
          offsetY={10}
        />
      </div>
    </div>
  );
};
TooltipDefault.story = {
  name: 'Tooltip positions',
};
export const TooltipLongContent = () => {
  const longDescription = (
    <div>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam minus nemo rem similique
      tempore voluptatibus. Aspernatur dolorum eos ex expedita explicabo facere fugit illum, in
      ipsum minus odio ullam veniam.
    </div>
  );
  return (
    <div style={styleguideTooltipExampleContainer}>
      <Tooltip trigger={<button>top center</button>} children={longDescription} offsetY={10} />
    </div>
  );
};
TooltipLongContent.story = {
  name: 'Tooltip long description',
};
export const TooltipIconTrigger = () => {
  const shortDescription = <div>Lorem ipsum dolor sit amet.</div>;
  const iconTrigger = (
    <span>
      <Icon name="looking-glass" size={18} />
    </span>
  );
  return (
    <div style={styleguideTooltipExampleContainer}>
      <Tooltip trigger={iconTrigger} children={shortDescription} offsetY={10} />
    </div>
  );
};
TooltipIconTrigger.story = {
  name: 'Tooltip icon trigger',
};

export const TooltipTriggeredByClick = () => {
  return (
    <div style={styleguideTooltipExampleContainer}>
      <Tooltip
        trigger={<button className="button">Trigger</button>}
        position="bottom center"
        on="click"
        offsetY={10}
      >
        <span> Triggered by click. </span>
      </Tooltip>
    </div>
  );
};

TooltipTriggeredByClick.story = {
  name: 'Triggered tool tip by click',
};
