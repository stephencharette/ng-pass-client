/**
 * Ensures that the key of a route is a valid property defined on the route class.
 * This ensures strong typing for route retrieval.
 */
export type RouteKey<T> = {
    [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];