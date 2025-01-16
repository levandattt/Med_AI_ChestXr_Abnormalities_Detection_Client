import {useMutation, useQuery} from '@tanstack/react-query';
import apiClient from "../utils/apiClient";
import {AxiosError} from "axios"; // Add AxiosError import
import {GET_IMAGE} from "../constants/apis";
import {useEffect} from "react";

interface ApiResponse {
    data:{
        status: "success" | "error";
        message?: string;
        data:{
            "image":string,
        }
    }
}

function useFetchImage(
    patientID: string,
    studyInstanceUID: string,
    seriesInstanceUID: string
) {
    const fetchImage = useQuery<ApiResponse, AxiosError>({ // Add error type here
        queryKey: ['get-diagnose'],
        queryFn:async () => {
            console.log("Calling API");
            return apiClient.get(GET_IMAGE,
                {
                    params: {
                        patientID,
                        studyInstanceUID,
                        seriesInstanceUID
                    }
                }
            );
        },
        enabled: false,
    });

    useEffect(() => {
        fetchImage.remove()
        fetchImage.refetch();
    }, [patientID, studyInstanceUID, seriesInstanceUID]);

    return {
        isLoading: fetchImage.isLoading,
        data: fetchImage.data?.data,
        fetchImage,
    };
}

export default useFetchImage;