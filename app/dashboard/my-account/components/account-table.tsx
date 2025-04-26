'use client';
import { IconTrash, IconEdit } from '@tabler/icons-react';
import { Table, ScrollArea, ActionIcon, Group  } from '@mantine/core';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from 'react';

// const elements = [
//   { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
//   { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
//   { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
//   { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
//   { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
// ];

export default function AccountTable({onDelete, onEdit, elements}: {elements: any, onDelete?: () => void, onEdit?: () => void}) {
  return (
    <ScrollArea type="auto" style={{ width: '100%', borderRadius: 8 }}>
      <Table
        verticalSpacing="md"
        highlightOnHover
        style={{
          width: '100%',
          borderCollapse: 'separate',
          borderSpacing: '0 8px', 
          textAlign: 'center', 

        }}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th
              style={{
                backgroundColor: '#f8f9fa',
                padding: 5,
                borderTopLeftRadius: 8,
                textAlign: 'center'
              }}
            >
              Name
            </Table.Th>
            <Table.Th style={{ backgroundColor: '#f8f9fa', padding: 5, textAlign: 'center' }}>
              Email
            </Table.Th>
            <Table.Th style={{ backgroundColor: '#f8f9fa', padding: 5, textAlign: 'center' }}>
              Role
            </Table.Th>
            <Table.Th
              style={{
                backgroundColor: '#f8f9fa',
                padding: 5,
                borderTopRightRadius: 8,
                textAlign: 'center'
              }}
            >
              
            </Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {elements?.map((element: { name: boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | Key | null | undefined; address: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; manager: { name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }; }) => (
            <Table.Tr
            //@ts-ignore
              key={element?.name}
              style={{
                backgroundColor: 'white',
                borderRadius: 8,
                // boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <Table.Td style={{ padding: 8 }}>{element?.name}</Table.Td>
              <Table.Td style={{ padding: 8 }}>{element?.address}</Table.Td>
              <Table.Td style={{ padding: 8 }}>{element?.manager?.name}</Table.Td>
              <Table.Td style={{ padding: 8 }}>
                <Group justify='center'>
                  <ActionIcon 
                  //@ts-ignore
                    onClick={() => onEdit(element)} variant="subtle" aria-label="Edit">
                    <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
                  </ActionIcon>
                  <ActionIcon 
                  //@ts-ignore
                    onClick={() => onDelete(element)} color="#EE0202" variant="subtle" aria-label="Delete">
                    <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
                  </ActionIcon>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}