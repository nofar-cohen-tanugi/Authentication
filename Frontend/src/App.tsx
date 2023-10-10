import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './component/login/loginPage';
import { InfoPage } from './component/info/infoPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/login' element={<InfoPage />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
