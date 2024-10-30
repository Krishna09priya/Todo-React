import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./Components/loginPage";
import SignupPage from "./Components/SignupPage";
import HomePage from "./Components/HomePage";
import ProjectPage from "./Components/ProjectPage";



const router = createBrowserRouter([
    {path: '/signup', element:<SignupPage/>},
    { path: '/', element: <LoginPage/> },
    {path:'/home',element:<HomePage/>},
    {path:'/projects/:projectId',element:<ProjectPage/>}

]);

export default router;