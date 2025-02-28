import { useContext } from 'react';
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';

const App = () => {
  const {aToken} = useContext(AdminContext)
  return aToken 
  ? (
    <>
      <ToastContainer />
    </>
  )
  : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}
export default App