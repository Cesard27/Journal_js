import { Navigate, Route, Routes } from "react-router-dom"
import { JournalHomeScreen } from "../screens/JournalHomeScreen"

export const JournalRoutes = () => {
   return (
      <Routes>
         <Route path="/" element={<JournalHomeScreen/>}/>

         <Route path="/*" element={<Navigate to="/"/>}/>
      </Routes>
   )
}
