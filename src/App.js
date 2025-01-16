import {BrowserRouter} from "react-router-dom";
import {Routes , Route} from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import CreateUser from "./Pages/CreateUser";
import FolderDashBoard from "./Pages/FolderDashBoard";
import FolderPage from "./Pages/FolderPage";
import {useEffect, useState} from "react";
import MobileUsersPage from "./Pages/MobileUsersPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import CustomCursor from "./Components/CustomCursor";
import ImageDisplayPage from "./Pages/ImageDisplayPage";

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
                <CustomCursor />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/create" element={<CreateUser />} />
                    <Route path="/:email/folderdashboard" element={<FolderDashBoard />} />
                    <Route path="/:email/:folderName" element={<FolderPage />} />
                    <Route path="/forgot-password" element ={<ForgotPasswordPage />} />
                      <Route path="/:email/:folderName/image-display" element={<ImageDisplayPage />} />
                  </Routes>
                </BrowserRouter>
              </div>
          )
  );
}

export default App;
