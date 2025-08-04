import LayoutDefault from '../LayoutDefault';
import Home from '../pages/Home';
import LearningPath from '../pages/LearningPath';
import Posts from '../pages/Post';
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
                path: '/learning-paths',
                element: <LearningPath />
            },
            {
                path: '/posts',
                element: <Posts />
            }
        ]
    }
]
