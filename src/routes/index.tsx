import Home from "../pages/home/Home";
import AddRoom from "../pages/room/AddRoom";
import EditRoom from "../pages/room/EditRoom";
import ExistingRooms from "../pages/room/ExistingRooms";

const publicRoutes: any[] = [
  {
    path: "/",
    component: Home,
    layout: "default",
  },
  {
    path: "/rooms/existing",
    component: ExistingRooms,
    layout: "default",
  },
  {
    path: "/rooms/add",
    component: AddRoom,
    layout: "default",
  },
  {
    path: "/rooms/edit/:roomId",
    component: EditRoom,
    layout: "default",
  },
];

// Login as admin to access
const privateRoutes: any[] = [];

export { privateRoutes, publicRoutes };
