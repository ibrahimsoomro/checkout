import { IEventBus as IBaseEventBus } from "@shared/application/events";

export interface IApplicationEvents {}

export type IEventBus = IBaseEventBus<IApplicationEvents>;
