import { Tooltip } from "@chakra-ui/react";

const NavComponent = ({ children, nav, setNav, label }) => {
  return (
    <Tooltip label={label}>
      <button
        className={`navigation hover:bg-${
          nav !== "home" ? "zinc-700" : "transparent"
        } ${nav === label && "text-purple-400"} `}
        onClick={() => setNav(label)}
      >
        {children}
        {nav === label && <div className="bottomBar"></div>}
      </button>
    </Tooltip>
  );
};

export default NavComponent;
