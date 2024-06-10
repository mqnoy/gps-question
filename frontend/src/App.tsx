import { RouterProvider } from "react-router-dom";
import router from "./router";
import "bulma/css/bulma.css";
import { Provider } from "react-redux";
import { store } from "./redux";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
