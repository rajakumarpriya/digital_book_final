import { AuthorDetils } from "./athor.details.model";

export class BaseResponse {
    public statusCode: number;
    public statusMessage: string;
    public authorDetails: AuthorDetils;
}