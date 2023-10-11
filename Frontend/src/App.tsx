import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './component/login/loginPage';
import { InfoPage } from './component/info/infoPage';
import { HandleLogin } from './hooks/useHandleLogin';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='*' element={<HandleLogin />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/info' index element={<InfoPage />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
