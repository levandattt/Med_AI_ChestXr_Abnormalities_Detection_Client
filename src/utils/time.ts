export const convertTimestamp2Date = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
    return formattedDate;
}

export const convertPacDateTime = (date: string, time: string) => {
        let result = {
            year: '____',
            month: '__',
            day: '__',
            hours: '__',
            minutes: '__',
            seconds: '__'
        }
        if (date){
            result.year = date.slice(0, 4) || '____';
            result.month = date.slice(4, 6) || '__';
            result.day = date.slice(6, 8) || '__';
        }
        if (time){
            result.hours = time.slice(0, 2) || '__';
            result.minutes = time.slice(2, 4) || '__';
            result.seconds = time.slice(4, 6) || '__';
        }

        return `${result.year}-${result.month}-${result.day} ${result.hours}:${result.minutes}:${result.seconds}`;
}