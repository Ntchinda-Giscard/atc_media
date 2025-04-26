"use client"
import { IconAt, IconPhoneCall } from '@tabler/icons-react';
import { Avatar, Group, Text } from '@mantine/core';
// import classes from './UserInfoIcons.module.css';
import useStore from '@/stores/store';
import { useState, useEffect } from 'react';

export function UserInfoIcons() {
  const user = useStore(state => state.user);
  const [parsedUser, setUser] = useState()
  useEffect(() =>{
    // const user = localStorage.getItem('user')
    if (user) {
        const parseduser = JSON.parse(user)
        setUser(parseduser)
        console.log('User zustand:', user)

        console.log("Username", parseduser?.name)
        // setUser(parsedUser)
      }
    
}, [])
  return (
    <div>
      <Group wrap="nowrap">
        <Avatar
          name={user?.name}
          color='initials'
          src=""
          size={94}
          radius="md"
        />
        <div>
          <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
            {user?.roles?.[0]?.name}
          </Text>

          <Text fz="lg" fw={500} className={"classes.name"}>
            {user?.name}
          </Text>

          <Group wrap="nowrap" gap={10} mt={3}>
            <IconAt stroke={1.5} size={16} className={"classes.icon"} />
            <Text fz="xs" c="dimmed">
            {user?.email}
            </Text>
          </Group>

          <Group wrap="nowrap" gap={10} mt={5}>
            <IconPhoneCall stroke={1.5} size={16} className={"classes.icon"} />
            <Text fz="xs" c="dimmed">
              {user?.phone}
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  );
}