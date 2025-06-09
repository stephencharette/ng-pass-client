import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import {
    Observable,
    catchError,
    from,
    lastValueFrom,
    throwError,
} from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '@auth0/auth0-angular';
import { SnackBarService } from '../services/snack-bar/snack-bar.service';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
    private readonly baseApiUrl = environment.apiUri;
    constructor(
        private readonly auth0Service: AuthService,
        private readonly snackBarService: SnackBarService,
    ) {}

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        if (this.isApiRequest(request.url)) {
            return from(this.handleApiRequest(request, next));
        }

        return next
            .handle(request)
    }

    /**
     * Handles the coordination API request by adding the base URL and the bearer token.
     * @param request the request to handle
     * @param next the next handler to call
     * @returns the response from the request
     */
    async handleApiRequest(
        request: HttpRequest<any>,
        next: HttpHandler,
    ) {
        const token = await this.getAuthBearerToken();
        const apiRequest = request.clone({
            url: `${this.baseApiUrl}/${request.url}`,
            headers: request.headers
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`),
        });

        return lastValueFrom(
            next.handle(apiRequest).pipe(
                catchError((error) => {
                    this.handleErrorAlert(error);
                    return throwError(error);
                }),
            ),
        );
    }

    private handleErrorAlert(response: HttpErrorResponse): void {
        this.snackBarService.openSnackBar('An error occured', 'Close', { duration: 3000 });
    }

    /**
     * Returns whether the URL is a coordination API request.
     * @param url the url to check
     * @returns true if the url is a coordination API request, false otherwise
     */
    private isApiRequest(url: string): boolean {
        return url.startsWith('api/');
    }

    /**
     * Gets the Auth0 Bearer token from the Auth0 service.
     * @returns either the token or an error if the token is not found
     */
    public async getAuthBearerToken(): Promise<any> {
        return new Promise<string>((resolve, reject) => {
            this.auth0Service.idTokenClaims$.subscribe((claims) => {
                if (claims && claims.__raw) {
                    resolve(claims.__raw);
                } else {
                    reject(new Error('Bearer token not found'));
                }
            });
        });
    }
    /* eslint-enable  @typescript-eslint/no-explicit-any */
}
