export default function AuthLayout({children}: Readonly<{children: React.ReactNode;}>) {
    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="h-fit w-80">
                {children}
            </div>
        </div>

    )
}