import './bsm-scroll-panel.scss'

import {ScrollPanel} from 'primereact/scrollpanel'
import React, {ReactNode, useRef} from 'react'

import {useResizeObserver} from '../../hooks/useResizeObserver'
import {containsHTMLTags} from '../../utils/regex-utils'

interface IBsmScrollPanel {
    elementId: string
    children: string | JSX.Element | JSX.Element[] | ReactNode
    scrollHeight?: number
}

const BsmScrollPanel: React.FC<IBsmScrollPanel> = props => {
    const {elementId, children, scrollHeight} = props
    const divElementRef = useRef<HTMLDivElement>(null)
    const [parentHeight] = useResizeObserver(divElementRef, true, true)

    const isChildrenStringWithHTMLTags = () => {
        if (typeof children === 'string') {
            return containsHTMLTags(children)
        }
        return false
    }
    return (
        <div className="bsm-scroll-panel-wrapper">
            <ScrollPanel
                style={{
                    height: scrollHeight ? scrollHeight : parentHeight ? parentHeight : `auto`,
                }}
                id={elementId}
                key={elementId + '_key'}
            >
                {isChildrenStringWithHTMLTags() ? (
                    <div dangerouslySetInnerHTML={{__html: children?.toString() ?? ''}} />
                ) : (
                    children
                )}
            </ScrollPanel>
        </div>
    )
}

export default BsmScrollPanel
