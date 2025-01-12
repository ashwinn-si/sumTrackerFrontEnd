import {BrowserRouter} from "react-router-dom";
import {Routes , Route} from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import CreateUser from "./Pages/CreateUser";
import FolderDashBoard from "./Pages/FolderDashBoard";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
            <Route path="/create" element={<CreateUser />} />
            <Route path="/:email/folderdashboard" element={<FolderDashBoard />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
