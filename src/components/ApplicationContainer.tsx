import {ReactNode} from 'react';
import {AppShell, Footer, Group, Header, Text} from '@mantine/core';
import {useMediaQuery} from "@mantine/hooks";

export function ApplicationContainer(props: { children: ReactNode, header: ReactNode, footer: ReactNode }) {
    const matches = useMediaQuery('(min-width: 500px)');

    return (
        <AppShell
            styles={{
                main: {
                    background: '#FFF',
                    width: '100vw',
                },
            }}
            fixed
            header={
                <Header height={matches ? 70 : 120} p="lg">
                    {props.header}
                </Header>
            }
            footer={
                <Footer height={60} p="md">
                    {props.footer}
                </Footer>
            }
        >
            {props.children}
        </AppShell>
    );
}
