import { classNames } from 'shared/lib/classNames/classNames';
import "./Select.scss";
import React from "react";

interface SelectProps {
  className?: string;
  options?: string[];
  onChange?: (index: number) => void;
  initialSelect?: string
}

export const Select = (props: SelectProps) => {
  const {
    className,
    options = [],
    onChange,
    initialSelect
  } = props;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = e.target.selectedIndex;

    onChange(selectedIndex);
  };

  return (
    <div className={classNames('select', {}, [className])}>
      <select
        onChange={handleChange}
        value={initialSelect}
      >
        {options.map(option => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
