import { createBrowserRouter } from 'react-router-dom';
import Layout from '../src/components/Layout'
import ErrorBoundary from '../src/pages/ErrorBoundary';
import Weather from '../src/pages/Weather';
import WeatherForcast from '../src/pages/WeatherForcast';

const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout />,
    errorElement: <ErrorBoundary />,
    children:[
      {
        index: true,
        element: <Weather />,
      },
      {
        path: '/forecast',
        element: <WeatherForcast />,
      },
    ]
  }
]);

export default router;

