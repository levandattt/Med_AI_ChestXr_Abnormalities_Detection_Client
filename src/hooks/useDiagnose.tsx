import {useMutation, useQuery} from '@tanstack/react-query';
import apiClient from "../utils/apiClient";
import {AxiosError} from "axios"; // Add AxiosError import
import {GET_PREDICT} from "../constants/apis";
import {useEffect} from "react";

interface ApiResponse {
    data:{
        status: "success" | "error";
        message?: string;
        data:{
                dicomOriginal:{
                    "image":string,
                    "metadata":{
                        PatientID: string;
                        StudyInstanceUID: string;
                        SeriesInstanceUID: string;
                    }

                };
                dicomPredict:{
                    "image":string,
                    "metadata":{
                        PatientID: string;
                        StudyInstanceUID: string;
                        SeriesInstanceUID: string;
                    }
                }
        }
    }
}

function useDiagnose(
    patientID: string,
    studyInstanceUID: string,
    seriesInstanceUID: string
) {
    const diagnose = useQuery<ApiResponse, AxiosError>({ // Add error type here
        queryKey: ['get-diagnose'],
        queryFn:async () => {
            console.log("Calling API");
            return apiClient.get(GET_PREDICT,
                {
                    params: {
                        patientID,
                        studyInstanceUID,
                        seriesInstanceUID
                    }
                }

            );
            // const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

            // await delay(2000);
            // return {
            //     data: {
            //         "status": "success",
            //         "data": {
            //             "dicomOriginal":{
            //                 "image":"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-photos%2Fpicture&psig=AOvVaw2CSs787WZyc-1z0HaldgF0&ust=1736943077868000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIi7_quX9YoDFQAAAAAdAAAAABAT",
            //                 "metadata": {
            //                     "PatientID": "123",
            //                     "StudyInstanceUID": "123",
            //                     "SeriesInstanceUID": "123"
            //                 }
            //             },
            //             "dicomPredict": {
            //                 "image":"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-photos%2Fpicture&psig=AOvVaw2CSs787WZyc-1z0HaldgF0&ust=1736943077868000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIi7_quX9YoDFQAAAAAdAAAAABAT",
            //                 "metadata": {
            //                     "PatientID": "123",
            //                     "StudyInstanceUID": "123",
            //                     "SeriesInstanceUID": "123"
            //                 }
            //             }
            //         },
            //         "message": "Predicted successfully"
            //     }
            // }
        },
        enabled: false,
    });

    useEffect(() => {
        diagnose.refetch();
    }, [patientID, studyInstanceUID, seriesInstanceUID]);

    return {
        isLoading: diagnose.isLoading,
        data: diagnose.data?.data,
        diagnose,
    };
}

export default useDiagnose;