"use client"
import { useForm } from '@mantine/form';
import { Button, PasswordInput, Group, TextInput, Select } from '@mantine/core';
// import { useApi } from '@/lib/hooks/useApi';
import { useEffect, useState } from 'react';
import { error_notification, success_notification } from '../../utils/notification-center';
//@ts-ignore
import Cookies from 'js-cookie';
import axios from 'axios'

function SettingsForm() {
    // const api = useApi();
    const token = Cookies.get('auth_token');
    const [loading, setLoading] = useState(false)
    const [errMessage, setErrorMessage] = useState<string | null>(null)
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          email: '',
          name: '',
        //   phone: '',
        //   password: '',
        //   newPassword: '',
        //   passwordConfirmation: '',
        //   language: 'Français',
        //   timezone: [ 'UTC+1 (Europe/Paris)'],
        },
    
        validate: {
        //   email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Adresse e-mail invalide'),
        //   name: (value: string) => ( value?.length > 3 ? null : 'Nom invalide'),
        },
    });

    async function handleSubmit(values: any){
        const url = 'http://ec2-54-147-13-74.compute-1.amazonaws.com/api/v1/user/updated/1'
        console.log(values)
        console.log("Token", token)
        
        try{
            const payload = {
                name: values.name,
                email: values.email
            }
            setLoading(true)
            const response = await axios.put(url, payload, {
                headers: {
                  'Accept':        'application/json',
                  'Content-Type':  'application/json',
                  'X-CSRF-TOKEN':  '',
                  'Authorization': `Bearer ${token}` 
                },
              });
              setLoading(false)
              success_notification("Mise a jour utilisateur", "Mise a jour effectuer avec succes")
        }catch(error){
            console.log(error)
            setLoading(false)
            error_notification("Mise a jour utilisateur", "Echec de la mise ajour des information utilisateur")
        }
    }
    return ( 
        <>
            <p className="text-2xl font-semilight my-5"> Informations Personnelles </p>
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <section className="space-y-5"> 
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <TextInput
                            w={'100%'}
                            radius="md"
                            withAsterisk
                            label="Nom"
                            placeholder="GMP TEST"
                            key={form.key('name')}
                            {...form.getInputProps('name')}
                        />
                        <TextInput
                        w={'100%'}
                        radius="md"
                        withAsterisk
                        label="Adressse email"
                        placeholder="admin@example.com"
                        key={form.key('email')}
                        {...form.getInputProps('email')}
                    />
                    </div>
                    
                </section>

                <Button 
                    loading={loading}
                    type='submit' 
                    color='#EE0202' 
                    radius="md"
                    mt={'md'}
                >  
                    Enregistrer les modifications
                </Button>
            </form>

            

            
        </>
    );
}

export default SettingsForm;

{/* <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <section className="space-y-5"> 
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <TextInput
                            w={'100%'}
                            radius="md"
                            withAsterisk
                            label="Adresse mail"
                            placeholder="your@email.com"
                            key={form.key('email')}
                            {...form.getInputProps('email')}
                        />
                        <TextInput
                            w={'100%'}
                            radius="md"
                            withAsterisk
                            label="Nom"
                            placeholder="GMP TEST"
                            key={form.key('name')}
                            {...form.getInputProps('name')}
                        />
                    </div>
                    <TextInput
                        radius="md"
                        withAsterisk
                        label="Téléphone"
                        placeholder="+XXX XXX XXX XXX"
                        key={form.key('phone')}
                        {...form.getInputProps('phone')}
                    />
                </section>

                <section className="space-y-5"> 
                    <p className="text-2xl font-semilight my-5"> Changer le mot de passe </p>
                    <PasswordInput
                        radius="md"
                        label="Mot de passe actuel"
                        key={form.key('password')}
                        {...form.getInputProps('password')}
                    />
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <PasswordInput
                            w={'100%'}
                            radius="md"
                            label="Nouveau mot de passe "
                            key={form.key('newPassword')}
                            {...form.getInputProps('newPassword')}
                        />
                        <PasswordInput
                            w={'100%'}
                            radius="md"
                            label="Confirmer le mot de passe "
                            key={form.key('passwordConfirmation')}
                            {...form.getInputProps('passwordConfirmation')}
                        />
                    </div>
                    
                </section>

                <section className="space-y-5"> 
                    <p className="text-2xl font-semilight my-5"> Préférences </p>
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <Select
                            w={'100%'}
                            radius="md"
                            data={['Français', 'English']}
                            label="Langue"
                            key={form.key('language')}
                            {...form.getInputProps('language')}
                        />
                        <Select
                            w={'100%'}
                            data={[]}
                            radius="md"
                            label="Fuseau horaire"
                            key={form.key('timezone')}
                            {...form.getInputProps('timezone')}
                        />
                    </div>
                </section>

                <Button 
                    type='submit' 
                    color='#EE0202' 
                    radius="md"
                    mt={'md'}
                >  
                    Enregistrer les modifications
                </Button>
            </form>  */}