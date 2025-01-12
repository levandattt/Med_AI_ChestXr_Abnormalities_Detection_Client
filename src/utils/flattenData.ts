import {convertTimestamp2Date} from "./time";

export const fetchStudy2Table = (data: any[]) => {
    return data.map(item => ({
        ...item,
        StudyDate: convertTimestamp2Date(item.StudyDate),
        PatientName: item.PatientName?._components?.[0] || item.PatientName?.original_string || '',
    }));
};