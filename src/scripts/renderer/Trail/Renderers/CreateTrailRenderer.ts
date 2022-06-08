import { remap } from '../../../utilities/math'
import { DataState } from '../../View/Environment/data/DataState'
import { LiteralRenderer } from '../../View/Environment/data/literal/LiteralRenderer'
import { Trail } from '../Trail'
import { TrailRenderer } from './TrailRenderer'

export class CreateTrailRenderer extends TrailRenderer {
    // Copy of previous state
    private prevCopy: LiteralRenderer | null

    /* ----------------------- Create ----------------------- */
    constructor(trail: Trail) {
        super(trail)

        const prev = this.trail.startEnvironment.getAllChildRenderers()[this.trail.state.toDataId]

        if (prev != null) {
            this.prevCopy = new LiteralRenderer()

            const cache = prev._cachedState as DataState
            this.prevCopy.setState(cache)

            this.prevCopy.element.classList.add('is-free')
            document.body.appendChild(this.prevCopy.element)
        }
    }

    /* ----------------------- Animate ---------------------- */
    update() {
        if (this.prevCopy != null) {
            const prev =
                this.trail.startEnvironment.getAllChildRenderers()[this.trail.state.toDataId]
            const bbox = prev.element.getBoundingClientRect()
            this.prevCopy.element.style.top = `${bbox.top}px`
            this.prevCopy.element.style.left = `${bbox.left}px`

            const t = remap(this.trail.time, 0, 1, 0, 5)
            this.prevCopy.element.style.transform = `translate(${-t}px, ${t}px)`
            this.prevCopy.element.style.opacity = `${Math.max(0, 1 - this.trail.time)}`
            this.prevCopy.element.style.filter = `saturate(${Math.max(0, 1 - 2 * this.trail.time)})`

            if (t == 0 || t == 1) {
                this.prevCopy.element.style.opacity = '0'
            }
        }

        const data =
            this.trail.endEnvironment.getAllChildRenderers()[this.trail.state.toDataId].element

        const t = remap(this.trail.time, 0, 1, 5, 0)
        data.style.transform = `translate(${t}px, ${-t}px)`
        data.style.opacity = `${Math.min(1, this.trail.time * 2)}`
    }

    /* ----------------------- Destroy ---------------------- */
    destroy() {
        super.destroy()
        this.prevCopy?.destroy()
    }
}
