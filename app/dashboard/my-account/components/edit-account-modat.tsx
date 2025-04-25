"use client"
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group } from '@mantine/core';
import EditAccountForm from './edit-account-form';

export default function EditClientModal({opened, close, item, updateClient}: any) {
  

  return (
    <>
      <Modal opened={opened} onClose={close} title="Supprimer ce sous-compte">
        {/* Modal content */}
        <p> Vouler vous continuer ? </p>
        <EditAccountForm 
            close = {close}
            item = {item}
        />
      </Modal>

    </>
  );
}