// Pages
import { useLocation } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

const publicRoutes = [
  {
    path: "/",
    component: Fragment,
    layout: "default",
  },
];

// Login as admin to access
const privateRoutes: any[] = [];

export { privateRoutes, publicRoutes };
