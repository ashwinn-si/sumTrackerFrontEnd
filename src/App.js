import {BrowserRouter} from "react-router-dom";
import {Routes , Route} from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import CreateUser from "./Pages/CreateUser";
import FolderDashBoard from "./Pages/FolderDashBoard";
import FolderPage from "./Pages/FolderPage";
import {useEffect, useState} from "react";
import MobileUsersPage from "./Pages/MobileUsersPage";

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
      windowWidth < 768
          ? <MobileUsersPage />
          : (
              <div>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/create" element={<CreateUser />} />
                    <Route path="/:email/folderdashboard" element={<FolderDashBoard />} />
                    <Route path="/:email/:folderName" element={<FolderPage />} />
                  </Routes>
                </BrowserRouter>
              </div>
          )
  );
}

export default App;
