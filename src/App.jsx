import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Layout, SecureRoutes, OpenRoutes } from "./utils";
import { Home, Tweet, Profile, Auth, SignIn, SignUp } from "./pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<SecureRoutes />}>
            <Route element={<Layout />}>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/tweet/:id" element={<Tweet />}></Route>
              <Route path="/user/:id" element={<Profile />}></Route>
            </Route>
          </Route>
          <Route element={<OpenRoutes />}>
            <Route path="/" element={<Auth />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
          </Route>
          <Route path="*" element={<Navigate to={"/"} />}></Route>
        </Routes>
      </BrowserRouter>
      {/* Toaster */}
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "9999px",
            background: "var(--accentColor)",
            color: "var(--primaryTxt)",
          },
        }}
      />
    </>
  );
}

export default App;
