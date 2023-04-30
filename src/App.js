import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import MainPage from './page/index';
import { useTranslation } from "react-i18next";
function App() {
  const { t, i18n } = useTranslation();
  return (
   <>
   
   <MainPage/>
   </>
  );
}

export default App;
