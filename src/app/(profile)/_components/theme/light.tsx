const Light = () => {
  return (
    <div className="flex flex-col justify-center">
      <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
        <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
          <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
            <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
            <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
          </div>
          <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
            <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
            <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
          </div>
          <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
            <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
            <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
          </div>
        </div>
      </div>
      <span className="block w-full p-2 text-center font-normal">Light</span>
    </div>
  );
};

export default Light;
