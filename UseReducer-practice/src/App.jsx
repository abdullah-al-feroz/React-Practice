
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import UserInfo from "./components/userInfo";
import ViewUserInfo from "./components/ViewUserInfo";

function App() {

  return (
    <div class="container">
      <Header/>
        <Routes>
          <Route path='/' element={<UserInfo/>}/>
          <Route path='/ViewUserInfo' element={<ViewUserInfo/>}/>
        </Routes>
    </div>
  )
}

export default App
