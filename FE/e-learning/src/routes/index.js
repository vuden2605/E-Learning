import LayoutDefault from '../LayoutDefault';
import Blog from '../pages/Blog';
import Home from '../pages/Home';
import About from '../pages/About';
import Courses from '../pages/Courses';
import Careers from '../pages/Careers';
import Login from '../pages/Login';
import Register from '../pages/Register'
import CourseDetail from '../pages/CourseDetail'
import Checkout from '../pages/Checkout';
export const routes =[
    {
        path: '/',
        element: <LayoutDefault />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/courses',
                element: <Courses/>
            },
            {
                path: '/careers',
                element: <Careers />
            },
            {
                path: '/blog',
                element: <Blog/>
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/coursedetail',
                element: <CourseDetail />
            },
            {
                path:'/checkout',
                element:<Checkout/>
            }
        ]
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/register',
        element:<Register/>
    }
]
