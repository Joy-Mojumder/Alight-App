import { Avatar } from "@chakra-ui/react";
import {
  FcConferenceCall,
  FcClock,
  FcBookmark,
  FcVoicePresentation,
  FcShop,
  FcStart,
  FcAdvertising,
  FcCollaboration,
  FcCollapse,
  FcExpand,
} from "react-icons/fc";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const LeftBar = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isSeeMoreClicked, setIsSeeMoreClicked] = useState(false);

  // getting user data from query key
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  const handleSeeMoreClick = () => {
    setIsSeeMoreClicked(!isSeeMoreClicked);
  };

  return (
    <section className="hidden md:flex flex-col gap-2 w-1/4 md:w-1/6 xl:w-1/5 h-screen overflow-y-auto scrollbar-patla fixed">
      <div className="flex flex-col">
        <ul className="menu bg-transparent w-full font-semibold text-xs lg:text-base gap-2">
          <li className="hover:bg-stone-600 rounded-md">
            <a href="#">
              <Avatar
                name={`${authUser.firstName} ${authUser.lastName}`}
                size="sm"
              />
              <p className="ml-1">{`${authUser.firstName} ${authUser.lastName}`}</p>
            </a>
          </li>

          <li className="hover:bg-stone-600 rounded-md">
            <a href="#">
              <FcVoicePresentation size={"2em"} />
              <p>Friends</p>
            </a>
          </li>

          <li className="hover:bg-stone-600 rounded-md">
            <a href="#">
              <FcClock size={"2em"} className="text-amber-500" />
              <p>Memories</p>
            </a>
          </li>
          <li className="hover:bg-stone-600 rounded-md">
            <a href="#">
              <FcBookmark size={"2em"} />
              <p>Saved</p>
            </a>
          </li>
          <li className="hover:bg-stone-600 rounded-md">
            <a href="#">
              <FcConferenceCall size={"2em"} />
              <p>Groups</p>
            </a>
          </li>
          {isSeeMoreClicked && (
            <>
              <li className="hover:bg-stone-600 rounded-md">
                <a href="#">
                  <FcStart size={"2em"} />
                  <p>Videos</p>
                </a>
              </li>

              <li className="hover:bg-stone-600 rounded-md">
                <a href="#">
                  <FcShop size={"2em"} />
                  <p>Marketplace</p>
                </a>
              </li>
              <li className="hover:bg-stone-600 rounded-md">
                <a href="#">
                  <FcAdvertising size={"2em"} />
                  <p>Feeds</p>
                </a>
              </li>
              <li className="hover:bg-stone-600 rounded-md">
                <a href="#">
                  <FcCollaboration size={"2em"} />
                  <p>Message</p>
                </a>
              </li>
            </>
          )}
          <li
            className="hover:bg-stone-600 rounded-md "
            onClick={handleSeeMoreClick}
          >
            <button>
              {isSeeMoreClicked && <FcCollapse size={"2em"} />}
              {!isSeeMoreClicked && <FcExpand size={"2em"} />}
              <p className="text-white">
                See {`${isSeeMoreClicked ? "Less" : "More"}`}
              </p>
            </button>
          </li>
        </ul>
      </div>
      <hr className="border-white opacity-50 m-2" />
      <section
        className="flex flex-col gap-2 "
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-center justify-between h-12 p-2">
          <h2 className="text-base lg:text-lg font-semibold">Your Shortcuts</h2>
          {isHovering && (
            <button className="btn btn-ghost hover:bg-zinc-700 px-6">
              Edit
            </button>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <ul className="menu bg-transparent w-full font-semibold text-base">
            <li className="hover:bg-stone-600 rounded-md">
              <a href="#">
                <Avatar name="jon" size={"sm"} />
                <p>jon</p>
              </a>
            </li>
            <li className="hover:bg-stone-600 rounded-md">
              <a href="#">
                <Avatar name="kane" size={"sm"} />
                <p>kane</p>
              </a>
            </li>
            <li className="hover:bg-stone-600 rounded-md">
              <a href="#">
                <Avatar name="lara" size={"sm"} />
                <p>lara</p>
              </a>
            </li>
          </ul>
        </div>
      </section>
      <footer>
        <p>© 2023 Alight. All rights reserved.</p>
      </footer>
    </section>
  );
};

export default LeftBar;
