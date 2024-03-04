import { createBrowserRouter } from "react-router-dom";
import KursTable from "./Sites/kurs/Table";
import KursAddForm from "./Sites/kurs/edit-add";
import LernendeTable from "./Sites/lernender/table";
import LernendeAddForm from "./Sites/lernender/edit-add";
import Lerndern_Kurs_Table from "./Sites/kurse_lernende/Table";
import Kurs_lernendeAddForm from "./Sites/kurse_lernende/edit-add";
import DozentTable from "./Sites/dozenten/Table";
import DozentAddForm from "./Sites/dozenten/edit-add";
import LehrbetriebTable from "./Sites/lehrbetriebe/Table";
import LehrbetriebeAddForm from "./Sites/lehrbetriebe/edit-add";
import LänderTable from "./Sites/länder/Table";
import LänderAddForm from "./Sites/länder/edit-add";
import Lerndern_lehrbetrieb_Table from "./Sites/lehrbetriebe_lernende/Table";
import Lerndern_lehrbetrieb_AddForm from "./Sites/lehrbetriebe_lernende/edit-add";

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
    element: <KursTable />,
  },
  {
    path: "/Kurse/Edit/:id",
    element: <KursAddForm />,
  },
  {
    path: "/Kurse/Add",
    element: <KursAddForm />,
  },
  {
    path: "/lernende",
    element: <LernendeTable />,
  },
  {
    path: "/lernende/Edit/:id",
    element: <LernendeAddForm />,
  },
  {
    path: "/lernende/Add",
    element: <LernendeAddForm />,
  },
  {
    path: "/lehrbetrieb",
    element: <LehrbetriebTable />,
  },
  {
    path: "/lehrbetrieb/Edit/:id",
    element: <LehrbetriebeAddForm />,
  },
  {
    path: "/lehrbetrieb/Add",
    element: <LehrbetriebeAddForm />,
  },
  {
    path: "/länder",
    element: <LänderTable />,
  },
  {
    path: "/länder/Add",
    element: <LänderAddForm />,
  },
  {
    path: "/dozenten",
    element: <DozentTable />,
  },
  {
    path: "/dozenten/Edit/:id",
    element: <DozentAddForm />,
  },
  {
    path: "/dozenten/Add",
    element: <DozentAddForm />,
  },
  {
    path: "/Lerndern_Kurs_Table",
    element: <Lerndern_Kurs_Table />,
  },
  {
    path: "/lernende_kurs_add/:id",
    element: <Kurs_lernendeAddForm/>
  },
  {
    path: "/lernende_lehrbetrieb_Table",
    element: <Lerndern_lehrbetrieb_Table/>
  },
  {
     path: "/lernende_lehrbetrieb_add/:id",
     element: <Lerndern_lehrbetrieb_AddForm/>
   }
]);