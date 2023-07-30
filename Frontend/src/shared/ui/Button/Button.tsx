import { ButtonHTMLAttributes, FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import './Button.scss';

export enum ButtonTheme {
  CLEAR = 'clear',
  OUTLINE = 'outline',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    theme,
    disabled,
    children,
    ...otherProps
  } = props;

  const mods: Record<string, boolean> = {
    "disabled": disabled
  };

  return (
    <button
      type='button'
      className={classNames('button', mods, [ className, theme ])}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
};
