import { Observable } from 'rxjs';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UtilService } from '../utils/util.service';

@Injectable()
export class RtTokenGuard implements CanActivate {
  constructor(private readonly utilService: UtilService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const cookies = request.cookies;

    const isValidRT = this.utilService.verifyRefreshToken(
      cookies.refresh_token,
    );

    if (!isValidRT) {
      return false;
    } else {
      return true;
    }
  }
}
