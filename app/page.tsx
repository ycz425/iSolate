import Button from "./ui/Button"

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <div className="h-1/3 w-full flex items-start justify-start p-3">
          <h1 className="text-4xl">Isolate</h1>
      </div>
      <div className="h-1/3 w-full flex flex-row items-center justify-evenly">
          <div className="flex flex-col w-96 gap-3">
            <h1 className="text-4xl"><span className="font-bold">Isolate</span> yourself from<br/>your distractions.</h1>
            <p className="text-base">Isolate immerses you in a distraction-free environment, so you can focus solely on the tasks you need to complete.</p>
          </div>
          <div className="flex flex-col gap-5">
            <Button content="Log in" color="outline"/>
            <Button content="Create an account" color="colored"/>
          </div>
      </div>
    </div>
  );
}
