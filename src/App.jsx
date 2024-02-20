import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthPage from "./pages/AuthPage"
import FeedPage from "./pages/FeedPage"
import ProtectedRoute from "./pages/ProtectedRoute"



function App() {
 

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<AuthPage/>} />
      {/* korumalı route */}
      <Route element = {<ProtectedRoute/>} >
      <Route path="/feed" element={<FeedPage />} />
      </Route >
    </Routes>

    </BrowserRouter> 
    </>
  )
}

export default App
