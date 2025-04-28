"use client"
import { IconAt, IconPhoneCall } from '@tabler/icons-react';
import { Avatar, Group, Skeleton, Text } from '@mantine/core';
// import classes from './UserInfoIcons.module.css';
import useStore from '@/stores/store';
import { useState, useEffect } from 'react';

export function UserInfoIcons() {
  const user = useStore(state => state.user);
  const [parsedUser, setUser] = useState()
  useEffect(() =>{
    
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

          {
            user?.name ? 
            <Text fz="lg" fw={500} className={"classes.name"}>
            {user?.name}
          </Text> : <Skeleton h={18} w={100}  />
          }

          <Group wrap="nowrap" gap={10} mt={3}>
            <IconAt stroke={1.5} size={16} className={"classes.icon"} />
            {
              user?.email ?
              <Text fz="xs" c="dimmed">
            {user?.email}
            </Text> : <Skeleton h={13} w={100}  />
            }
          </Group>

          <Group wrap="nowrap" gap={10} mt={5}>
            <IconPhoneCall stroke={1.5} size={16} className={"classes.icon"} />
            {
              user?.phone ?
              <Text fz="xs" c="dimmed">
              {user?.phone}
            </Text> : <Skeleton h={13} w={100}  />
            }
          </Group>
        </div>
      </Group>
    </div>
  );
}