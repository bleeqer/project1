import {EventWithType} from "@/core/event/EventWithType";
import {EventSubscriber} from "@/core/event/EventSubscriber";

export interface EventPublisher {
    subscribe: (subscriber: EventSubscriber<any>) => void;
    unsubscribe: (id: string) => void;
    publish: (eventWithType: EventWithType<any>) => void;
}
