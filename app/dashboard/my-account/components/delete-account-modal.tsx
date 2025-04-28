"use client"
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group } from '@mantine/core';
//@ts-ignore
import Cookies from 'js-cookie';
import useOtherStore from '@/stores/clientStore';
import { useState } from 'react';
import { success_notification, error_notification } from '../../utils/notification-center';
export default function DeleteClientModal({opened, close, item}: any) {
  const { fetchClients, deleteClient } = useOtherStore();
  const token = Cookies.get('auth_token');
  const [loading, setLoading] = useState(false)
  
  const handleDelete = async () => {
    try{
      setLoading(true)
      await deleteClient(item?.id, token)
      setLoading(false)
      success_notification("Suppression d'entreprise", "Entreprise supprimer avec succès")
    }catch(error){
      setLoading(false)
      close()
            //@ts-ignore
      error_notification("Suppression d'entreprise", `${error?.response?.data?.reason}`)
    }
  }
  return (
    <>
      <Modal opened={opened} onClose={close} title="Supprimer ce sous-compte">
        {/* Modal content */}
        <p> Voulez vous continuer ? </p>
        <Group grow gap={5} mt="md">
            <Button variant="outline" color="red" onClick={close}>
                Annuler
            </Button>
            <Button loading={loading} color='#EE0202' variant="filled" onClick={handleDelete}>
                Supprimer
            </Button>
        </Group>
      </Modal>

    </>
  );
}