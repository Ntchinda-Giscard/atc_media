import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group } from '@mantine/core';

export default function DeleteClientModal({opened, close}: any) {
  

  return (
    <>
      <Modal opened={opened} onClose={close} title="Supprimer ce sous-compte">
        {/* Modal content */}
        <p> voule vous continuer ? </p>
        <Group grow gap={5} mt="md">
            <Button variant="outline" color="red" onClick={close}>
                Annuler
            </Button>
            <Button variant="filled" color="red" onClick={close}>
                Supprimer
            </Button>
        </Group>
      </Modal>

    </>
  );
}