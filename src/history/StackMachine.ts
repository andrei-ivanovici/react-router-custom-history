export class StateMachine<T> {

    private _container: T [] = [];
    private _head = 0;

    constructor(initialSTate: T) {
        this._container = [initialSTate];
    }

    public get currentValue() {
        return this._container[this._head];
    }

    public get length() {
        return this._container.length;
    }

    public pop(): T {
        return this.goTo(-1);
    }

    public push(value: T) {
        this._head++;
        this._container.push(value);
    }

    public goTo(delta: number) {
        const candidate = this._head + delta;
        this._head = candidate >= 0 && candidate < this._container.length
            ? candidate
            : this._head;
        return this._container[this._head];
    }
}
