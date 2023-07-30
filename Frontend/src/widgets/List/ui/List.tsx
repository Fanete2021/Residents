import { classNames } from 'shared/lib/classNames/classNames';
import "./List.scss";
import { ListItem } from 'shared/ui';

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

const createListItemsRec = (items: ItemData[], level: number): JSX.Element => {
  return (
    <div
      style={{marginLeft: `${level * offsetLevel}px`}}
    >
      {items.map(item => (
        <div>
          <ListItem
            key={item.id}
            tooltip={item.tooltip}
            onClick={item.onClick}
          >
            {item.title}
          </ListItem>

          {item.items && createListItemsRec(item.items, level + 1)}
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

  return (
    <div className={classNames('list', {}, [className])}>
      {createListItemsRec(items, 0)}
    </div>
  );
};
