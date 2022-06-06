import React from 'react';

const TypographyStory = {
  title: 'Style Guide/Typography',
};

export default TypographyStory;

export const Overview = () => {
  return (
    <article>
      <h1>Heading 1</h1>
      <p>
        Lorem <strong>ipsum</strong> <em>dolor</em> sit amet, consectetur adipisicing elit. A cum
        dolore dolores, doloribus eius eligendi eos error illum, ipsum iste iure iusto labore
        pariatur quaerat quo similique soluta suscipit tempora?
      </p>
      <ul>
        <li>Item 1</li>
        <li>
          <span>Item 2</span>
          <ol>
            <li>Item 2.1</li>
            <li>
              <strong>Item 2.2</strong>
            </li>
          </ol>
        </li>
      </ul>
      <hr />
      <h2>Heading 2</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab architecto,{' '}
        <a href={'#toPage'}>asperiores</a> at eius et ex, excepturi nobis odit qui quia quis quo
        sint. Deleniti error iure mollitia natus necessitatibus.
      </p>
      <h3>Heading 3</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab architecto, at eius et ex,
        nobis odit qui quia quis quo sint. Deleniti error iure mollitia natus necessitatibus.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab architecto, at eius et ex,
        nobis odit qui quia quis quo sint. Deleniti error iure mollitia natus necessitatibus.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab architecto, at eius et ex,
        nobis odit qui quia quis quo sint. Deleniti error iure mollitia natus necessitatibus.
      </p>
      <h4>Heading 4</h4>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab architecto, at eius et ex,
        nobis odit qui quia quis quo sint. Deleniti error iure mollitia natus necessitatibus.
      </p>
    </article>
  );
};

// Headings
export const Headings = () => {
  return (
    <div>
      <h1>H1</h1>
      <h2>H2</h2>
      <h3>H3</h3>
      <h4>H4</h4>
    </div>
  );
};

// Paragraph and Lists
export const Paragraph = () => {
  return (
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dicta ducimus hic labore
      laboriosam, praesentium quasi? Alias amet autem beatae deserunt eaque eius eveniet impedit
      itaque modi, molestias quidem veniam!
    </p>
  );
};

export const UnorderedList = () => {
  return (
    <ul>
      <li>Item 1</li>
      <li>
        <span>Item 2</span>
        <ul>
          <li>
            <span>Item 2.1</span>
            <ul>
              <li>Item 2.1.1</li>
              <li>Item 2.1.2</li>
            </ul>
          </li>
          <li>Item 2.2</li>
        </ul>
      </li>
      <li>Item 3</li>
    </ul>
  );
};

export const OrderedList = () => {
  return (
    <ol>
      <li>Item 1</li>
      <li>
        <span>Item 2</span>
        <ol>
          <li>
            <span>Item 2.1</span>
            <ol>
              <li>Item 2.1.1</li>
              <li>Item 2.1.2</li>
            </ol>
          </li>
          <li>Item 2.2</li>
        </ol>
      </li>
      <li>Item 3</li>
    </ol>
  );
};

// Strong
export const Strong = () => {
  return (
    <p>
      Some text that explains context and then some important information <strong>goes here</strong>
      .
    </p>
  );
};

Strong.parameters = {
  docs: {
    description: {
      story:
        '`<strong>` should be used when information or text inside it is more important than surrounding text. <br/> ' +
        '`<b>` should not be used, because it does not have semantic purpose and font boldness should be resolve by styling.',
    },
  },
};

// Italic
export const Italic = () => {
  return (
    <p>
      I <em>had</em> to do it. <br />
      The Latin phrase <i>Veni, vidi, vici</i> is often mentioned in music, art, and literature.
    </p>
  );
};

Italic.story = {
  name: 'Em, i - italic',
};

Italic.parameters = {
  docs: {
    description: {
      story:
        '`<em>` is for words that have a stressed emphasis compared to surrounding text, which is often limited to a word or words of a sentence and affects the meaning of the sentence itself. <br/> ' +
        '`<i>` represents a range of text that is set off from the normal text for some reason. Some examples include technical terms, foreign language phrases, or fictional character thoughts. It is typically displayed in italic type.',
    },
  },
};

// Link
export const Link = () => {
  return <a href="#linkToSomething">Link To Something</a>;
};

// hr
export const Hr = () => {
  return (
    <>
      text 1
      <hr />
      text 2
    </>
  );
};
