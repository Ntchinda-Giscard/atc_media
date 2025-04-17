import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';


function Providers({ children }: { children: React.ReactNode }) {


    return ( 
        <>AbstractRange
            <MantineProvider>{children}</MantineProvider>
        </> 
    );
}

export default Providers;