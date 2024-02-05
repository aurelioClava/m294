import { createBrowserRouter } from "react-router-dom";
import Table from "./Sites/kurs/Table";
import AddForm from "./Sites/kurs/edit-add";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <> <h2>Start</h2> </>,
  },
  {
    path: "",
    element: <> <h2>Start</h2> </>,
  },
  {
    path: "/Kurse",
    element: <Table />,
  },
  {
    path: "/Kurse/Edit",
    element: <AddForm />,
  },
]);