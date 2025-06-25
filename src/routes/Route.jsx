import { createBrowserRouter } from "react-router";
import Root from "../root/Root";
import Errorpage from "../errorpage/Errorpage";
import Home from "../pages/Home";
import Addservice from "../services/Addservice";
import Manageservice from "../services/Manageservice";
import Bookedservice from "../services/Bookedservice";
import Todoservice from "../services/Todoservice";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Privaterouter from "../privateroute/Privaterouter";
import ManageServices from "../privateroute/Manageservice";
import Allservice from "../dashboard/Allservice";
import Servicedetails from "../dashboard/Servicedetails";
import BookedServices from "../privateroute/Bookedservice";
import ServiceToDo from "../services/Todoservice";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <Errorpage></Errorpage>,
    children: [
      { index: true, Component: Home },
      {
        path: "/addservice",
        element: (
          <Privaterouter>
            <Addservice></Addservice>
          </Privaterouter>
        ),
      },
      {
        path: "/manageservice",
        element: (
          <Privaterouter>
            <ManageServices></ManageServices>
          </Privaterouter>
        ),
      },
      {
        path: "/servicedetail/:id",
        element: (
          <Privaterouter>
            <Servicedetails></Servicedetails>
          </Privaterouter>
        ),
      },
      {
        path: "/bookedservice",
        element: (
          <Privaterouter>
            <BookedServices></BookedServices>
          </Privaterouter>
        ),
      },
      {
        path: "/todoservice",
        element: (
          <Privaterouter>
            <ServiceToDo></ServiceToDo>
          </Privaterouter>
        ),
      },
      { path: "/allservice", Component: Allservice },
      { path: "/manageservice", Component: Manageservice },
      { path: "/bookedservice", Component: Bookedservice },

      { path: "/login", Component: Login },
      { path: "/signup", Component: Signup },
    ],
  },
]);
