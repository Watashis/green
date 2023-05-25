import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/main";
import LoginPage from "../pages/login";


const router = createBrowserRouter([
    {
        path:"/",
        element:<MainPage></MainPage>
    },
    {
        path:"/login",
        element:<LoginPage/>
    }
]);

export default function AppRouters(){
    return <RouterProvider router={router}/>
}