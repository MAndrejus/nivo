import React from 'react';
import styles from './fonts.module.scss';

export interface FontsProps {
  fonts: Array<any>;
  size?: number;
}

export const Fonts: React.FC<FontsProps> = ({ fonts, size }) => {
  return (
    <div className={styles.styleguideFonts}>
      <h4>Supported font weights:</h4>
      <div className={styles.styleguideFontsVariable}>$font-weight-regular: 400;</div>
      <div className={styles.styleguideFontsVariable}>$font-weight-semi-bold: 500;</div>
      <div className={styles.styleguideFontsVariable}>$font-weight-bold: 600;</div>
      <div className={styles.styleguideFontsVariable}>$font-weight-italic: 400;</div>
      <hr />

      {fonts.map((font) => (
        <div className={styles.styleguideFontsFont}>
          <h2>{font.font}</h2>
          <div className={styles.styleguideFontsVariable}>font-family: {font.variable};</div>
          <div>
            {font.weights.map((weightString: any) => {
              const [weight, fontStyle] = weightString.trim().split(' ');
              return (
                <div className={styles.styleguideFontsWeight}>
                  <div className={styles.styleguideFontsVariable}>font-weight: {weight};</div>
                  {fontStyle && (
                    <div className={styles.styleguideFontsVariable}>font-style: {fontStyle};</div>
                  )}
                  <div
                    style={{
                      fontWeight: weight,
                      fontFamily: font.font,
                      fontSize: `${size}px`,
                      fontStyle,
                    }}
                    className={styles.styleguideFontsSymbols}
                  >
                    a b c d e f g h i j k l m n o p q r s t u v w x y z <br />
                    A B C D E F G H I J K L M N O P Q R S T U V W X Y Z <br />
                    1 2 3 4 5 6 7 8 9 0 <br />~ ! @ # $ % ^ & * ( ) _ - – = + [ ] ' \ , . … / {} : ;
                    " | ? &copy; &lt; &gt;
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
