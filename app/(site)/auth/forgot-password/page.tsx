'use client'
import { IconArrowLeft } from '@tabler/icons-react';
import {
    Alert,
  Anchor,
  Box,
  Center,
  Container,
  Group,
  Paper,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { Button } from "@/components/ui/button"
import Link from "next/link"
import axios from 'axios'
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import {useRouter} from 'next/navigation'
//@ts-ignore
import Cookies from 'js-cookie'

// import classes from './ForgotPassword.module.css';

export default function ForgotPassword() {
    const [isLoading, setIsloading] = useState(false);
    const [errMessage, setErrMessage] = useState(null);
    const router  = useRouter()
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          email: '',
        },
    
        validate: {
          email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Adresse e-mail invalide'),
        },
      });

    const handleSubmit = (values: { email: any; }) =>{
        const body = {
            "email": values.email,
            "ip": "192.168.1.1"
          }
        try{
            setIsloading(true)
            const url= "http://ec2-54-147-13-74.compute-1.amazonaws.com/api/user/forgot-password"
            const res = axios.post(url, body);
            //@ts-ignore
            const token = res.data.data.token.value
            Cookies.set('auth_token', token, { expires: 30 })
            setIsloading(false)
            router.push('/auth/verify-otp')
        }catch(err){
            //@ts-ignore
            setErrMessage(err?.response?.data?.reason)
            setIsloading(false)
            
        }
        
    }
  return (
    <div className="h-svh flex justify-center flex-col w-full">
        <div className="text-center w-full flex flex-col gap-5">
            <h1 className=" text-xl text-neutral-950 font-medium">
                🔐 Mot de passe oublié ?
            </h1>
            <p className="font-thin text-sm text-neutral-900">
                Entrez votre adresse e-mail pour recevoir un code de réinitialisation.
            </p>
                    
        </div>
        { errMessage &&
          <Alert color='red' m={10}>
            <p className="text-red-600"> {errMessage} </p>
          </Alert>
        }
        <div className="flex justify-center w-full">
            <form onSubmit={form.onSubmit((values) => console.log(values))}
            className="w-2/3 mt-5 space-y-8 md:w-1/3"
            >
                <TextInput 
                    key={form.key('email')}
                    {...form.getInputProps('email')}
                    radius={'md'} 
                    label="Votre adresse e-mail" 
                    placeholder="me@mantine.dev" required 
                />
                <Group justify="space-between" mt="lg" 
                // className={classes.controls}
                >
                <Anchor component={Link} href={'/auth/login'} c="dimmed" size="sm" 
                //   className={classes.control}
                >
                    <Center inline>
                    <IconArrowLeft size={12} stroke={1.5} />
                    <Box ml={5}>Retour à la page de connexion.</Box>
                    </Center>
                </Anchor>
                <Button 
                    disabled = {isLoading}
                    type="submit"
                //   className={classes.control}
                    className="w-full bg-red-600 hover:bg-transparent hover:text-inherit hover:shadow-none hover:ring-2"
                >
                    { isLoading &&
              <Loader2 className="animate-spin" />
            }
                    Réinitialiser le mot de passe</Button>
                </Group>
            </form>
        </div>
    </div>
  );
}