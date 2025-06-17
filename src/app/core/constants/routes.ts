import { RouteKey } from "../models/route-key";

class SecretRoutes {
    static readonly rootUrl = 'secrets';
    static readonly secretIdParameter = ':id';

    static readonly new = 'new'; 
    static readonly reveal = `${this.secretIdParameter}/reveal`;

    /**
     * Constructs a full route when the route does not require an application ID.
     * @param route
     * @returns A navigable URL string for the specified route.
     */
    static getFullRoute(route: RouteKey<typeof SecretRoutes>) {
        return `/${this.rootUrl}/${SecretRoutes[route]}`;
    }

    static getFullRouteWithId(route: RouteKey<typeof SecretRoutes>, secretId: string) {
        return `/${this.rootUrl}/${SecretRoutes[route].replace(this.secretIdParameter, secretId)}`;
    }
}

export const RouteConstants = {
    Secret: SecretRoutes
};