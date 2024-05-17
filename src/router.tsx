import { createBrowserRouter, Route } from "react-router-dom";
import { Chat } from "./pages/Chat";
import { Auth } from "./pages/Auth";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Chat />,
    },
    {
        path: "/auth",
        element: <Auth/>,
    }
])