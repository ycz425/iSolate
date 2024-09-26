import Button from "@/app/components/Button"

interface AuthFormProps {
    formAction: ((formData: FormData) => void | Promise<void>),
    confirmPassword?: boolean,
    buttonText: string,
    formName: string
}

export default function AuthForm({ formAction, confirmPassword = false, buttonText, formName }: AuthFormProps) {
    return (
        <div className="flex flex-col items-center gap-8">
            <h1 className="text-4xl">{formName}</h1>
            <form className="flex flex-col gap-6">
                <div>
                    <label className="hidden" htmlFor="email">Email</label>
                    <input className="border border-black rounded-xl h-14 w-full p-3" id="email" name="email" type="email" placeholder="Email" required/>
                </div>
                <div>
                    <label className="hidden" htmlFor="password">Password</label>
                    <input className="border border-black rounded-xl h-14 w-full p-3" id="password" name="password" type="password" placeholder="Password"  required/>
                </div>
                {confirmPassword ? <div>
                    <label className="hidden" htmlFor="confirm-password">Confirm password</label>
                    <input className="border border-black rounded-xl h-14 w-full p-3" id="confirm-password" name="confirm-password" type="password" placeholder="Confirm password" required/>
                </div> : null}
                <Button content={buttonText} color="colored" formAction={formAction}/>
            </form>
        </div>
    )
}