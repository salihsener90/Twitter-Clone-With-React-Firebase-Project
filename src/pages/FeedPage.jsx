import Aside from "../components/Aside";
import Main from "../components/Main";
import Nav from "../components/Nav";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/config";

const FeedPage = () => {
  const [user , setUser] = useState();

  useEffect(()=> {
    //oturumu acık olan kullanıcının 
    //hesap bilg,lerine erişme
    onAuthStateChanged(auth, (res) => {
      setUser(res)
    });
  }, [])

  return (
  <div className="feed h-screen bg-black overflow-hidden" >
    <Nav user={user}/>
    <Main user={user} />
    <Aside />    
    </div>
    );
};

export default FeedPage;
