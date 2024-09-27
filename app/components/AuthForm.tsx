"use client"

import Button from "@/app/components/Button"
import { useFormState } from "react-dom"

interface AuthFormProps {
    action: (prevState: any, formData: FormData) => Promise<{message: string}>,
    confirmPassword?: boolean,
    buttonText: string,
    formName: string
}

export default function AuthForm({ action, confirmPassword = false, buttonText, formName }: AuthFormProps) {
    const [state, formAction] = useFormState(action, null)

    return (
        <div className="flex flex-col items-center gap-8 w-full ">
            <h1 className="text-4xl">{formName}</h1>
            <form action={formAction} className="flex flex-col gap-4 items-center w-full" noValidate>
                { state ?
                    <div className="h-fit w-full min-h-14 flex justify-center items-center bg-red-200 border border-red-800 rounded-xl">
                        <p aria-live="polite" className="h-fit text-red-800 text-sm text-center p-3">{state?.message}</p>
                    </div>
                     : null
                }
                <div className="w-full h-14">
                    <label className="hidden" htmlFor="email">Email</label>
                    <input className="border border-black rounded-xl h-full w-full p-3" id="email" name="email" type="email" placeholder="Email" required/>
                </div>
                <div className="w-full h-14">
                    <label className="hidden" htmlFor="password">Password</label>
                    <input className="border border-black rounded-xl h-full w-full p-3" id="password" name="password" type="password" placeholder="Password"  required/>
                </div>
                {confirmPassword ? <div className="w-full h-14">
                    <label className="hidden" htmlFor="confirm-password">Confirm password</label>
                    <input className="border border-black rounded-xl h-full w-full p-3" id="confirm-password" name="confirm-password" type="password" placeholder="Confirm password" required/>
                </div> : null}
                <Button content={buttonText} color="colored"/>   
            </form>
        </div>
    )
}