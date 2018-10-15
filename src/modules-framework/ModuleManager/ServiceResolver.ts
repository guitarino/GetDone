import getDecorators from "inversify-inject-decorators";
import { Container } from "inversify";
import { serviceTypes } from "./ServiceTypes";

export enum LifetimeScope {
    Singleton,
    Transient
}

export type TRegistration = (serviceResolver: Container) => void;
export const serviceResolver = new Container();
export function registerAppModule(registration: TRegistration): void {
    registration(serviceResolver);
}

export const { lazyMultiInject } = getDecorators(serviceResolver);

// -------------------------------

export function RegisterType<T>(
    serviceResolver: Container,
    typeName: string,
    typeClass: new (...args: any[]) => T,
    lifetimeScope: LifetimeScope = LifetimeScope.Transient
) {
    serviceResolver.bind<T>(typeName).to(typeClass);
    if (typeName in serviceTypes) {
        for (let i = 0; i < serviceTypes[typeName].length; i++) {
            const implTypeName = serviceTypes[typeName][i];
            if (lifetimeScope == LifetimeScope.Singleton) {
                serviceResolver.bind<T>(implTypeName).to(typeClass).inSingletonScope();
            }
            else {
                serviceResolver.bind<T>(implTypeName).to(typeClass);
            }
        }
    }
}