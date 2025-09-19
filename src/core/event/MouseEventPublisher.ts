import {MouseEventWithType} from "@/core/event/MouseEventWithType";
import {EventPublisher} from "@/core/event/EventPublisher";
import {EventSubscriber} from "@/core/event/EventSubscriber";

class MouseEventPublisher implements EventPublisher {
    subscribers: EventSubscriber<MouseEventWithType>[];

    constructor() {
        this.subscribers = [];
    }

    subscribe(newSubscriber: EventSubscriber<MouseEventWithType>) {
        const found = this.subscribers.find(subscriber => subscriber.id === newSubscriber.id);
        if (!found) {
            this.subscribers.push(newSubscriber);
        }
    }

    unsubscribe(id: string) {
        this.subscribers = this.subscribers.filter(subscriber => subscriber.id !== id);
    }

    publish(mouseEventWithType: MouseEventWithType) {
        this.subscribers.forEach(subscriber => {
            subscriber.notify(mouseEventWithType);
        });
    }
}

export const mouseEventPublisher = new MouseEventPublisher();
