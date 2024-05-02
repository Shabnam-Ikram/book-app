import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Book from "./components/Books";
import SingleBook from "./components/SingleBook";
import EditBook from "./components/EditBook";
import Login from "./components/Login";
import NotFound from "./ErrorMsg";
import { Provider } from "react-redux";
import store from "./redux/store";
import NavBar from "./components/Navbar";
import AddBook from "./components/AddBoth";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "./components/ProtechtedRoutes";

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { 
        path: "books/:id", 
        element: <ProtectedRoute><SingleBook /></ProtectedRoute> 
      },
      { path: "/", element: <Book /> },
      { 
        path: "/addbook", 
        element: <ProtectedRoute><AddBook /></ProtectedRoute> 
      },
      { 
        path: "/books/:id/edit", 
        element: <ProtectedRoute><EditBook /></ProtectedRoute> 
      },
      { path: "/login", element:<Login /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);