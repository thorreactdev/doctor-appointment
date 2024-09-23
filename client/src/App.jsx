import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./Layout/AppLayout";
import Registration from "./Pages/Registration";
import Home from "./Pages/Home";
import SingleDoctorPage from "./Pages/SingleDoctorPage";
import AllDoctorList from "./Pages/AllDoctorList";
import About from "./Pages/About";
import LoginPage from "./Pages/LoginPage";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/doctor/:id",
        element: <SingleDoctorPage />,
      },
      {
        path : "/alldoctor",
        element : <AllDoctorList/>
      },
      {
        path : "/about",
        element : <About/>
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} fallbackElement={"Loding..."} />;
}

export default App;
