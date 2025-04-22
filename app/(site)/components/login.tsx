
"use client"

import { SetStateAction, useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "./common/password-input"

const SampleUseCase = () => {
	const [currentPassword, setCurrentPassword] = useState("")
	const [password, setPassword] = useState("")
	const [passwordConfirmation, setPasswordConfirmation] = useState("")

	return (
		<div className="space-y-4">
			<div>
				<Label htmlFor="current_password">Current Password</Label>
				<PasswordInput
					// id="current_password"
					value={currentPassword}
					onChange={(e: { target: { value: SetStateAction<string> } }) => setCurrentPassword(e.target.value)}
					autoComplete="current-password"
				/>
			</div>
			
			<Button type="submit">Save</Button>
		</div>
	)
}

export default SampleUseCase
