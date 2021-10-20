import { Transform } from '../environment/data/DataState';
import { EnvironmentState } from '../environment/EnvironmentState';

// A view is a collection of environments
export interface ViewState {
    id: string;
    label: string;
    isRoot: boolean;

    transform: ViewTransform;
    children: (ViewState | EnvironmentState)[];
}

export interface ViewTransform extends Transform {
    // Anchors to align it to lines of code, or to other views
    positionModifiers: ViewPositionModifier[];
}

export interface ViewPositionModifier {
    type: ViewPositionModifierType;
    value: any;
}

export enum ViewPositionModifierType {
    NextToCode = 'NextToCode',
    AboveView = 'AboveView',
    BelowView = 'BelowView',
}
