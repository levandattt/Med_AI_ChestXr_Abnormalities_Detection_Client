import { Notification } from '../components/Notification';

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
        Notification.error('Network error!');
    } else if ([401, 403, 404, 500].includes(error.response.status)) {
        Notification.error(error.response.data.error);
    } else {
        customError();
    }
};