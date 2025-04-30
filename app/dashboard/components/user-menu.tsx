import { IconChevronRight } from '@tabler/icons-react';
import { Avatar, Group, Text, UnstyledButton } from '@mantine/core';

export function TopUserButton({name, email}: {name: string, email: string}) {
  return (
    <UnstyledButton>
      <Group>
        <Avatar
            name = {name}
          radius="xl"
          color='initials'
        />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {name}
          </Text>

          <Text c="dimmed" size="xs">
            {email}
          </Text>
        </div>

        <IconChevronRight size={14} stroke={1.5} />
      </Group>
    </UnstyledButton>
  );
}