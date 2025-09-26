import LayoutDefault from "../LayoutDefault";
import Blog from "../pages/Blog";
import Home from "../pages/Home";
import About from "../pages/About";
import AllCourses from "../pages/Course/AllCourses";
import Courses from "../pages/Course";
import Careers from "../pages/Careers";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CourseDetail from "../pages/Course/CourseDetail";
import BlogDetail from "../pages/BlogDetail";
import Checkout from "../pages/Checkout";
import UserInfo from "../pages/UserInfo";
import CartDetail from "../pages/CartDetail";
import PrivateRoute from "../components/PrivateRoute";
import Mycourses from "../pages/MyCourse";
import MyCourseDetail from "../pages/MyCourseDetail";
export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/course",
        element: <Courses />,
        children: [
          { element: <AllCourses />, index: true },
          {
            path: "detail/:id",
            element: <CourseDetail />,
          },
        ],
      },
      {
        path: "/careers",
        element: <Careers />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog/:id",
        element: <BlogDetail />,
      },
      {
        path: "/about",
        element: <About />,
      },

      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/userinfo",
        element: (
          <PrivateRoute>
            <UserInfo />
          </PrivateRoute>
        ),
      },
      {
        path: "/mycourses",
        element: (
          <PrivateRoute>
            <Mycourses />
          </PrivateRoute>
        ),
      },

      {
        path: "/cartdetail",
        element: <CartDetail />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/mycourses/:id",

    element: (
      <PrivateRoute>
        <MyCourseDetail />
      </PrivateRoute>
    ),
  },
];
