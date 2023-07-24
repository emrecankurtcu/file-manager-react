import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div >
                <Login></Login>
              </div>
            }
          />
          <Route
            path="/home"
            element={
              <div >
                <Home></Home>
              </div>
            }
          />
          <Route
            path="/login"
            element={
              <div >
                <Login></Login>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
