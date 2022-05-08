import {ReactNode} from 'react';
import {AppShell, Center, Footer, Group, Header, Text} from '@mantine/core';

export function ApplicationContainer(props: { children: ReactNode, header: ReactNode }) {
    return (
        <AppShell
            styles={{
                main: {
                    background: '#FFF',
                    width: '100vw',
                },
            }}
            fixed
            footer={
                <Footer height={60} p="md">
                    <Group position="apart">
                        <Text size="sm">
                            <span style={{fontWeight: 'bolder'}}>Last Time:</span> 0h 25m 🍫
                        </Text>
                        <Text size="sm">
                            <span style={{fontWeight: 'bolder'}}>🎉 End Time:</span> 7:51 pm
                        </Text>
                    </Group>
                </Footer>
            }
            header={
                <Header height={90} p="lg">
                    {props.header}
                </Header>
            }
        >
            {props.children}
        </AppShell>
    );
}
