import SignIn from "@/app/components/SignIn"

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <div className="h-1/3 w-full flex items-start justify-start p-5">
          <h1 className="text-4xl">iSolate</h1>
      </div>
      <div className="h-1/3 w-full flex flex-row items-center justify-evenly">
          <div className="flex flex-col w-1/3 gap-6">
            <h1 className="text-5xl"><span className="font-bold">Isolate</span> yourself from your distractions.</h1>
            <p className="text-base">iSolate immerses you in a distraction-free environment, so you can focus solely on the tasks that are important to you.</p>
          </div>
          <div className="flex flex-col gap-5">
            <SignIn/>
          </div>
      </div>
    </div>
  );
}
