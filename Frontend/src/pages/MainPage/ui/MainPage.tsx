import React from 'react';
import './MainPage.scss';
import {City, getCities} from "entities/City";
import {useSelector} from 'react-redux';
import {getResidents} from "entities/Resident";
import {ItemData, List} from 'widgets/List';

const MainPage = () => {
  const cities = useSelector(getCities);
  const residents = useSelector(getResidents);

  const items: ItemData[] = [];

  for (const resident of residents) {
    const { groups } = resident;

    let currentItem: ItemData = {};
    let foundIndex = items.findIndex(item => item.title === groups[0].name);

    if (foundIndex === -1) {
      currentItem = { title: groups[0].name, items: []};
      items.push(currentItem);
    } else {
      currentItem = items[foundIndex];
    }

    for (let i = 0; i < groups.length - 1; ++i) {
      foundIndex = foundIndex !== -1
        ? currentItem.items.findIndex(item => item.title === groups[i + 1].name)
        : -1;

      if (foundIndex === -1) {
        const newItem: ItemData = {
          title: groups[i + 1].name,
          items: []
        };
        currentItem.items.push(newItem);

        currentItem = currentItem.items[currentItem.items.length - 1];
      } else {
        currentItem = currentItem.items[foundIndex];
      }
    };

    const cityResident: City = cities.find(city => city.id === resident.city_id);

    const residentItem = {
      title: resident.name,
      tooltip: `${cityResident.name}, ${cityResident.data} жителей`
    };

    currentItem.items.push(residentItem);
  };

  return (
    <div className={'main-page'}>
      <h1 className={'main-page__title'}>Население</h1>

      <List
        items={items}
      />
    </div>
  );
};

export default MainPage;