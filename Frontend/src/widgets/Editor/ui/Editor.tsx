import { ResidentForm } from 'features/EditorResident';
import { classNames } from 'shared/lib/classNames/classNames';
import "./Editor.scss";
import {Switcher} from "shared/ui";
import {useState} from "react";
import {CityForm} from "features/EditorCity";

interface EditorProps {
  className?: string;
}

const variants: string[] = ['житель', 'город'];

export const Editor = (props: EditorProps) => {
  const {
    className
  } = props;

  const [currentVariantIndex, setCurrentVariantIndex] = useState<number>(0);

  const onChangeVariant = (index: number) => {
    setCurrentVariantIndex(index);
  }

  return (
    <div className={classNames('editor', {}, [className])}>
      <Switcher
        variants={variants}
        className={'editor__switcher'}
        initialIndex={currentVariantIndex}
        onChange={onChangeVariant}
      />

      <div
        className={'editor__form'}
      >
        {currentVariantIndex === 0
          ? <ResidentForm />
          : <CityForm />
        }
      </div>
    </div>
  );
};
