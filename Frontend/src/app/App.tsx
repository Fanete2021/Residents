import React from 'react';
import './styles/index.scss';
import {AppRouter} from "app/providers/router";
import { Navbar } from 'widgets/Navbar';

const App = () => {
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