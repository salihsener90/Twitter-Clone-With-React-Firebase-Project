// Kullanıcınn yetkisii varsa alt route lara erşime izine ver
//yoksa login sayfasına yönlendir

import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState(null);
  useEffect(() => {
    //kullanıcı oturumu her değiştiğinde calısır
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, []);

  //kullanıcınuın yetkisi yoksa logıne yönlednir
  if (isAuth === false) {
    return <Navigate to={"/"} replace />;
  }
  //yetkisi varsa alt route u goster
  return <Outlet />;
};

export default ProtectedRoute;
