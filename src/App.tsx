// src/App.tsx
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import AppRoutes from "./routes";
import { AuthInitializer } from "./features/auth";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AuthInitializer>
          <AppRoutes />
        </AuthInitializer>
      </Router>
    </Provider>
  );
}

export default App;
