import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { setupStore } from "./store/index";
import App from "./components/App/App";

const store = setupStore();

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store} >
            <App />
        </Provider >
    </BrowserRouter>,
    document.getElementById('root')
);