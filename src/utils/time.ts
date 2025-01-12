export const convertTimestamp2Date = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
    return formattedDate;
}