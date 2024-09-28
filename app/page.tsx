import Button from "@/app/components/Button"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <>
      <Link href="/" className="flex flex-row gap-2 items-center m-3 fixed">
        <Image src="./icon.svg" className="rounded-xl" alt="Homepage" width="60" height="60"/>
        <h1 className="text-4xl">iSolate</h1>
      </Link>
      <div className="h-screen w-screen flex flex-row items-center justify-evenly">
          <div className="flex flex-col w-1/3 gap-6">
            <h1 className="text-5xl"><span className="font-bold">Isolate</span> yourself from your distractions.</h1>
            <p className="text-base">iSolate immerses you in a distraction-free environment, so you can focus solely on the tasks that are important to you.</p>
          </div>
          <div className="flex flex-col gap-5">
              <Button content="Log in" color="outline" href="/api/auth/login"/>
          </div>
      </div>
    </>
  );
}
