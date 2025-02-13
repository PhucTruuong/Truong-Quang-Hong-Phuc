export class ErrorResponse {
    statusCode: number;
    timestamp: string;
    data: {
        message: string;
        error: string;
        statusCode: number;
    };

    constructor(statusCode: number, message: string, error: string) {
        this.statusCode = statusCode;
        this.timestamp = new Date().toISOString();
        this.data = {
            message,
            error,
            statusCode,
        };
    }
}

export const createErrorResponse = (statusCode: number, message: string, error: string) => {
    return {
        statusCode,
        timestamp: new Date().toISOString(),
        message,
        error
    };
};


