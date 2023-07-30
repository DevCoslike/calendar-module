import './y-axis-scroller.scss'

import React, {ReactNode, useRef} from 'react'

import {useResizeObserver} from '../../hooks/useResizeObserver'

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

    if (typeof children === 'string') {
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
                {children}
            </div>
        </div>
    )
}

export default YAxisScroller
