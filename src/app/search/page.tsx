import Search from "@/components/Search";
import Mock from "@/components/Mock";

export default function Page() {
  return (
    <>
    <div className="hidden lg:block">
      <Mock>
        <Search isLargeScreen/>
      </Mock>
    </div>
    <div className="lg:hidden">
      <Search isLargeScreen={false}/>
    </div>
    </>
  )
}