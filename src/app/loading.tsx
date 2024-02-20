export default function loading(){
  return (
    <div className="flex justify-center wave grow overflow-hidden w-screen">
      <h1 className="text-center font-extrabold text-5xl mt-[20vh] bg-clip-text text-transparent bg-slate-700/70 dark:bg-slate-300/90 animate-pulse z-10">
        Loaing...
      </h1>
      <div className="w1 bg-yellow-400 dark:bg-teal-700 opacity-35"></div>
      <div className="w2 bg-pink-400 dark:bg-sky-600 opacity-20"></div>
      <div className="w3 bg-red-500 dark:bg-violet-700 opacity-30"></div>
    </div>
  )
}