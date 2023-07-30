import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import './Text.scss';

export enum TextTheme {
  PRIMARY = 'primary',
  ERROR = 'error'
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
}

export const Text: FC<TextProps> = (props) => {
  const {
    className,
    title,
    text,
    theme = TextTheme.PRIMARY
  } = props;

  return (
    <div className={classNames('wrapper-text', {}, [ className, theme ])}>
      {title &&
        <p
          className={'wrapper-text__title'}
        >
          {title}
        </p>
      }

      {text &&
        <p
          className={'wrapper-text__text'}
        >
          {text}
        </p>
      }
    </div>
  );
};
