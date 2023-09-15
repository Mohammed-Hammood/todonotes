import HomePage from "./home";
import { Route, Routes } from 'react-router-dom';
import NotFound from "./not-found";

export default function Pages() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="*" element={<NotFound />}/>
        </Routes>
    )
}