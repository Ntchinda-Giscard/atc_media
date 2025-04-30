"use client";
import { useForm } from '@mantine/form';
import { Button, Select, Group, TextInput, PasswordInput, NumberInput } from '@mantine/core';
import useOtherStore from '@/stores/clientStore';
//@ts-ignore
import Cookies from 'js-cookie';
import {useState} from "react";
import { error_notification, success_notification } from '../../utils/notification-center';


function AddAccountForm() {
    const addClients = useOtherStore(state => state.addClients)
    const [loading, setLoading] = useState(false)
    const token = Cookies.get('auth_token');
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          email: '',
          name: '',
          phone: '',
          address: '',
          manager_name: '',
            manager_password: "",
        screens_allowed: 5

        },
    
        validate: {
          email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Adresse e-mail invalide'),
          name: (value: string) => ( value.length > 3 ? null : 'Nom invalide'),
          address: (value: string) => ( value.length > 3 ? null : 'Adresse invalide'),
          manager_name: (value: string) => ( value.length > 3 ? null : 'Nom invalide'),
          screens_allowed: (value: number) => (value >= 1 ? null : "Nombre d'écran invalide"),

        },
      });

      const handleSubmit = async (values: any) =>{
        console.log(values)
        const data = {
            name: values.name,
            address: values.address,
            phone: values.phone,
            manager_name: values.manager_name,
            manager_email: values.email,
            manager_password: values.manager_password,
            screens_allowed: values.screens_allowed
          }
        try{
            setLoading(true)
            console.log("token", token);
            await addClients(data, token);
            setLoading(false)
            success_notification("Creation d'entreprise", "Entreprise créée avec succès")

        }catch(error){
            setLoading(false)
            //@ts-ignore
            error_notification("Mise a jour du mot de passe", `${error?.response?.data?.reason}`)
        }
      }
    return ( 
        <>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <div className="flex md:flex-row flex-col gap-3 justify-between">
                <TextInput
                    radius="md"
                    w={'100%'}
                    label="Nom"
                    placeholder=""
                    key={form.key('name')}
                    {...form.getInputProps('name')}
                />
                <TextInput
                    radius="md"
                    w={'100%'}
                    label="Adresse email"
                    placeholder=""
                    key={form.key('email')}
                    {...form.getInputProps('email')}
                /> 
            </div>

            <TextInput
                radius="md"
                w={'100%'}
                label="Numero de telephone"
                placeholder=""
                key={form.key('phone')}
                {...form.getInputProps('phone')}
            />

            <div className="flex md:flex-row flex-col gap-3 justify-between">
                <TextInput
                    radius="md"
                    w={'100%'}
                    label="Adresse"
                    placeholder=""
                    key={form.key('address')}
                    {...form.getInputProps('address')}
                />
                <TextInput
                    radius="md"
                    w={'100%'}
                    label="Nom du manager"
                    placeholder=""
                    key={form.key('manager_name')}
                    {...form.getInputProps('manager_name')}
                /> 
            </div>

            <div className="flex md:flex-row flex-col gap-3 justify-between">
                <PasswordInput
                    radius="md"
                    w={'100%'}
                    label="Mot de passe"
                    placeholder=""
                    key={form.key('manager_password')}
                    {...form.getInputProps('manager_password')}
                />
                <NumberInput
                    radius="md"
                    w={'100%'}
                    label="Nombre d'ecran authoriser"
                    placeholder=""
                    key={form.key('screens_allowed')}
                    {...form.getInputProps('screens_allowed')}
                /> 
            </div>

            <Group justify="flex-start" mt="md">
                <Button loading={loading} type="submit" color='#EE0202' radius={'md'} > Ajouter </Button>
            </Group>
        </form>
        </>
    );
}

export default AddAccountForm;

