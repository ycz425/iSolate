import Button from "@/app/components/Button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-row items-center justify-evenly">
        <div className="flex flex-col w-1/3 gap-6">
          <h1 className="text-5xl"><span className="font-bold">Isolate</span> yourself from your distractions.</h1>
          <p className="text-base">iSolate immerses you in a distraction-free environment, so you can focus solely on the tasks that are important to you.</p>
        </div>
        <div className="flex flex-col gap-5">
            <Button content="Log in" color="outline" href="/api/auth/login"/>
        </div>
    </div>
  );
}
