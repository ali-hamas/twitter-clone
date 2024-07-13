import { Toaster } from "react-hot-toast";
import { Auth, SignUp, SignIn } from "@/pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Feed, Bookmarks, Users, Profile, Tweet } from "@/pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Feed />}></Route>
          <Route path="/bookmarks" element={<Bookmarks />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/users/:username" element={<Profile />}></Route>
          <Route path="/tweets" element={<Feed />}></Route>
          <Route path="/tweets/:tweetId" element={<Tweet />}></Route>
          <Route path="/" element={<Auth />}>
            <Route path="signup" element={<SignUp />}></Route>
            <Route path="signin" element={<SignIn />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 3000,
          className: "font-medium font-chirp",
          style: {
            background: "rgb(var(--accentColor))",
            color: "#fff",
          },
        }}
      />
    </>
  );
}

export default App;
