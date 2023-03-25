import { Navigate, Outlet } from "react-router-dom";
import { useSelector} from 'react-redux';
const ProtectedRoutes = () => {
  console.log("protected routes")
  const token = useSelector((state) => state.auth.token);
    return (token ? <Outlet /> : <Navigate to="/"/>)
}
export default ProtectedRoutes;