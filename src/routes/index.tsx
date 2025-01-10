import {RouterProvider, createBrowserRouter, RouteObject, Outlet} from "react-router-dom";
import SearchPage from "../pages/SearchPage";

const Routes: React.FC = () => {

  const publicRoutes: RouteObject[] = [
    {
      path: "/",
      element: <SearchPage/>,
    },
    {
      path:'/search',
      element: <SearchPage/>
    }
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...publicRoutes,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
