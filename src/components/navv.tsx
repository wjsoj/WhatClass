import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import { useEffect } from "react"

const links = [
  { href: "/", label: "主页" },
  { href: "/search", label: "高级搜索"},
  { href: "/classroom", label: "空闲教室" },
  { href: "/about", label: "关于" },
]

export default function Navv(){
  const pathname = usePathname()
  useEffect(() => {
    const block = document.getElementById("block")
    if (block) {
      switch (pathname) {
        case "/":
          block.style.opacity = "1"
          block.style.left = "3%"
          break
        case "/search":
          block.style.opacity = "1"
          block.style.left = "27%"
          break
        case "/classroom":
          block.style.opacity = "1"
          block.style.left = "51%"
          break
        case "/about":
          block.style.opacity = "1"
          block.style.left = "75%"
          break
        default:
          block.style.opacity = "0"
      }
    }
  })
  return (
    <nav className=
      "flex grow flex-row w-full z-10 justify-center bg-slate-100/45 dark:bg-slate-900/20 backdrop-filter backdrop-blur-lg rounded-full mx-5 px-2 py-2 relative z-1 shadow-md shadow-slate-300 dark:shadow-slate-700/60 border-1 border-slate-800 dark:border-slate-200">
      {links.map(({ href, label }) => (
        <Link href={href} key={label} className={clsx(
          pathname === href && "bg-white/60 dark:bg-slate-400/20 md:bg-transparent md:dark:bg-transparent shadow-xl",
          "px-2 py-2 rounded-full basis-1/4 hover:scale-95 nav-link transition-all md:duration-1000 duration-300 ease-in-out"
        )}>
          <p className={clsx(
            "text-[14px] text-center",
            pathname === href ? "font-semibold text-slate-700 dark:text-slate-200":"font-medium text-slate-600 dark:text-slate-300",
          )}>
            {label}
          </p>
        </Link>
      ))}
      <div className=
        "bg-white/60 dark:bg-slate-400/10 absolute rounded-full w-[22%] h-[70%] z-[-10] shadow-xl hidden md:block" id="block">
      </div>
    </nav>
  )
}