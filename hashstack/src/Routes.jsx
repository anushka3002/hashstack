import { Route, Routes } from "react-router"
import CurrencyConverter from "./Components/CurrencyConverter"

const Routers = () =>{
    return(
        <>
        <Routes>
        <Route path="/" element={<CurrencyConverter/>}/>
        </Routes>
        </>
    )
}

export default Routers