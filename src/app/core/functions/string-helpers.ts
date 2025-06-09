export function isFalsyOrWhitespace(input: string | null | undefined): boolean {
    return !input || input.trim() === '';
}

/**
 * A strongly-typed way to get a property of a class.
 * @param name of the property.
 * @returns name of the property.
 */
export const nameOf = <T>(name: Extract<keyof T, string>): string => name;

/**
 * A strongly-typed way to get the name of a class.
 * @returns The name of the class.
 */
export function nameOfClass<T>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    classConstructor: new (...args: any[]) => T,
): string {
    return classConstructor.name;
}

/**
 * Tries to parse a string to a number.
 * @param value
 * @returns The number or null if the value is not a number.
 */
export function tryParseToNumber(
    value: string | null | undefined,
): number | null {
    if (isFalsyOrWhitespace(value)) {
        return null;
    }

    const num = Number(value);
    return isNaN(num) ? null : num;
}
