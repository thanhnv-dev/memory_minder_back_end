import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const dateTime = new Date().toString();
    const logData = {
      [dateTime]: {
        Method: req.method,
        Url: req.baseUrl,
      },
    };

    console.log('============================================================');
    console.table(logData);
    console.table(req.body);
    console.log('============================================================');
    next();
  }
}
