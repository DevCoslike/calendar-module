import './y-axis-scroller.scss'

import React, {ReactNode, useRef} from 'react'

import {useResizeObserver} from '../../hooks/useResizeObserver'
import {containsHTMLTags} from '../../utils/regex-utils'

interface IYAxisScroller {
    elementId: string
    children: string | JSX.Element | JSX.Element[] | ReactNode
    onScroll?: Function
    className?: string
    scrollHeight?: number
}

const YAxisScroller: React.FC<IYAxisScroller> = props => {
    const {elementId, onScroll, className, children, scrollHeight} = props
    const divElementRef = useRef<HTMLDivElement>(null)
    const [parentHeight] = useResizeObserver(divElementRef, true, true)

    const isChildrenStringWithHTMLTags = () => {
        if (typeof children === 'string') {
            return containsHTMLTags(children)
        }
        return false
    }
    return (
        <div className="y-axis-scroller-wrapper" ref={divElementRef}>
            <div
                className={className}
                onScroll={e => onScroll && onScroll(e)}
                style={{
                    height: scrollHeight ? scrollHeight : parentHeight ? parentHeight : `auto`,
                    overflowY: 'auto',
                }}
                id={elementId}
                key={elementId + '_key'}
            >
                {isChildrenStringWithHTMLTags() ? (
                    <div dangerouslySetInnerHTML={{__html: children?.toString() ?? ''}} />
                ) : (
                    children
                )}
            </div>
        </div>
    )
}

export default YAxisScroller
