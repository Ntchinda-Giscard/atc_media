'use client';
import { Tabs } from '@mantine/core';
import { SetStateAction, useState } from 'react';
import SettingsForm from './components/settings-form';

export default function SettingsPage() {
  const [form, setForm] = useState({
    name: 'GMP TEST',
    email: 'gmptest@gmail.com',
    phone: '+XXX XXX XXX XXX',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    language: 'Français',
    timezone: 'UTC+1 (Europe/Paris)',
  });
  const [tabs, setTabs] = useState("first")
  const tabStyle = {
    tabLabel: {
      color: "#EE0202",
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-700 flex items-center gap-2">
        <span className="text-blue-500 text-3xl">👤</span> Mon Compte
      </h1>

        <Tabs 
          defaultValue="first" 
          color="#EE0202"
          onChange={(value) => setTabs(value || "first")}
          // styles={tabStyle}
        >
          <Tabs.List grow>
            <Tabs.Tab value="first">⚙️ PARAMÈTRES</Tabs.Tab>
            <Tabs.Tab value="second">👥 SOUS-COMPTES</Tabs.Tab>
            <Tabs.Tab value="third">🔒 PROTECTION DES DONNÉES</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="first">
            <SettingsForm />
          </Tabs.Panel>

          <Tabs.Panel value="second">
            Messages tab content
          </Tabs.Panel>

          <Tabs.Panel value="third">
            Settings tab content
          </Tabs.Panel>
      </Tabs>
    </div>
  );
}
