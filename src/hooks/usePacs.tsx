import {useMutation, useQuery} from '@tanstack/react-query';
import apiClient from "../utils/apiClient";
import {AxiosError} from "axios"; // Add AxiosError import
import {GET_DICOM_LIST, UPLOAD_STUDY} from "../constants/apis";
import {useEffect, useState} from "react";

interface ApiResponse {
    data:{
        status: "success" | "error";
        message?: string;
        data: any[];
    }
}

function usePacs(
    patientID?: string,
    queryRetrieveLevel: string = "STUDY",
    studyInstanceUID?: string,
    seriesInstanceUID?: string
) {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [uploadProgress, setUploadProgress] = useState<number>(0); // Thêm state cho tiến trình


    const fetchDicom = useQuery<ApiResponse, AxiosError>({ // Add error type here
        queryKey: ['get-dicom-list'],
        queryFn: () => {
            const params: { [key: string]: number | string } = {};
            if (patientID) {
                params.patientID = patientID;
            }
            if (queryRetrieveLevel) {
                params.queryRetrieveLevel = queryRetrieveLevel;
            }
            if (studyInstanceUID) {
                params.studyInstanceUID = studyInstanceUID;
            }
            if (seriesInstanceUID) {
                params.seriesInstanceUID = seriesInstanceUID;
            }
            return apiClient.get(
                GET_DICOM_LIST,
                {
                    params
                }
            );
        },
        enabled: false,
    });

    useEffect(() => {
        fetchDicom.refetch();
    },[]);

    const uploadFiles = useMutation(async (files: File[]) => {
            const formData = new FormData();
            files.forEach((file) => {
                formData.append("files", file);
            });

            const response = await apiClient.post(UPLOAD_STUDY, formData, {
                headers: {
                    "Content-Type"  : "multipart/form-data",
                },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                        setUploadProgress(progress);
                    }
                },
            });

            return response.data;
        },{
            onMutate: () => {
                setIsUploading(true);
                setUploadProgress(0);
            },
            onError: (error: AxiosError) => {
                setUploadError(error.message);
                setIsUploading(false);
            },
            onSuccess: (data) => {
                setUploadedFiles(data.files); // Cập nhật dữ liệu nếu cần
                setIsUploading(false);
            },
            onSettled: () => {
                // Reset hoặc xử lý bất kỳ công việc cần thiết sau khi mutation kết thúc
            },
        }
    )

    return {
        loading: fetchDicom.isLoading,
        data: fetchDicom.data?.data,
        fetchDicom,
        isUploading,
        uploadError,
        uploadFiles: uploadFiles.mutateAsync,
        uploadedFiles,
        uploadProgress,
    };
}

export default usePacs;