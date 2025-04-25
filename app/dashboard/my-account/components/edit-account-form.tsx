"use client";
import { useForm } from '@mantine/form';
import { Button, Select, Group, TextInput, NumberInput } from '@mantine/core';
import useStore from '@/stores/store';
//@ts-ignore
import Cookies from 'js-cookie';
import {useState} from "react";
import { error_notification, success_notification } from '../../utils/notification-center';

function EditAccountForm({close, item}: any) {
    const updateClient = useStore(state => state.updateClient)
    const [loading, setLoading] = useState(false)
    const token = Cookies.get('auth_token');
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          name: '',
          phone: '',
          address: '',
        screens_allowed: 5

        },
    
        validate: {
          name: (value: string) => ( value.length > 3 ? null : 'Nom invalide'),
          address: (value: string) => ( value.length > 3 ? null : 'Adresse invalide'),
          screens_allowed: (value: number) => (value >= 1 ? null : "Nombre d'écran invalide"),

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
            await updateClient(data, item?.company?.id, token)
            close()
            setLoading(false)
            success_notification("Mise a jour sous-compte", "Mise a jour effectuer avec succes")
            
        }catch(error){
            setLoading(false)
            //@ts-ignore
            error_notification("Mise a jour sous-compte", `${error?.response?.data?.reason}`)

        }
      }
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
            <Button  type="submit" color='#EE0202' radius={'md'}>
                Modifier
            </Button>
        </Group>
        </form>
        </>
    );
}

export default EditAccountForm;