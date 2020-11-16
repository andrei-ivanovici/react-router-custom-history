import {History, Action, Location, LocationListener, Path,} from "history";
import {StateMachine} from "./StackMachine";

let id = 0;
const noopFn: () => any = () => {
};

export class CustomHistory implements History {
    action: Action = "POP";
    location: Location = {
        hash: `${id}`,
        pathname: "/",
        key: `${id}`,
        search: "",
        state: null
    };
    _stateStack: StateMachine<Location> = new StateMachine<Location>(this.location);
    replace = noopFn;

    public get length(): number {
        return this._stateStack.length;
    }

    createHref = () => "";

    block = () => noopFn;

    go(n: number): void {
        this.location = this._stateStack.goTo(n);
    }

    goBack(): void {
        this.go(-1);
        this._notifyChange("POP");
    }

    goForward(): void {
        this.go(1);
        this._notifyChange("PUSH");
    }

    listen = (listener: LocationListener) => {
        this._listener = listener;
        return () => {
            this._listener = () => {
            };
        };
    };

    push = (path: Path) => {

        const {pathname} = this._stateStack.currentValue;
        if (path === pathname) {
            return;
        }
        id++;
        this.location = {
            pathname: path as any,
            search: `${id}`,
            key: `${id}`,
            state: null,
            hash: ""
        };

        this._stateStack.push(this.location);
        this._notifyChange("PUSH");

    };

    private _notifyChange(action: Action) {
        this._listener(this.location, action);
    }

    private _listener: History.LocationListener = () => {
    };

}

export function createCustomHistory() {
    return new CustomHistory();
}
