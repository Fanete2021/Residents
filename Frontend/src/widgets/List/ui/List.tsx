import { classNames } from 'shared/lib/classNames/classNames';
import "./List.scss";
import { ListItem } from 'shared/ui';
import { useState } from 'react';

export interface ItemData {
  id: string,
  title: string,
  onClick?: () => void,
  tooltip?: string,
  items?: ItemData[]
}

interface ListProps {
  className?: string;
  items: ItemData[]
}

const offsetLevel: number = 20;

const createListItemsRec = (
    items: ItemData[], level: number, selectedItemId: string, changeSelectItem: (id: string) => void
  ): JSX.Element => {
  return (
    <div
      style={{marginLeft: `${level * offsetLevel}px`}}
    >
      {items.map(item => (
        <div>
          <ListItem
            key={item.id}
            id={item.id}
            tooltip={item.tooltip}
            onClick={item.onClick}
            className={selectedItemId === item.id ? 'list__selected-item' : ''}
            changeSelectItem={changeSelectItem}
          >
            {item.title}
          </ListItem>

          {item.items && createListItemsRec(item.items, level + 1, selectedItemId, changeSelectItem)}
        </div>
      ))}
    </div>
  )
};

export const List = (props: ListProps) => {
  const {
    className,
    items
  } = props;

  const [selectedItemId, setSelectedItemId] = useState<string>(null);

  const changeSelectItem = (id: string) => {
    setSelectedItemId(id);
  }

  return (
    <div className={classNames('list', {}, [className])}>
      {createListItemsRec(items, 0, selectedItemId, changeSelectItem)}
    </div>
  );
};
