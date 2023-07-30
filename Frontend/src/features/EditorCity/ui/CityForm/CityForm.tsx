import React, {memo, useCallback, useEffect, useState} from 'react';
import {Button, ButtonTheme, Input, Loader, Text, TextTheme} from 'shared/ui';
import {useDispatch, useSelector} from 'react-redux';
import {classNames} from "shared/lib/classNames/classNames";
import './CityForm.scss';
import {cityFormActions, createCity, getCityFormState, updateCity} from "features/EditorCity";
import {getCities} from "entities/City";

const maxLengthName: number = 10;
const maxLengthData: number = 10;

interface LoginFormProps {
  className?: string;
}

export const CityForm = memo(({ className }: LoginFormProps) => {
  const dispatch = useDispatch();

  const cities = useSelector(getCities);
  const { city, isLoading, error } = useSelector(getCityFormState);
  const [ isDisabledUpdate, setIsDisabledUpdate ] = useState<boolean>(false);

  useEffect(() => {
    if (city._id) {
      const { name } = cities.find(c => c._id === city._id);
      setIsDisabledUpdate(name !== city.name);
    } else {
      setIsDisabledUpdate(true);
    }
  }, [cities, city.name])

  const onChangeName = useCallback((value: string) => {
    if (value.length <= maxLengthName) {
      dispatch(cityFormActions.setName(value));
    }
  }, [ dispatch ]);

  const onChangeData = useCallback((value: string) => {
    if (value.length <= maxLengthData) {
      dispatch(cityFormActions.setData(value));
    }
  }, [ dispatch ]);

  const onUpdateCity = useCallback(() => {
    dispatch(updateCity(city));
  }, [dispatch, city]);

  const onCreateCity = useCallback(() => {
    dispatch(createCity(city));
  }, [dispatch, city]);


  return (
    <div
      className={classNames('city-form', {}, [ className ])}
    >
      <Text
        className={'city-form__title'}
        title='Форма города'
      />

      <Input
        type="text"
        className='city-form__name'
        placeholder='Название'
        onChange={onChangeName}
        value={city.name}
      />

      <Input
        type="text"
        className='city-form__data'
        placeholder='Население'
        onChange={onChangeData}
        value={city.data}
      />

      {isLoading
        ?
          <div className={'city-form__loader'}>
            <Loader />
          </div>
        :
          <div className={'city-form__wrapper-btn'}>
            <Button
              theme={ButtonTheme.OUTLINE}
              onClick={onCreateCity}
              disabled={isLoading}
              className={'wrapper-btn__btn'}
            >
              Создать
            </Button>

            <Button
              theme={ButtonTheme.OUTLINE}
              onClick={onUpdateCity}
              disabled={isDisabledUpdate}
              className={'wrapper-btn__btn'}
            >
              Обновить
            </Button>
          </div>
      }

      {error &&
        <Text
          text={`ERROR: ${error}`}
          theme={TextTheme.ERROR}
          className={'city-form__error'}
        />
      }
    </div>
  );
});
