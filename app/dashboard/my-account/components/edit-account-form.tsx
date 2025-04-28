"use client";
import { useForm } from '@mantine/form';
import { Button, Select, Group, TextInput, NumberInput } from '@mantine/core';
import useOtherStore from '@/stores/clientStore';
//@ts-ignore
import Cookies from 'js-cookie';
import {useEffect, useState} from "react";
import { error_notification, success_notification } from '../../utils/notification-center';

function EditAccountForm({close, item}: any) {
    const updateClient = useOtherStore(state => state.updateClient)
    const fetchClients = useOtherStore(state => state.fetchClients)
    const [loading, setLoading] = useState(false)
    const token = Cookies.get('auth_token');
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          name: null,
          phone: null,
          address: null,
        screens_allowed: 5

        },
    
        validate: {
        //   name: (value: string) => ( value.length > 3 ? null : 'Nom invalide'),
        //   address: (value: string) => ( value.length > 3 ? null : 'Adresse invalide'),
        //   screens_allowed: (value: number) => (value >= 1 ? null : "Nombre d'écran invalide"),

        },
      });

    const handleSubmit = async (values: any) =>{
    console.log(values)
    const data = {
            name: values.name,
            address: values.address,
            phone: values.phone,
            screens_allowed: values.creens_allowed,
            active: true
    }
    try{
        setLoading(true)
        await updateClient(data, item?.id, token)
        close()
        setLoading(false)
        success_notification("Mise a jour sous-compte", "Entreprise mise à jour avec succès")
        // await fetchClients(token)
        
    }catch(error){
        console.log(error)
        setLoading(false)
        //@ts-ignore
        error_notification("Mise a jour sous-compte", `${error?.response?.data?.reason}`)

    }
    }

    useEffect(() =>{
        form.setFieldValue('name', item?.name)
        form.setFieldValue('address', item?.address)
        form.setFieldValue('phone', item?.phone)
        form.setFieldValue('screens_allowed', item?.screens_allowed)
    }, [])
    return ( 
        <>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <div className="flex flex-col gap-3 justify-between">
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
                    label="Adresse"
                    placeholder=""
                    key={form.key('address')}
                    {...form.getInputProps('address')}
                />
            </div>

            <div className="flex flex-col gap-3 justify-between">
                <TextInput
                    radius="md"
                    w={'100%'}
                    label="Numero de téleephone"
                    placeholder=""
                    key={form.key('phone')}
                    {...form.getInputProps('phone')}
                />
                <NumberInput
                    radius="md"
                    w={'100%'}
                    label="Nombre de d'ecran"
                    placeholder=""
                    key={form.key('screens_allowed')}
                    {...form.getInputProps('screens_allowed')}
                />
            </div>

                <Group grow gap={5} mt="md">
            <Button variant="outline" color="red" onClick={close} radius={'md'}>
                Annuler
            </Button>
            <Button loading={loading}  type="submit" color='#EE0202' radius={'md'}>
                Modifier
            </Button>
        </Group>
        </form>
        </>
    );
}

export default EditAccountForm;