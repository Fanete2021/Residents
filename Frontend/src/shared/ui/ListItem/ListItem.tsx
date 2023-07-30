import { FC } from 'react';
import "./ListItem.scss";
import {classNames} from "shared/lib/classNames/classNames";

export enum ListItemType {

}

interface ListItemProps {
  tooltip?: string;
  onClick?: () => void;
}

export const ListItem: FC<ListItemProps> = (props) => {
  const {
    tooltip,
    onClick,
    children,
  } = props;

  const mods: Record<string, boolean> = {
    tooltip: Boolean(tooltip),
    clicked: Boolean(onClick)
  };

  return (
    <span
      className={classNames('list-item', mods, [])}
      data-tooltip={tooltip}
      onClick={onClick}
    >
      {children}
    </span>
  );
};
