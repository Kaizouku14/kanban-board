const Dark = () => {
  return (
    <div className="flex flex-col justify-center items-center sm:items-start sm:space-y-2">
      <div className="items-center rounded-md border-2 border-muted bg-popover p-1 sm:p-2 hover:bg-accent hover:text-accent-foreground">
        <div className="space-y-2 rounded-sm bg-slate-950 p-2 sm:p-3">
          <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
            <div className="h-2 w-[50px] sm:w-[80px] rounded-lg bg-slate-400" />
            <div className="h-2 w-[80px] sm:w-[100px] rounded-lg bg-slate-400" />
          </div>
          <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
            <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-slate-400" />
            <div className="h-2 w-[80px] sm:w-[100px] rounded-lg bg-slate-400" />
          </div>
          <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
            <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-slate-400" />
            <div className="h-2 w-[80px] sm:w-[100px] rounded-lg bg-slate-400" />
          </div>
        </div>
      </div>
      <span className="block w-full p-2 text-center text-sm sm:text-base font-normal">
        Dark
      </span>
    </div>
  );
};

export default Dark;
