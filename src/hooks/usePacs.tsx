import {useMutation, useQuery} from '@tanstack/react-query';
import apiClient from "../utils/apiClient";
import {AxiosError} from "axios"; // Add AxiosError import
import {REQUEST_STUDY, UPLOAD_STUDY} from "../constants/apis";
import {useEffect, useState} from "react";

interface ApiResponse {
    data:{
        status: "success" | "error";
        message?: string;
        data: [];
    }
}

function usePacs() {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [uploadProgress, setUploadProgress] = useState<number>(0); // Thêm state cho tiến trình


    const fetchStudy = useQuery<ApiResponse, AxiosError>({ // Add error type here
        queryKey: ['get-study'],
        queryFn: () => {
            // const params: { [key: string]: number | string } = {};
            return apiClient.get(REQUEST_STUDY);
        },
        enabled: false,
    });

    useEffect(() => {
        fetchStudy.refetch();
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
        loading: fetchStudy.isLoading,
        data: fetchStudy.data?.data,
        fetchStudy,
        isUploading,
        uploadError,
        uploadFiles: uploadFiles.mutateAsync,
        uploadedFiles,
        uploadProgress,
    };
}

export default usePacs;