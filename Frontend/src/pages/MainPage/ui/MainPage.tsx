import React from 'react';
import './MainPage.scss';
import {getCities} from "entities/City";
import {useSelector} from 'react-redux';
import {getResidents} from "entities/Resident";
import {ItemData, List} from 'widgets/List';

const MainPage = () => {
  const cities = useSelector(getCities);
  const residents = useSelector(getResidents);

  const items: ItemData[] = [];

  for (const resident of residents) {
    const { groups } = resident;

    for (let i = 0; i < groups.length; ++i) {
      let index = items.findIndex(item => item.title === groups[0].name);
      let isHave = index !== -1;

      if (isHave) {

      } else {

      }
    }
  }

  return (
    <div className={'main-page'}>
      <h1 className={'main-page__title'}>Население</h1>

      <List
        items={residents}
      />
    </div>
  );
};

export default MainPage;