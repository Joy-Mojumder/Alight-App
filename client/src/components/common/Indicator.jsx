const Indicator = ({ messageCount, children }) => {
  return (
    <div className="indicator">
      <span className="indicator-item badge bg-red-600 top-1 right-1 text-xs text-white font-semibold px-2">
        {messageCount}
      </span>
      {children}
    </div>
  );
};

export default Indicator;
