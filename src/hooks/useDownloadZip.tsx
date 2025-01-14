import { useState } from 'react';
import axios from 'axios';
import {GET_STUDY_COMPRESS, ROOT_API} from "../constants/apis";

type UseDownloadZipResult = {
    isExportLoading: boolean;
    data: Blob | null;
    error: string | null;
    fetchZip: (params?: Record<string, string>) => Promise<void>;
};

export const useDownloadZip = (): UseDownloadZipResult => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Blob | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchZip = async (params?: Record<string, string>) => {
        setLoading(true);
        setError(null);
        console.log("params",params);
        try {
            const response = await axios.get(`${ROOT_API}${GET_STUDY_COMPRESS}`, {
                params:{
                    patientID: params?.patientID,
                    studyInstanceUID: params?.studyInstanceUID,
                },
                responseType: 'blob',
            });

            const blob = response.data;
            setData(blob);
            const contentDisposition = response.headers['content-disposition'];
            console.log(response)
            const fileName = contentDisposition
                ? contentDisposition.split('filename=')[1] : 'download.zip';
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob); // Tạo URL từ Blob
            link.download = fileName; // Gắn tên file
            document.body.appendChild(link);
            link.click(); // Kích hoạt tải xuống
            document.body.removeChild(link);

            console.log("Dowload ")

        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Unknown error occurred');

            console.log("errorrrrrr")
        } finally {
            console.log("finaly")

            setLoading(false);
        }
    };

    return {
        isExportLoading:loading,
        data,
        error,
        fetchZip
    };
};
