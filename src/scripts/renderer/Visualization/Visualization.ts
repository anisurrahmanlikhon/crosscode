import { Editor } from '../../editor/Editor'
import { ExecutionGraph } from '../../execution/graph/ExecutionGraph'
import { createEl } from '../../utilities/dom'
import { Action } from '../Action/Action'
import { ActionMapping } from '../Action/Mapping/ActionMapping'
import { View } from '../View/View'

/* ------------------------------------------------------ */
/*                Visualizes code execution               */
/* ------------------------------------------------------ */
export class Visualization {
    // Source-code
    program: Action

    // Source-code to view mapping
    mapping: ActionMapping

    container: HTMLElement

    // View
    view: View

    /* ----------------------- Create ----------------------- */
    constructor() {}

    createProgram(execution: ExecutionGraph) {
        // Root action
        this.program = new Action(execution, null)
        this.program.createSteps()
        // this.program.steps[0].createSteps()

        this.container = createEl('div', 'visualization-container', document.body)
        const margin = Editor.instance.getMaxWidth() + 70
        this.container.style.left = `${margin}px`

        // View
        this.view = new View()

        // Mapping
        this.mapping = new ActionMapping()
    }

    /* ----------------------- Destroy ---------------------- */
    destroy() {
        this.mapping.destroy()
        this.view.destroy()
        this.program.destroy()

        this.container.remove()
        this.container = null

        this.program = null
        this.mapping = null
        this.view = null
    }
}
