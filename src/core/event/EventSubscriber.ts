
export interface EventSubscriber<T> {
    id: string;
    notify: (event: T) => void;
}
