import React from 'react';
import { Icon } from '../icons';
import { TooltipPopper } from './TooltipPopper';

const TooltipPopperStory = { title: 'Components/TooltipPopper', component: TooltipPopper };

export default TooltipPopperStory;

const styleguideTooltipExampleContainer = {
  margin: '130px auto',
  width: '400px',
};
const styleguideTooltipsRow = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '20px',
};

export const TooltipPopperDefault = () => {
  const shortDescription = <div>Lorem ipsum</div>;
  return (
    <div style={styleguideTooltipExampleContainer}>
      <div style={styleguideTooltipsRow}>
        <TooltipPopper
          containerSupplier={(ref) => <button ref={ref}>top left</button>}
          placement={'top-start'}
          offset={[0, 10]}
        >
          {shortDescription}
        </TooltipPopper>
        <TooltipPopper
          containerSupplier={(ref) => <button ref={ref}>top center</button>}
          placement={'top'}
          offset={[0, 10]}
        >
          {shortDescription}
        </TooltipPopper>
        <TooltipPopper
          containerSupplier={(ref) => <button ref={ref}>top right</button>}
          placement={'top-end'}
          offset={[0, 10]}
        >
          {shortDescription}
        </TooltipPopper>
      </div>

      <div style={styleguideTooltipsRow}>
        <TooltipPopper
          containerSupplier={(ref) => <button ref={ref}>left center</button>}
          placement={'left'}
          offset={[0, 10]}
        >
          {shortDescription}
        </TooltipPopper>
        <TooltipPopper
          containerSupplier={(ref) => <button ref={ref}>right center</button>}
          placement={'right'}
          offset={[0, 10]}
        >
          {shortDescription}
        </TooltipPopper>
      </div>

      <div style={styleguideTooltipsRow}>
        <TooltipPopper
          containerSupplier={(ref) => <button ref={ref}>bottom start</button>}
          placement={'bottom-start'}
          offset={[0, 10]}
        >
          {shortDescription}
        </TooltipPopper>
        <TooltipPopper
          containerSupplier={(ref) => <button ref={ref}>bottom center</button>}
          placement={'bottom'}
          offset={[0, 10]}
        >
          {shortDescription}
        </TooltipPopper>
        <TooltipPopper
          containerSupplier={(ref) => <button ref={ref}>bottom right</button>}
          placement={'bottom-end'}
          offset={[0, 10]}
        >
          {shortDescription}
        </TooltipPopper>
      </div>
    </div>
  );
};
TooltipPopperDefault.story = {
  name: 'Tooltip positions',
};
export const TooltipPopperLongContent = () => {
  const longDescription = (
    <div>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam minus nemo rem similique
      tempore voluptatibus. Aspernatur dolorum eos ex expedita explicabo facere fugit illum, in
      ipsum minus odio ullam veniam.
    </div>
  );
  return (
    <div style={styleguideTooltipExampleContainer}>
      <TooltipPopper
        containerSupplier={(ref) => <button ref={ref}>top center</button>}
        placement={'top'}
        offset={[0, 10]}
      >
        {longDescription}
      </TooltipPopper>
    </div>
  );
};
TooltipPopperLongContent.story = {
  name: 'Tooltip long description',
};
export const TooltipPopperIconTrigger = () => {
  const shortDescription = <div>Lorem ipsum dolor sit amet.</div>;
  return (
    <div style={styleguideTooltipExampleContainer}>
      <TooltipPopper
        containerSupplier={(ref) => (
          <span ref={ref}>
            <Icon name="looking-glass" size={18} />
          </span>
        )}
        placement={'top'}
        offset={[0, 10]}
      >
        {shortDescription}
      </TooltipPopper>
    </div>
  );
};
TooltipPopperIconTrigger.story = {
  name: 'Tooltip icon trigger',
};

export const TooltipPopperTriggeredByClick = () => {
  return (
    <div style={styleguideTooltipExampleContainer}>
      <TooltipPopper
        containerSupplier={(ref) => <button ref={ref}>top center with simple text</button>}
        placement={'top'}
        offset={[0, 10]}
        text={'Triggered by click.'}
        trigger={'click'}
      />
    </div>
  );
};

TooltipPopperTriggeredByClick.story = {
  name: 'Triggered tool tip by click',
};
