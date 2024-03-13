'use client'
import Mock from "@/components/Mock"
import RoomPage from "@/components/RoomPage"

export default function Page() {

  return (
    <>
    <div className="flex-col space-y-4 justify-center my-6 lg:hidden">
      <RoomPage />
    </div>
    
    <div className="hidden lg:block">
      <Mock>
      <div className="flex-col space-y-4 w-full items-center my-6">
        <RoomPage />
      </div>
      </Mock>
    </div>
    </>
  )
}