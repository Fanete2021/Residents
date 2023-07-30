import React, {FC, useCallback, useRef, useState} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import "./DraggableListItem.scss";

const ghostName: string = 'ghostNode';

interface DraggableListItemProps {
  className?: string;
  draggable?: boolean;
  index: number;
  onDragStart?: (index: number) => void;
  onDrop?: (index: number) => void;
  onDelete?: (index: number) => void;
}

export const DraggableListItem: FC<DraggableListItemProps> = (props) => {
  const {
    className,
    children,
    draggable = true,
    index,
    onDragStart,
    onDrop,
    onDelete
  } = props;

  const itemRef = useRef<HTMLLIElement>(null);
  const ghostRef = useRef<HTMLElement>(null);
  const [dragging, setDragging] = useState<boolean>(false);

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>) => {
    const targetElement = e.target as HTMLLIElement;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setDragImage(targetElement, 50000, 50000);

    const ghostNode = targetElement.cloneNode(true) as HTMLElement;

    ghostNode.style.position = "absolute";
    ghostNode.style.top = (e.pageY - targetElement.offsetHeight / 2) + 'px';
    ghostNode.style.left = (e.pageX - targetElement.offsetWidth / 2) + 'px';
    ghostNode.style.zIndex = '10';
    ghostNode.style.color = 'white';
    ghostNode.style.height = targetElement.offsetHeight + 'px';
    ghostNode.style.width = targetElement.offsetWidth + 'px';
    ghostNode.style.opacity = '0.8';
    ghostNode.style.pointerEvents = 'none';

    ghostNode.id = ghostName;

    document.body.prepend(ghostNode);

    itemRef.current.classList.add('dragstart');
    ghostRef.current = ghostNode;

    setDragging(true);

    if (onDragStart) {
      onDragStart(index);
    }
  }

  const onDrag = useCallback((e: React.DragEvent<HTMLLIElement>) => {
    if (!dragging) return;

    const targetElement = e.target as HTMLLIElement;

    ghostRef.current.style.top = (e.pageY - targetElement.offsetHeight / 2) + 'px';
    ghostRef.current.style.left = (e.pageX - targetElement.offsetWidth / 2) + 'px';
  }, [dragging])

  const onDragEnd = () => {
    ghostRef.current.remove();
    ghostRef.current = null;

    itemRef.current.classList.remove('dragstart');

    setDragging(false);
  }

  const onDragEnter = () => {
    itemRef.current.classList.add('dragover');
  }

  const onDragLeave = () => {
    itemRef.current.classList.remove('dragover');
  }

  const onDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  }

  const handleDrop = () => {
    itemRef.current.classList.remove('dragover');
    onDrop(index);
  }

  return (
    <li
      ref={itemRef}
      className={classNames('li-item', {}, [className])}
      draggable={draggable}
      onDragStart={handleDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={handleDrop}
    >
      <div
        className='li-item__content'
      >
        {children}
      </div>

      {onDelete &&
        <button
          type='button'
          className='li-item__delete'
          onClick={() => onDelete(index)}
        >
          X
        </button>
      }
    </li>
  );
};
