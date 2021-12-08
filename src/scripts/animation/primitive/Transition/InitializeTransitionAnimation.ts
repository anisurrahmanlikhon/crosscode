import { replaceEnvironmentWith } from '../../../environment/environment'
import { PrototypicalEnvironmentState } from '../../../environment/EnvironmentState'
import { updateRootViewLayout } from '../../../environment/layout'
import { clone } from '../../../utilities/objects'
import { RootViewState } from '../../../view/ViewState'
import { AnimationRuntimeOptions } from '../../graph/AnimationGraph'
import { AnimationNode, AnimationOptions, createAnimationNode } from '../AnimationNode'

export interface InitializeTransitionAnimation extends AnimationNode {
    transitionCondition: PrototypicalEnvironmentState
}

function onBegin(animation: InitializeTransitionAnimation, view: RootViewState, options: AnimationRuntimeOptions) {
    replaceEnvironmentWith(view.environment, animation.transitionCondition)

    console.log(clone(view))
    updateRootViewLayout(view)
}

function onSeek(
    animation: InitializeTransitionAnimation,
    view: RootViewState,
    time: number,
    options: AnimationRuntimeOptions
) {
    updateRootViewLayout(view)
}

function onEnd(animation: InitializeTransitionAnimation, view: RootViewState, options: AnimationRuntimeOptions) {}

export function initializeTransitionAnimation(
    transitionCondition: PrototypicalEnvironmentState,
    options: AnimationOptions = {}
): InitializeTransitionAnimation {
    return {
        ...createAnimationNode(null, { ...options, duration: 20 }),
        _name: 'InitializeTransitionAnimation',

        name: 'Transition',

        transitionCondition,

        // Callbacks
        onBegin,
        onSeek,
        onEnd,
    }
}
