export const fetchStudy2Table = (data: any[]) => {
    return data.map(item => ({
        ...item,
        PatientName: item.PatientName?._components?.[0] || item.PatientName?.original_string || '',
    }));
};