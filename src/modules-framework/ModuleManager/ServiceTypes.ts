let typeId = 0;
export const serviceTypes: {[key: string]: string[]} = {};
export function Type(
    ...implementations: string[]
): string {
    const typeName = `type${typeId}`;
    typeId++;
    serviceTypes[typeName] = implementations;
    return typeName;
}