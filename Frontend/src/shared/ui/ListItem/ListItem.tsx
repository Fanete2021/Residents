import { FC } from 'react';
import "./ListItem.scss";
import {classNames} from "shared/lib/classNames/classNames";

export enum ListItemType {

}

interface ListItemProps {
}

export const ListItem: FC<ListItemProps> = (props) => {
  const {
    children
  } = props;

  return (
    <div className={classNames('list-item', {}, [])}>
      {children}
    </div>
  );
};
