import React, {useCallback, useEffect, useState} from 'react';
import './MainPage.scss';
import {getCities} from "entities/City";
import {useDispatch, useSelector} from 'react-redux';
import {getResidents} from "entities/Resident";
import {ItemData, List} from 'widgets/List';
import {Editor} from "widgets/Editor";
import {residentFormActions} from "features/EditorResident";
import {cityFormActions} from "features/EditorCity";
import {createOrder} from "shared/lib/list/createOrder";

const MainPage = () => {
  const cities = useSelector(getCities);
  const residents = useSelector(getResidents);
  const dispatch = useDispatch();
  const [items, setItems] = useState<ItemData[]>([]);

  const selectResident = useCallback((id: string) => {
    const resident = residents.find((res) => res._id === id);

    return () => {
      dispatch(residentFormActions.setResident(resident));
    };
  }, [residents, dispatch]);

  const selectCity = useCallback((name: string) => {
    const city = cities.find((city) => name.toLowerCase().startsWith(city.name.toLowerCase()));

    return () => {
      dispatch(cityFormActions.setCity(city));
    };
  }, [cities, dispatch]);

  useEffect(() => {
    const newItems = createOrder({cities, residents, selectCity, selectResident});

    setItems(newItems);
  }, [cities, residents]);

  return (
    <div className={'main-page'}>
      <h1 className={'main-page__title'}>Население</h1>

      <div className={'main-page__content'}>
        <List
          className={'content__list'}
          items={items}
        />

        <Editor
          className={'content__editor'}
        />
      </div>
    </div>
  );
};

export default MainPage;