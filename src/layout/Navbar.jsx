import { useAuth } from "@/contexts";
import { useLocation } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { SettingIcon, PostIcon } from "@/icons/NavbarIcons";
import { TwitterIcon, DotsIcon, VerifiedIcon } from "@/icons";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { HomeIcon, SearchIcon, NotificationIcon } from "@/icons/NavbarIcons";
import { MessageIcon, BookmarkIcon, ProfileIcon } from "@/icons/NavbarIcons";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const pathname = useLocation().pathname;

  const noRoute = (e) => {
    e.preventDefault();
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <nav className="sticky top-0 flex h-full flex-col items-center pb-4 pt-2 xl:items-start">
      <Link to="/" className="transition-200 hover:bg-hoverBg w-fit rounded-full p-3">
        <TwitterIcon className="size-[26px] xl:size-[30px]" />
      </Link>
      <NavLink to={"/home"} onClick={scrollToTop} className="group/navbar md:w-fit xl:w-full">
        <div className="navLink group-hover/navbar:bg-hoverBg relative">
          <HomeIcon solid={pathname === "/home"} />
          <span className="hidden px-4 text-xl xl:block">Home</span>
        </div>
      </NavLink>
      <NavLink to={"/explore"} className="group/navbar cursor-not-allowed md:w-fit xl:w-full" onClick={noRoute}>
        <div className="navLink group-hover/navbar:bg-hoverBg">
          <SearchIcon />
          <span className="hidden px-4 text-xl xl:block">Explore</span>
        </div>
      </NavLink>
      <NavLink to={"/notifications"} className="group/navbar cursor-not-allowed md:w-fit xl:w-full" onClick={noRoute}>
        <div className="navLink group-hover/navbar:bg-hoverBg">
          <NotificationIcon />
          <span className="hidden px-4 text-xl xl:block">Notifications</span>
        </div>
      </NavLink>
      <NavLink to={"/messages"} className="group/navbar cursor-not-allowed md:w-fit xl:w-full" onClick={noRoute}>
        <div className="navLink group-hover/navbar:bg-hoverBg">
          <MessageIcon />
          <span className="hidden px-4 text-xl xl:block">Messages</span>
        </div>
      </NavLink>
      <NavLink to={"/premium"} className="group/navbar cursor-not-allowed md:w-fit xl:w-full" onClick={noRoute}>
        <div className="navLink group-hover/navbar:bg-hoverBg">
          <TwitterIcon className="size-[26px]" />
          <span className="hidden px-4 text-xl xl:block">Premium</span>
        </div>
      </NavLink>
      <NavLink to={"/bookmarks"} className="group/navbar md:w-fit xl:w-full">
        <div className="navLink group-hover/navbar:bg-hoverBg">
          <BookmarkIcon solid={pathname === "/bookmarks"} />
          <span className="hidden px-4 text-xl xl:block">Bookmarks</span>
        </div>
      </NavLink>
      <NavLink to={`/users/${user.profile_username}`} className="group/navbar md:w-fit xl:w-full">
        <div className="navLink group-hover/navbar:bg-hoverBg">
          <ProfileIcon solid={pathname === `/users/${user.profile_username}`} />
          <span className="hidden px-4 text-xl xl:block">Profile</span>
        </div>
      </NavLink>
      <div className="group/navbar cursor-pointer md:w-fit xl:w-full">
        <div className="navLink group-hover/navbar:bg-hoverBg">
          <SettingIcon />
          <span className="hidden px-4 text-xl xl:block">Settings</span>
        </div>
      </div>
      <button className="btn accent-btn mt-2 hidden !h-12 w-[90%] !text-lg xl:mt-4 xl:block">
        Post
      </button>
      <button className="bg-accent flex-center mt-2 size-12 rounded-full hover:saturate-150 xl:hidden">
        <PostIcon className="size-6" />
      </button>
      <Menu>
        <MenuButton className="transition-200 data-[hover]:bg-hoverBg data-[open]:bg-hoverBg mt-auto flex cursor-pointer items-center gap-3 rounded-full xl:w-full xl:p-3">
          <img src={user.profile_img} className="bg-secondryBg size-10 min-w-10 rounded-full" />
          <div className="hidden xl:block">
            <div className="flex items-center gap-1.5">
              <p className="profile-name">{user.profile_name}</p>
              <VerifiedIcon />
            </div>
            <p className="profile-username">{`@${user.profile_username}`}</p>
          </div>
          <div className="ml-auto hidden p-1.5 xl:block">
            <DotsIcon className="fill-primaryTxt" />
          </div>
        </MenuButton>
        <MenuItems transition="true" anchor={{ to: "top start", gap: "10px" }} className="transition-menu w-64 origin-top">
          <button className="menu-item hover:bg-red/10 text-red" onClick={logoutUser}>
            {`Log out of @${user.profile_username}`}
          </button>
        </MenuItems>
      </Menu>
    </nav>
  );
};

export default Navbar;
