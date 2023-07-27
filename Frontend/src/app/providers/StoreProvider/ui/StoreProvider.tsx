import { FC } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from '../config/store';
import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from '../config/StateSchema';

interface StoreProviderProps {
  initialState?: DeepPartial<StateSchema>
}

export const StoreProvider: FC<StoreProviderProps> = (props) => {
  const {
    initialState,
    children
  } = props;

  const store = createReduxStore(initialState as StateSchema);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};