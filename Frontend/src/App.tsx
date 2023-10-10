import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './component/login/loginPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginPage />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
