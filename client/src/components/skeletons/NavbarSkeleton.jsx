const NavbarSkeleton = () => {
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="skeleton w-10 aspect-square rounded-full shrink-0"></span>
        <span className="skeleton w-52 h-11 shrink-0 "></span>
      </div>
      <div className="flex items-center gap-2">
        <span className="skeleton w-10 aspect-square shrink-0 rounded-full"></span>
        <span className="skeleton w-10 aspect-square shrink-0 rounded-full"></span>
        <span className="skeleton w-10 aspect-square shrink-0 rounded-full"></span>
        <span className="skeleton w-10 aspect-square shrink-0 rounded-full"></span>
      </div>
    </>
  );
};

export default NavbarSkeleton;
