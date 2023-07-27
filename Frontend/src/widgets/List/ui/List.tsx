import { classNames } from 'shared/lib/classNames/classNames';
import "./List.scss";
import {Resident} from "entities/Resident";
import { ListItem } from 'shared/ui';
import { ReactNode } from 'react';

export interface ItemData {
  title: string,
  items?: ItemData[]
}

interface ListProps {
  className?: string;
  items: ItemData[]
}

const createListItems: ReactNode = (resident: Resident) => {
  const names = resident.groups.map(gr => gr.name);

  return (
    <ListItem>
      {names}
    </ListItem>
  )
}

export const List = (props: ListProps) => {
  const {
    className,
    items
  } = props;

  return (
    <div className={classNames('list', {}, [className])}>
      {data.map((d) => (
        <ListItem
          key={d.name}
        >
          {d.name}
        </ListItem>
      ))}
    </div>
  );
};
