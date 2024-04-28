import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Home, Explore, Auth, SignIn, SignUp } from "./pages";
import { Layout, SecureRoutes, OpenRoutes } from "./utils";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route element={<SecureRoutes />}>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/explore" element={<Explore />}></Route>
            </Route>
          </Route>
          <Route element={<OpenRoutes />}>
            <Route path="/" element={<Auth />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      {/* Toaster */}
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "var(--accentColor)",
            color: "var(--primaryTxt)",
          },
        }}
      />
    </>
  );
}

export default App;
