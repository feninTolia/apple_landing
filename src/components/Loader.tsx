const Loader = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="w-[10-vw] h-[10vh] rounded-full">
        <div className="w-full gap-x-2 flex justify-center items-center">
          <div className="w-3 bg-[#d7afca] animate-pulse h-3 rounded-full animate-bounce"></div>
          <div className="w-3 animate-pulse h-3 bg-[#9a83a9] rounded-full animate-bounce"></div>
          <div className="w-3 h-3 animate-pulse bg-[#9992c0] rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
