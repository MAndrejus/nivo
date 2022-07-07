import React from 'react';
import { Box } from '../../components/box';
import classNames from 'classnames/bind';
import styles from './buttons.module.scss';
import * as allButtons from '../../components/form/button/v2';

const cx = classNames.bind(styles);
const buttons = [
  {
    type: 'Default',
    module: allButtons.Button,
    useCase: '',
  },
  {
    type: 'Primary',
    module: allButtons.PrimaryButton,
    useCase: '',
    description:
      'Use for a primary action on a page or form. Use only once unless specified exception is needed. Example: Submit button',
  },
  {
    type: 'Secondary',
    module: allButtons.SecondaryButton,
    useCase: '',
    description:
      'Use for a secondary action on page or form when primary is already used. Use only once unless specified exception is needed. Example: goto Homepage',
  },
  {
    type: 'Tertiary',
    module: allButtons.TertiaryButton,
    useCase: '',
    description:
      'Use for supporting or least important actions on page or form. Identical in function to Action. Can be used multiple times. Example: Reset all instances, cancel',
  },
  {
    type: 'Danger',
    module: allButtons.DangerButton,
    useCase: '',
    description:
      'Use for destructive actions that are difficult or impossible to undo, like Delete. Don’t use this style multiple times in the same area.',
  },
  {
    type: 'Action Primary',
    module: allButtons.ActionPrimaryButton,
    useCase: '',
    description:
      'Use for supporting or least important actions on page or form. Contains padding on each side, reference Zeplin. Identical in function to Tertiary. Can be used multiple times. Example: cancel',
  },
  {
    type: 'Action Danger',
    module: allButtons.ActionDangerButton,
    useCase: '',
    description:
      'Use for less destructive actions, like Cancel. This style is lower in hierarchy than Danger and should be right placed. Contains padding on each side, reference Zeplin. Can be used multiple but not advised. ',
  },
  {
    type: 'Link Primary',
    module: allButtons.LinkPrimaryButton,
    useCase: '',
    description:
      'Use to link to other pages, whether internal or external to Emotomy. No padding needed. Can be used in-line with body copy. Do not use in-line with headings.',
  },
];

export const Buttons = () => {
  return (
    <Box>
      <table className={cx('buttons-table')}>
        <thead>
          <tr>
            <th />
            <th>Button</th>
            <th>Anchor</th>
            <th>Icon Left</th>
            <th>Icon Right</th>
            <th>Disabled Button</th>
            <th>Disabled Anchor</th>
            <th>Disabled Icon Left</th>
            <th>Disabled Icon Right</th>
            <th>
              <div className={cx('w110')}>Icon Button</div>
            </th>
            <th>
              <div className={cx('w110')}>Icon Anchor</div>
            </th>
            <th>
              <div className={cx('w110')}>Disabled Icon Button</div>
            </th>
            <th>
              <div className={cx('w110')}>Disabled Icon Anchor</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {buttons.map((button, index) => {
            const ButtonModule = button.module;

            return (
              <React.Fragment key={index}>
                {button.description && (
                  <tr className={cx('use-case')}>
                    <td>Use Case</td>
                    <td colSpan={11}>
                      <div className={cx('mw900')}>{button.description}</div>
                    </td>
                  </tr>
                )}
                <tr>
                  <td>{button.type}</td>
                  <td>
                    <ButtonModule>lorem</ButtonModule>
                  </td>
                  <td>
                    <ButtonModule href={'#something'}>lorem</ButtonModule>
                  </td>
                  <td>
                    <ButtonModule iconLeft={{ name: 'email' }}>lorem</ButtonModule>
                  </td>
                  <td>
                    <ButtonModule iconRight={{ name: 'email' }}>lorem</ButtonModule>
                  </td>
                  <td>
                    <ButtonModule disabled>lorem</ButtonModule>
                  </td>
                  <td>
                    <ButtonModule href={'#something'} disabled>
                      lorem
                    </ButtonModule>
                  </td>
                  <td>
                    <ButtonModule iconLeft={{ name: 'email' }} disabled>
                      lorem
                    </ButtonModule>
                  </td>
                  <td>
                    <ButtonModule iconRight={{ name: 'email' }} disabled>
                      lorem
                    </ButtonModule>
                  </td>
                  <td>
                    <ButtonModule iconLeft={{ name: 'email' }} />
                  </td>
                  <td>
                    <ButtonModule href={'#something'} iconLeft={{ name: 'email' }} />
                  </td>
                  <td>
                    <ButtonModule iconLeft={{ name: 'email' }} disabled />
                  </td>
                  <td>
                    <ButtonModule href={'#something'} iconLeft={{ name: 'email' }} disabled />
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </Box>
  );
};
