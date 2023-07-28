import {useLayoutEffect, useState, useCallback, RefObject} from 'react'

export const useResizeObserver = (
    ref: RefObject<HTMLElement>,
    getHeightOnly?: boolean,
    checkParentElement?: boolean,
    callback?: (entry: DOMRectReadOnly) => void
) => {
    const [width, setWidth] = useState<number>()
    const [height, setHeight] = useState<number>()

    const handleResize = useCallback(
        (entries: ResizeObserverEntry[]) => {
            if (!Array.isArray(entries)) {
                return
            }

            const entry = entries[0]
            setWidth(entry.contentRect.width)
            setHeight(entry.contentRect.width)

            if (callback) {
                callback(entry.contentRect)
            }
        },
        [callback]
    )

    useLayoutEffect(() => {
        if (!ref.current) {
            return
        }

        let RO: ResizeObserver | any = new ResizeObserver((entries: ResizeObserverEntry[]) => handleResize(entries))
        checkParentElement ? RO.observe(ref.current.parentElement) : RO.observe(ref.current)

        return () => {
            RO.disconnect()
            RO = null
        }
    }, [ref])

    return getHeightOnly ? [height] : [width, height]
}
