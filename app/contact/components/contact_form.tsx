"use client";
import { Button, Checkbox, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function ContactForm() {
  const input_style = {
    input: {
      borderBottom: '1px solid #E4E4E4',
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
      <div className="flex flex-col gap-4">
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
      </div>
      

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
