import React, {memo, useCallback, useEffect, useState} from 'react';
import {Button, ButtonTheme, Input, Select, Text, TextTheme} from 'shared/ui';
import {useDispatch, useSelector} from 'react-redux';
import {
  createResident,
  deleteResident,
  getResidentFormState,
  residentFormActions,
  updateResident
} from "features/EditorResident";
import {classNames} from "shared/lib/classNames/classNames";
import './ResidentForm.scss';
import {getCities} from "entities/City";
import {DraggableList} from 'widgets/DraggableList';

const maxLengthName: number = 10;

interface LoginFormProps {
  className?: string;
}

export const ResidentForm = memo(({ className }: LoginFormProps) => {
  const dispatch = useDispatch();

  const cities = useSelector(getCities);
  const nameCities = cities.map(city => city.name);

  const { resident, isLoading, error } = useSelector(getResidentFormState);

  const [nameGroups, setNameGroups] = useState<string[]>([]);
  const [nameGroup, setNameGroup] = useState<string>('');
  const [typeGroup, setTypeGroup] = useState<string>('');

  useEffect(() => {
    setNameGroups(resident.groups.map(group => `${group.name} (${group.type})`));
  }, [resident]);

  const onChangeName = useCallback((value: string) => {
    if (value.length <= maxLengthName) {
      dispatch(residentFormActions.setName(value));
    }
  }, [ dispatch ]);

  const onChangeCity = useCallback((index: number) => {
    dispatch(residentFormActions.setCity(cities[index]));
  }, [ dispatch, cities ]);

  const onChangeOrderGroups = useCallback((index: number, swapIndex: number) => {
    const groups = [...resident.groups];
    [groups[index], groups[swapIndex]] = [groups[swapIndex], groups[index]];

    dispatch(residentFormActions.setGroups(groups));
  }, [dispatch, resident]);

  const onChangeNameGroup = (value: string) => {
    setNameGroup(value);
  }

  const onChangeTypeGroup = (value: string) => {
    setTypeGroup(value);
  }

  const createGroup = useCallback(() => {
    const groups = [...resident.groups, { name: nameGroup, type: typeGroup }];

    setNameGroups([...nameGroups, nameGroup]);
    setNameGroup('');
    setTypeGroup('');

    dispatch(residentFormActions.setGroups(groups));
  }, [dispatch, resident, nameGroup, typeGroup]);

  const deleteGroup = useCallback((index) => {
    const groups = [
      ...resident.groups.slice(0, index),
      ...resident.groups.slice(index + 1)
    ];

    setNameGroups(nameGroups.slice(index, 1));

    dispatch(residentFormActions.setGroups(groups));
  }, [dispatch, resident]);

  const onUpdateResident = useCallback(() => {
    dispatch(updateResident(resident));
  }, [dispatch, resident]);

  const onCreateResident = useCallback(() => {
    dispatch(createResident(resident));
  }, [dispatch, resident]);

  const onDeleteResident = useCallback(() => {
    dispatch(deleteResident(resident._id));
  }, [dispatch, resident]);

  return (
    <div
      className={classNames('resident-form', {}, [ className ])}
    >
      <Text
        className={'resident-form__title'}
        title='Форма жителя'
      />

      <Input
        type="text"
        className='resident-form__name'
        placeholder='Имя'
        onChange={onChangeName}
        value={resident.name}
      />

      <div className="resident-form__city">
        <Text
          text='Выберите город'
        />

        <Select
          options={nameCities}
          onChange={onChangeCity}
          initialSelect={resident.city?.name || cities[0]?.name || ''}
        />
      </div>

      <div className="resident-form__groups">
        <div className="groups__inputs">
          <Text
            text='Добавьте группу'
          />

          <Input
            type="text"
            className='inputs__title'
            placeholder='Название'
            onChange={onChangeNameGroup}
            value={nameGroup}
          />

          <Input
            type="text"
            className='inputs__type'
            placeholder='Тип'
            onChange={onChangeTypeGroup}
            value={typeGroup}
          />

          <Button
            theme={ButtonTheme.OUTLINE}
            onClick={createGroup}
            disabled={isLoading}
            className='inputs__create'
          >
            Добавить
          </Button>
        </div>

        {resident.groups.length > 0 &&
          <div className="groups__list">
            <Text
              text='Задайте порядок групп или удалите их'
            />

            <DraggableList
              onChange={onChangeOrderGroups}
              items={nameGroups}
              onDelete={deleteGroup}
            />
          </div>
        }
      </div>

      <div className={'resident-form__wrapper-btn'}>
        <Button
          theme={ButtonTheme.OUTLINE}
          onClick={onCreateResident}
          disabled={isLoading}
          className={'wrapper-btn__btn'}
        >
          Создать
        </Button>

        <Button
          theme={ButtonTheme.OUTLINE}
          onClick={onUpdateResident}
          disabled={isLoading || !Boolean(resident._id)}
          className={'wrapper-btn__btn'}
        >
          Обновить
        </Button>

        <Button
          theme={ButtonTheme.OUTLINE}
          onClick={onDeleteResident}
          disabled={isLoading || !Boolean(resident._id)}
          className={'wrapper-btn__btn'}
        >
          Удалить
        </Button>
      </div>

      {error &&
        <Text
         text={`ERROR: ${error}`}
         theme={TextTheme.ERROR}
         className={'resident-form__error'}
        />
      }
    </div>
  );
});
