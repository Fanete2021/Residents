import { FC } from 'react';
import "./ListItem.scss";
import {classNames} from "shared/lib/classNames/classNames";

interface ListItemProps {
  id: string,
  tooltip?: string;
  onClick?: () => void;
  className?: string;
  changeSelectItem?: (id: string) => void;
}

export const ListItem: FC<ListItemProps> = (props) => {
  const {
    id,
    className,
    tooltip,
    onClick,
    children,
    changeSelectItem
  } = props;

  const mods: Record<string, boolean> = {
    tooltip: Boolean(tooltip),
    clicked: Boolean(onClick)
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
      changeSelectItem(id);
    }
  }

  return (
    <span
      className={classNames('list-item', mods, [ className ])}
      data-tooltip={tooltip}
      onClick={handleClick}
    >
      {children}
    </span>
  );
};
