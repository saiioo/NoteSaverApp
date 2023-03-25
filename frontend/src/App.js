import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import Login from './components/login/Login';
import store from './components/store/store';
import Signup from './components/signup/Signup';
import Home from './components/home/Home';
import AddNotes from './components/addnotes/AddNotes';
import GetNotes from './components/noteslist/GetNotes';
import EditNote from './components/editnotes/EditNote';
import ProtectedRoutes from './components/ProtectedRoutes.js/ProtectedRoutes';
// import ProtectedRoutes from './components/ProtectedRoutes.js/ProtectedRoutes';

function App() {
  return (
    <>
      <div>
        {/* <Toaster
          position="top-right"
          toastOptions={{
            success: {
              theme: {
                primary: '#4aed88',
              },
            },
          }}
        ></Toaster> */}
                <Toaster
          position="top-center"
          toastOptions={{
            success: {
              theme: {
                primary: '#4aed88',
              },
              style: {
                  width:'200px',
                  height:"25px",
                  fontSize:"14px",
                  padding:"5px 10px"
              }
            },
          }}
        ></Toaster>
      </div>
      <div className="App">
        <Provider store={store}>
          <BrowserRouter >
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/signin' element={<Signup />} />
              <Route element={<ProtectedRoutes/>} />
              <Route path='/home' element={<Home />} />
              <Route path='/addnotes' element={<AddNotes />} />
              <Route path='/getnotes/:id' element={<GetNotes />} />
              <Route path='/editnotes/:id' element={<EditNote />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      </div>
    </>
  );
}

export default App;
