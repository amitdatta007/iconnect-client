import router from "./Routes/Router/Router";
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="w-[98%] max-w-[1280px] mx-auto">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
