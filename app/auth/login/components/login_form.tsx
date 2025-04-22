"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
// import Cookies from 'js-cookie';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/app/components/common/password-input"
import Link from "next/link"
import axios from '@/lib/axios'; // adjust path
import {useRouter} from "next/navigation"
import { useState } from "react"
import { Alert } from "@mantine/core"


const formSchema = z.object({
  email: z.string().email({ message: 'Adresse e-mail invalide' }),
  password: z
    .string()
    .min(6, { message: 'Le mot de passe doit comporter au moins 6 caractères' }),
})

export function ProfileForm() {
  const router = useRouter();
  const [errMessage, setErrMessage] = useState(null)
  const [isLoading, setIsloading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    const url = '/user/login';
  const payload = {
    // first_name: 'Jean',
    email:    values?.email,
    password: values?.password,
    ip:       '192.168.1.1',
  };


  try {
    setIsloading(true)
    const response = await axios.post(url, payload, {
      headers: {
        'Accept':        'application/json',
        'Content-Type':  'application/json',
        'X-CSRF-TOKEN':  '',   // keep empty if your backend expects it but you’re not using it
      },
    });
    console.log('Login success:', response.data);
    const user_data = response.data
    const targetWindow = window.open('http://ec2-54-147-13-74.compute-1.amazonaws.com:3001', '_blank')
    setTimeout(() =>{
      targetWindow?.postMessage({ user_data }, 'http://ec2-54-147-13-74.compute-1.amazonaws.com:3001');
    }, 1000)
    setErrMessage(null)
    setIsloading(false)
    router.push('/dashboard')
    return response.data;
  } catch (err: any) {
    //@ts-ignore
      console.error('Login failed:', err?.response?.data?.reason);
      setErrMessage(err?.response?.data?.reason)
      setIsloading(false)
      throw err;
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-5 md:w-1/3  w-2/3">
        { errMessage &&
          <Alert color='red'>
            <p className="text-red-600"> {errMessage} </p>
          </Alert>
        }
        <FormField
          control={form.control}
          name="email"
          render={({ field }: any) => (
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
            render={({ field }: any) => (
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
          disabled = {isLoading}
          type="submit" 
          className="w-full bg-red-600 hover:bg-transparent hover:text-inherit hover:shadow-none hover:ring-2">
          Se connecter
          { isLoading &&
              <Loader2 className="animate-spin" />
            }
        </Button>
        <p className="text-center">
          Vous n&apos;avez pas de compte ? <Link href={"#"} className="text-red-600"> S&apos;inscrire </Link> 
        </p>
      </form>
    </Form>
  )
}