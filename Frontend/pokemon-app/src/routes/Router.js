import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Training = lazy(() => import("../views/ui/Training"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Pokemon = lazy(() => import("../views/ui/Pokemon"));
const Pokedex = lazy(() => import("../views/ui/Pokedex"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const SpecialTraining = lazy(() => import("../views/ui/SpecialTraining"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/home" /> },
      { path: "/home", exact: true, element: <Starter /> },//home
      { path: "/about", exact: true, element: <About /> },//about us
      { path: "/allenamento", exact: true, element: <Training/> },//allenamentoBase
      { path: "/pokemon", exact: true, element: <Pokemon /> },//pokemon
      { path: "/pokedex", exact: true, element: <Pokedex /> },//pokedex
      { path: "/allenamentoSpeciale", exact: true, element: <SpecialTraining/> },//allenamento speciale
    ],
  },
];

export default ThemeRoutes;
