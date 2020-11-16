import {
    History,
    Action,
    Location,
    LocationDescriptorObject,
    UnregisterCallback,
    LocationDescriptor,
    TransitionPromptHook,
    LocationListener,
    LocationState,
    Href,
    Path,
} from "history";
import {StateMachine} from "./StackMachine";

let id = 0;

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

    public get length(): number {
        return this._stateStack.length;
    }

    block(prompt?: boolean | string | TransitionPromptHook): UnregisterCallback {
        return () => {
        };
    }

    createHref(location: LocationDescriptorObject): Href {
        return "";
    }

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


    replace(path: Path, state?: LocationState): void;

    replace(location: LocationDescriptor<LocationState>): void;

    replace(path: Path | LocationDescriptor<LocationState>, state?: LocationState): void {
    }

    private _notifyChange(action: Action) {
        this._listener(this.location, action);
    }

    private _listener: History.LocationListener = () => {
    };

}

export function createCustomHistory() {
    return new CustomHistory();
}
