import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<T> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((data) => {
        const responseData = data === null || data === undefined ? {} : data;
        const message = this.getResponseMessage(statusCode);
        const finalMeesage = responseData.message || message;
        const finalStatus2 = responseData.status || statusCode;

        if (responseData.message) {
          delete responseData.message;
          delete responseData.stauts;
        }

        return {
          statusCode: finalStatus2,
          message: finalMeesage,
          data: responseData,
        };
      })
    );
  }

  private getResponseMessage(statusCode: number) {
    switch (statusCode) {
      case HttpStatus.OK:
        return "Request success";
      case HttpStatus.CREATED:
        return "Resource created";
      default:
        return "Request success";
    }
  }
}
