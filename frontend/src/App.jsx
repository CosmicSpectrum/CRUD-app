import {Routes, Route,Navigate} from "react-router-dom";
import Login from "./pages/login/Login";
import CrudGrid from "./pages/crud/Crud";
import {useEffect} from 'react';
import { useMainContext } from "./context/context";
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';
import RequestsGate from "./network/requests.network";

function App() {
  const {userInfo,setUserInfo} = useMainContext();
  const Navigate = useNavigate();

  useEffect(()=>{
    if(Cookies.get('user-token') && !userInfo){
      RequestsGate.me().then(me=>{
        setUserInfo(me)
      })
    }else{
      Navigate('/login')
    } 
  },[])

  return (
    <Routes>
      <Route path='/' element={Cookies.get('user-token') ? <Navigate pathname="/crud" /> : <Navigate pathname="/login" />} />
      <Route path='/login' element={<Login />} />
      <Route path='/crud' element={<CrudGrid />} />
    </Routes>
  )
}

export default App
