import {BrowserRouter} from "react-router-dom";
import {Routes , Route} from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import CreateUser from "./Pages/CreateUser";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
            <Route path="/create" element={<CreateUser />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
