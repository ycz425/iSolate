import { signup } from "./actions"

export default function Login() {
    return(
        <form>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required/>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required/>
            <label htmlFor="confirm-password">Confirm password</label>
            <input id="confirm-password" name="confirm-password" type="password" required/>
            <button formAction={signup}>Sign up</button>
        </form>
    )
}