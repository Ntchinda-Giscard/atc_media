"use client";
import { Checkbox, Group, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Button } from "@/components/ui/button"

export default function ContactForm() {
  const input_style = {
    input: {
      borderBottom: '1px solid #E4E4E4',
      borderWidth: '0px 0px 1px 0px',
    },
    label:{
      color: "#414141",
      fontSize: 'x-small',
    }
  }
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      termsOfService: false,
    },

    validate: {
      lastname: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      firstname: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      phone: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <p> 📧 Formulaire de Contact </p>
      <div className="flex flex-col gap-3">
        <div className='flex flex-row justify-between gap-4'>

          <TextInput
            w={"100%"}
            variant='unstyled'
            styles={input_style}
            radius={0}
            withAsterisk
            label="Prénom"
            placeholder="John"
            key={form.key('lastname')}
            {...form.getInputProps('email')}
          />
          <TextInput
            w={"100%"}
            variant='unstyled'
            radius={0}
            styles={input_style}
            withAsterisk
            label="Nom"
            placeholder="Doe"
            key={form.key('firstname')}
            {...form.getInputProps('firstname')}
          />
        </div>
        <div className='flex flex-row justify-between gap-4'>

          <TextInput
            w={"100%"}
            variant='unstyled'
            radius={0}
            styles={input_style}
            withAsterisk
            label="Adresse mail"
            placeholder="your@email.com"
            key={form.key('email')}
            {...form.getInputProps('email')}
          />
          <TextInput
            w={"100%"}
            variant='unstyled'
            radius={0}
            styles={input_style}
            withAsterisk
            label="Numéro de téléphone"
            placeholder="[xxx]xxxxxxxx"
            key={form.key('phone')}
            {...form.getInputProps('phone')}
          />
        </div>
        <p className="text-sm text-stone-600"> Sujet </p>
        <div className='flex flex-row justify-between'>
          <Checkbox size={'10'} color={'#414141'} radius={'lg'} styles={{label:{fontSize: 'smaller'}}} label="Assistance technique"/>
          <Checkbox size={'10'} color={'#414141'} radius={'lg'} styles={{label:{fontSize: 'smaller'}}} label="Facturation"/>
          <Checkbox size={'10'} color={'#414141'} radius={'lg'} styles={{label:{fontSize: 'smaller'}}} label="Partenariat"/>
          <Checkbox size={'10'} color={'#414141'} radius={'lg'} styles={{label:{fontSize: 'smaller'}}} label="Autre"/>

        </div>
        <Textarea
          size="md"
          styles={input_style}
          label="Votre message"
          placeholder=""
          radius={0}
        />
      </div>
      

      <Group justify="flex-start" mt="md">
        {/* <Button color='#EE0202' size='compact-md' type="submit">Envoyer votre message</Button> */}
        <Button 
          type="submit" 
          className="w-full bg-red-600 hover:bg-transparent hover:text-inherit hover:shadow-none hover:ring-2">
          Envoyer votre message
        </Button>
      </Group>
    </form>
  );
}
