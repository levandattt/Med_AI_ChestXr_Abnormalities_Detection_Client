import {  useQuery } from '@tanstack/react-query';
import apiClient from "../utils/apiClient";
import {AxiosError} from "axios"; // Add AxiosError import
import {REQUEST_STUDY} from "../constants/apis";

interface ApiResponse {
    data:{
        status: "success" | "error";
        message?: string;
        data: [];
    }
}

function usePacs() {
    const fetchStudy = useQuery<ApiResponse, AxiosError>({ // Add error type here
        queryKey: ['get-study'],
        queryFn: () => {
            // const params: { [key: string]: number | string } = {};
            return apiClient.get(REQUEST_STUDY);
        },
        enabled: false,
    });
    return {
        loading: fetchStudy.isLoading,
        data: fetchStudy.data?.data,
        fetchStudy,
    };
}

export default usePacs;