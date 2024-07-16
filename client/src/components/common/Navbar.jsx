import { IoHomeSharp } from "react-icons/io5";
import { MdOndemandVideo } from "react-icons/md";
import { BsShop } from "react-icons/bs";
import { TiGroup } from "react-icons/ti";
import { IoLogoGameControllerB } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { SiBentobox } from "react-icons/si";
import { AiFillMessage } from "react-icons/ai";
import { MdNotifications } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
// import { HiMiniXMark } from "react-icons/hi2";

import { useState } from "react";
import Indicator from "./Indicator";
import NavbarSkeleton from "../skeletons/NavbarSkeleton";
import ProfileDropDown from "./ProfileDropDown";
import NavComponent from "./NavComponent";
import { Tooltip } from "@chakra-ui/react";

const Navbar = () => {
  const [nav, setNav] = useState("Home");
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchPresent, setIsSearchPresent] = useState(false);

  const isLoading = false;

  const handleSearch = () => {
    setIsSearching(true);
  };

  const handleClose = () => {
    setIsSearching(false);
  };

  const handleSearchPresent = (e) => {
    e.stopPropagation();
    setIsSearchPresent(true);
  };
  return (
    <nav className="lg:navbar lg:justify-between grid grid-rows-2 bg-zinc-800 border-b-2 border-b-zinc-700 p-4 xl:p-2 sticky top-0 z-50">
      {isLoading && <NavbarSkeleton />}
      {!isLoading && (
        <>
          <div className="flex items-center gap-2 justify-between">
            {!isSearching ? (
              <img src="/Logo.png" alt="Alight Logo" className="w-12" />
            ) : (
              <button className="btn btn-ghost btn-circle text-white hover:bg-zinc-700">
                <IoMdArrowRoundBack
                  className="w-6 h-6 opacity-80"
                  onClick={handleClose}
                />
              </button>
            )}
            <label
              className="input input-bordered hidden lg:flex items-center gap-2 bg-zinc-700 text-white rounded-full h-11"
              onClick={handleSearch}
            >
              {!isSearching && (
                <IoSearchOutline className="w-5 h-5" onClick={() => {}} />
              )}

              <input type="text" className="grow" placeholder="Search Alight" />
            </label>
            <div className="lg:hidden flex gap-2">
              {!isSearchPresent && (
                <button className="nav-circle-button" data-tip="Search">
                  <IoSearchOutline
                    className="w-6 h-6"
                    onClick={handleSearchPresent}
                  />
                </button>
              )}
              {isSearchPresent && (
                <label className="input input-bordered flex items-center gap-2 bg-zinc-700 text-white rounded-full h-11 ">
                  <input
                    type="text"
                    className="grow"
                    placeholder="Search Alight"
                  />
                  <IoMdArrowRoundBack
                    className="w-6 h-6 opacity-80 rotate-180"
                    onClick={() => setIsSearchPresent(false)}
                  />
                </label>
              )}
              <button className="nav-circle-button" data-tip="Menu">
                <SiBentobox className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="flex sm:gap-2 absolute left-1/2 bottom-0 -translate-x-1/2">
            <NavComponent nav={nav} setNav={setNav} label="Home">
              <IoHomeSharp className="navButton" onClick={() => {}} />
            </NavComponent>
            <NavComponent nav={nav} setNav={setNav} label="Video">
              <MdOndemandVideo className="navButton" onClick={() => {}} />
            </NavComponent>
            <NavComponent nav={nav} setNav={setNav} label="Shop">
              <BsShop className="navButton" onClick={() => {}} />
            </NavComponent>
            <NavComponent nav={nav} setNav={setNav} label="Groups">
              <TiGroup className="navButton" onClick={() => {}} />
            </NavComponent>
            <NavComponent nav={nav} setNav={setNav} label="Games">
              <IoLogoGameControllerB className="navButton" onClick={() => {}} />
            </NavComponent>
          </div>
          <div className="lg:flex gap-2 hidden">
            <div>
              <Tooltip label="Menu">
                <button className="nav-circle-button">
                  <SiBentobox className="w-6 h-6" />
                </button>
              </Tooltip>
            </div>
            <Indicator messageCount={5}>
              <Tooltip label="Messages">
                <button className="nav-circle-button">
                  <AiFillMessage className="w-6 h-6" />
                </button>
              </Tooltip>
            </Indicator>
            <Indicator messageCount={7}>
              <Tooltip label="Notifications">
                <button className="nav-circle-button" data-tip="Notifications">
                  <MdNotifications className="w-6 h-6" />
                </button>
              </Tooltip>
            </Indicator>
            <div className="cursor-pointer">
              <ProfileDropDown />
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
