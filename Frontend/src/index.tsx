import {render} from "react-dom";
import App from "./app/App";
import {BrowserRouter} from "react-router-dom";
import { StoreProvider } from "app/providers/StoreProvider/ui/StoreProvider";

render(
  <StoreProvider>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </StoreProvider>,
  document.getElementById('app')
);