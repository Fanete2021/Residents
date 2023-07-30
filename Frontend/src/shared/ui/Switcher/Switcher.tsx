import { classNames } from 'shared/lib/classNames/classNames';
import  "./Switcher.scss";
import {useState} from "react";

interface SwitcherProps {
  className?: string;
  variants: string[];
  onChange?: (index: number) => void;
  initialIndex?: number;
}

export const Switcher = (props: SwitcherProps) => {
  const {
    className,
    variants,
    onChange,
    initialIndex = 0
  } = props;

  const [choiceIndex, setChoiceIndex] = useState<number>(initialIndex);

  const onClick = (index: number) => {
    setChoiceIndex(index);
    onChange(index);
  }

  return (
    <div className={classNames('switcher', {}, [className])}>
      {variants.map((variant, index) => (
        <div
          className={`${variant === variants[choiceIndex] ? 'switch__current-variant' : 'switch__variant'}`}
          onClick={() => onClick(index)}
          key={variant}
        >
          {variant}
        </div>
      ))}
    </div>
  );
};
