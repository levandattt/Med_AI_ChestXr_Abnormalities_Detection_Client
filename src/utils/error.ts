import { notificationShow } from '../components/Notification';

type ErrorObject = {
    code: string;
    message: string;
    response: {
        status: number;
        data: {
            error: string;
        };
    };
};

export const handleGlobalException = (
    error: ErrorObject,
    customError: () => void,
) => {
    if (error.code === 'ERR_NETWORK') {
        notificationShow('error', 'Error!', error.message);
    } else if ([401, 403, 404, 500].includes(error.response.status)) {
        notificationShow('error', 'Error!', error.response.data.error);
    } else {
        customError();
    }
};