import {RouterProvider, createBrowserRouter, RouteObject, Outlet} from "react-router-dom";
import SearchPage from "../pages/SearchPage";
import SeriesSearchPage from "../pages/SeriesSearchPage";
import DiagnosticPage from "../pages/DiagnosticPage";
import TestViewDicom from "../pages/TestViewDicom";


const Routes: React.FC = () => {

  const publicRoutes: RouteObject[] = [
    {
      path: "/",
      element: <SearchPage/>,
    },
    {
      path:'/study',
      element: <SearchPage/>
    },
    {
      path:'/series',
      element: <SeriesSearchPage/>
    },
    {
      path:'/diagnostic',
      element: <DiagnosticPage/>
    },
    {
      path:'/test',
      element: <TestViewDicom/>
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
