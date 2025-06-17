import { Injectable } from '@angular/core';
import { RouteConstants } from '../../../../../core/constants/routes';
import { environment } from '../../../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SecretUrlService {
    constructor() { }

    getFullRevealUrl(guid: string): string {
        const route = RouteConstants.Secret.getFullRouteWithId('reveal', guid);
        
        return `${environment.clientUri}${route}`;
    }
}
