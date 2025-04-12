"use client"
import { PasswordInput } from "@/app/components/common/password-input";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { SetStateAction, useState } from "react";
import { ProfileForm } from "./components/login_form";

function LoginPage() {
    const [password, setPassword] = useState("")
	const [passwordConfirmation, setPasswordConfirmation] = useState("")
    return ( 
        <>
            <div className="w-full flex justify-center flex-col w-full">
                
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
                {/* <div className="w-full flex justify-center">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="email" className="text-sm font-thin">Email</Label>
                        <Input type="email" id="email" placeholder="Email" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="current_password" className="text-sm font-thin" > Mot de passe</Label>
                        <PasswordInput
                            // id="current_password"
                            value={password}
                            onChange={(e: { target: { value: SetStateAction<string> } }) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                    </div>
                   
                </div> */}
                
            </div>
        </> 
    );
}

export default LoginPage;