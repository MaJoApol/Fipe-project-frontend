export default interface IError {
    response: {
        data: {
            error: {
                name: string;
                message: string;
                statusCode: number;
                context?: string;
            }       
        }
    };
}
