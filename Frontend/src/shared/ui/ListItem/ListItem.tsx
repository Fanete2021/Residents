import { FC } from 'react';
import "./ListItem.scss";
import {classNames} from "shared/lib/classNames/classNames";

export enum ListItemType {

}

interface ListItemProps {
  tooltip?: string;
}

export const ListItem: FC<ListItemProps> = (props) => {
  const {
    tooltip,
    children,
  } = props;

  return (
    <span
      className={classNames('list-item', {}, [])}
      data-tooltip={tooltip}
    >
      {children}
    </span>
  );
};
