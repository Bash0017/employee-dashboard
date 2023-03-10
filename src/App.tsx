import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import EmployeeList from "./pages/EmployeeList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <EmployeeList />,
  },
  {
    path: "/add",
    element: <AddEmployee />,
  },
  {
    path: "/:employeeId",
    element: <EditEmployee />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
