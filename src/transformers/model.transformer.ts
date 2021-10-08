import { Provider, Inject } from '@nestjs/common';
import { getModelForClass } from '@typegoose/typegoose';

import { Connection } from 'mongoose';

import {
  DB_CONNECTION_TOKEN,
  DB_MODEL_TOKEN_SUFFIX,
} from '../constants/system.constant';

export interface TypegooseClass {
  new (...args: any[]);
}

export function getModelToken(modelName: string): string {
  return modelName + DB_MODEL_TOKEN_SUFFIX;
}

// according to Class Obtain Provider
export function getProviderByTypegooseClass(
  typegooseClass: TypegooseClass,
): Provider {
  return {
    provide: getModelToken(typegooseClass.name),
    useFactory: (connection: Connection) =>
      getModelForClass(typegooseClass, { existingConnection: connection }),
    inject: [DB_CONNECTION_TOKEN],
  };
}

// Model Injector
export function InjectModel(model: TypegooseClass) {
  return Inject(getModelToken(model.name));
}
