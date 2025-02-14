
import './App.css';


import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Companies from "./Components/pages/Company/Companies";
import Error404 from "Components/pages/Errors/Error404";



function App() {



  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={<Companies />}/>
                <Route index path="/companies" element={<Companies />}/>
                <Route path="/error-404" element={<Error404 />}/>
                <Route path="*" element={<Navigate to={"/error-404"}/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
