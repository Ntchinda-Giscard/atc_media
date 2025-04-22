"use client"
import { PasswordInput } from "@/app/(site)/components/common/password-input";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { SetStateAction, useState } from "react";
import { ProfileForm } from "./components/login_form";

function LoginPage() {
    const [password, setPassword] = useState("")
	const [passwordConfirmation, setPasswordConfirmation] = useState("")
    return ( 
        <>
            <div className="h-svh flex justify-center flex-col w-full">
                
                <div className="text-center w-full flex flex-col gap-5">
                    <h1 className=" text-xl text-neutral-950 font-medium">
                        🔐 Connexion à votre compte
                    </h1>
                    <p className="font-thin text-sm text-neutral-900">
                        Accédez à votre espace et gérez vos diffusions en toute simplicité.
                    </p>
                </div>
                <div className="flex justify-center w-full">
                    <ProfileForm />
                </div>
                
            </div>
        </> 
    );
}

export default LoginPage;