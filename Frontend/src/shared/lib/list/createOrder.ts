import { City } from "entities/City";
import {ItemData} from "widgets/List";
import {Resident} from "entities/Resident";

interface CreateOrderProps {
  cities: City[],
  residents: Resident[],
  selectCity: (name: string) => (() => void),
  selectResident: (name: string) => (() => void),
}

export const createOrder = (props: CreateOrderProps): ItemData[] => {
  const {
    cities,
    residents,
    selectCity,
    selectResident
  } = props;

  const items: ItemData[] = [];

  for (const resident of residents) {
    const { groups } = resident;

    let currentItem: ItemData = null;
    let foundIndex = items.findIndex(item => item.title === groups[0].name);

    if (foundIndex === -1) {
      currentItem = {
        id: groups[0]._id,
        title: groups[0].name,
        items: []
      };

      if (groups[0].type === 'city') {
        currentItem.onClick = selectCity(groups[0].name);
      }

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
          id: groups[i + 1]._id,
          title: groups[i + 1].name,
          items: []
        };

        if (groups[i + 1].type === 'city') {
          newItem.onClick = selectCity(groups[i + 1].name);
        }

        currentItem.items.push(newItem);

        currentItem = currentItem.items[currentItem.items.length - 1];
      } else {
        currentItem = currentItem.items[foundIndex];
      }
    };

    const city = cities.find(city =>
      resident.city.name.toLowerCase().startsWith(city.name.toLowerCase())
    );

    const residentItem = {
      id: resident._id,
      title: resident.name,
      tooltip: `${city.name}, ${city.data} жителей`,
      onClick: selectResident(resident._id)
    };

    currentItem.items.push(residentItem);
  };

  return items;
}