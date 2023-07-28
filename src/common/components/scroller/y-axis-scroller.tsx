import { useWindowSize } from '../../hooks/useWindowSize'
import './y-axis-scroller.scss'

import React, {ReactNode} from 'react'


interface IYAxisScroller {
    elementId: string
    children: string | JSX.Element | JSX.Element[] | ReactNode
    onScroll?: Function
    className?: string
    calculatedStickyTopHeight: number
}

const YAxisScroller: React.FC<IYAxisScroller> = props => {
    const {elementId, onScroll, className, children, calculatedStickyTopHeight = 0} = props
    const windowSize = useWindowSize()

  
    return (
        <div className="y-axis-scroller-wrapper">
            <div
                className={className}
                onScroll={e => onScroll && onScroll(e)}
                style={{
                    height: windowSize.height - calculatedStickyTopHeight,
                    overflowY: 'auto',
                }}
                id={elementId}
                key={'k_'+elementId}
            >
                {children}
            </div>
        </div>
    )
}

export default YAxisScroller
