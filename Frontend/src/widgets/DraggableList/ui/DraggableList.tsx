import { classNames } from 'shared/lib/classNames/classNames';
import "./DraggableList.scss";
import {DraggableListItem} from "shared/ui";
import React, {useEffect, useState} from 'react';

interface DraggableListProps {
  className?: string;
  items?: string[];
  onChange?: (index: number, swapIndex: number) => void;
  onDelete?: (index: number) => void;
}

export const DraggableList = (props: DraggableListProps) => {
  const {
    className,
    items,
    onChange,
    onDelete
  } = props;

  const [ data, setData ] = useState<string[]>([]);
  const [ dragStartIndex, setDragStartIndex ] = useState<number>(null);

  useEffect(() => {
    setData(items);
  }, [items]);

  const onDragStart = (index: number) => setDragStartIndex(index)

  const onDrop = (dropIndex: number) => {
    if (onChange) {
      onChange(dragStartIndex, dropIndex);
    } else {
      const dragItem = data[dragStartIndex]

      let list = [...data]
      list.splice(dragStartIndex, 1)

      if (dragStartIndex < dropIndex) {
        setData([
          ...list.slice(0, dropIndex - 1),
          dragItem,
          ...list.slice(dropIndex - 1, list.length)
        ])
      } else {
        setData([
          ...list.slice(0, dropIndex),
          dragItem,
          ...list.slice(dropIndex, list.length)
        ])
      }
    }
  }

  return (
    <div className={classNames('wrapper-list', {}, [className])}>
      <ul className={'wrapper-list__draggable-list'}>
        {data.map((item, index) => (
          <DraggableListItem
            className='draggable-list__item'
            key={index}
            index={index}
            onDragStart={onDragStart}
            onDrop={onDrop}
            onDelete={onDelete}
          >
            {item}
          </DraggableListItem>
        ))}

        <DraggableListItem
          className='draggable-list__item'
          index={items.length}
          draggable={false}
          onDrop={(index: number) => onDrop(index)}
        />
      </ul>
    </div>
  );
};
