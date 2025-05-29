import { HttpStatus } from "@nestjs/common";
import { now } from "../utils/date";
import dayjs from "dayjs";

export class ResponseDto {
  data: object;
  success: boolean;
  message: string[];
}

export class ErrorResponseDto {
  code: string;
  httpStatus: HttpStatus;
  description: string;
  timestamp: dayjs.Dayjs;
  data: any;
  path: string;

  constructor(code: string, httpStatus: HttpStatus, description: string, data?: any) {
    this.code = code;
    this.httpStatus = httpStatus;
    this.description = description;
    this.timestamp = now()
    this.data = {...data};
  }
}

export class MetaDataResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export class SchemaResponse<T> {
  success: boolean;
  message: string;
  data: T | T[];
  meta: MetaDataResponse;

  constructor(data: T | T[], meta: MetaDataResponse = undefined, message: string = 'SUCCESS', success: boolean = true) {
    this.data = data;
    this.meta = meta;
    this.message = message;
    this.success = success;
  }
}