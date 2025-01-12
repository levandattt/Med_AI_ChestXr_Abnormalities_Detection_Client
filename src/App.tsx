import React from 'react';
import Routes from './routes';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import './App.css';
import { ToastContainer } from 'react-toastify';

function App() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <ToastContainer />
            <Routes />
        </QueryClientProvider>
    );
}

export default App;
