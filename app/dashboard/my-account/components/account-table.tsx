'use client';
import { IconTrash, IconEdit } from '@tabler/icons-react';
import { Table, ScrollArea, ActionIcon, Group  } from '@mantine/core';

const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

export default function AccountTable({onDelete, onEdit}: {onDelete?: () => void, onEdit?: () => void}) {
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
              Element position
            </Table.Th>
            <Table.Th style={{ backgroundColor: '#f8f9fa', padding: 5, textAlign: 'center' }}>
              Element name
            </Table.Th>
            <Table.Th style={{ backgroundColor: '#f8f9fa', padding: 5, textAlign: 'center' }}>
              Symbol
            </Table.Th>
            <Table.Th style={{ backgroundColor: '#f8f9fa', padding: 5, textAlign: 'center' }}>
              Action
            </Table.Th>
            <Table.Th
              style={{
                backgroundColor: '#f8f9fa',
                padding: 5,
                borderTopRightRadius: 8,
                textAlign: 'center'
              }}
            >
              Atomic mass
            </Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {elements.map((element) => (
            <Table.Tr
              key={element.name}
              style={{
                backgroundColor: 'white',
                borderRadius: 8,
                // boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <Table.Td style={{ padding: 8 }}>{element.name}</Table.Td>
              <Table.Td style={{ padding: 8 }}>{element.symbol}</Table.Td>
              <Table.Td style={{ padding: 8 }}>{element.position}</Table.Td>
              <Table.Td style={{ padding: 8 }}>{element.mass}</Table.Td>
              <Table.Td style={{ padding: 8 }}>
                <Group justify='between'>
                  <ActionIcon 
                  //@ts-ignore
                    onClick={() => onEdit()} variant="subtle" aria-label="Edit">
                    <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
                  </ActionIcon>
                  <ActionIcon 
                  //@ts-ignore
                    onClick={() => onDelete()} color="#EE0202" variant="subtle" aria-label="Delete">
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