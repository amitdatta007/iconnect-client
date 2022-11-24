import router from "./Routes/Router/Router";
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <div className="w-[98%] max-w-[1280px] mx-auto">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
