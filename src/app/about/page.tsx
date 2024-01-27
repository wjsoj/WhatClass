import Dashboard from "@/components/dashboard";
import QandA from "@/components/QandA";

export default async function About() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return (
    <div className='flex flex-col py-10 px-4'>
      <h1 className='text-gradient text-5xl text-center font-extrabold'>About</h1>
      <Dashboard />
      <div className="my-4 px-4 rounded-xl shadow-lg bg-gradient-to-br from-pink-400/10 to-slate-200 dark:from-violet-700/40 dark:to-slate-700/30">
        <QandA />
      </div>
    </div>
  )
}