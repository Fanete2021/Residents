import React, {useEffect} from 'react';
import './styles/index.scss';
import {AppRouter} from "app/providers/router";
import { Navbar } from 'widgets/Navbar';
import {useDispatch} from "react-redux";
import {loadCities} from "entities/City";
import {loadResidents} from "entities/Resident";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCities());
    dispatch(loadResidents());
  }, [ dispatch ]);

  return (
    <div className={'app'}>
      <Navbar />

      <div className={'app__content'} >
        <AppRouter />
      </div>
    </div>
  );
};

export default App;