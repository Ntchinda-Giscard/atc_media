"use client";
import { useForm } from '@mantine/form';
import { Button, Select, Group, TextInput } from '@mantine/core';


function AddAccountForm() {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          email: '',
          name: '',
          role: [],
        },
    
        validate: {
          email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
      });
    return ( 
        <>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
                <Select
                    radius="md"
                    w={'100%'}
                    data={[]}
                    label="Rôle"
                    placeholder=""
                    key={form.key('role')}
                    {...form.getInputProps('role')}
                />  
            </div>

            <Group justify="flex-start" mt="md">
                <Button type="submit" color='#EE0202' radius={'md'} > Ajouter </Button>
            </Group>
        </form>
        </>
    );
}

export default AddAccountForm;