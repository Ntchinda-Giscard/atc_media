"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/app/components/common/password-input"
import Link from "next/link"

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
})

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-5 w-1/3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-thin">Email</FormLabel>
              <FormControl>
                <Input 
                  placeholder="example@email.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs mt-3 font-thin">Mot de passe</FormLabel>
              <FormControl>
                <PasswordInput
                  {...field}
                  autoComplete="current-password"
                />
              </FormControl>
              <FormMessage />
              <Link 
                href={"#"} 
                className="text-end text-sm text-red-600 font-light">
                Mot de passe oublié ?
            </Link>
            </FormItem>

          )}
        />

       
        <Button 
          type="submit" 
          className="w-full bg-red-600 hover:bg-transparent hover:text-inherit hover:shadow-none hover:ring-2">
          Se connecter
        </Button>
        <p className="text-center">
          Vous n&apos;avez pas de compte ? <Link href={"#"} className="text-red-600"> S&apos;inscrire </Link> 
        </p>
      </form>
    </Form>
  )
}