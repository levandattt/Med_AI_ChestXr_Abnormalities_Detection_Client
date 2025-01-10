import React from 'react';
import Routes from './routes';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import './App.css';

function App() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <Routes />
        </QueryClientProvider>
    );
}

export default App;
