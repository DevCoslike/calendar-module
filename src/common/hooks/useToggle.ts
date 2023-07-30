import {useCallback, useState} from 'react'

type ToggleReturnType = [boolean, () => void]

function useToggle(initialValue: boolean): ToggleReturnType {
    const [value, setValue] = useState<boolean>(initialValue)

    const toggleValue = useCallback(() => {
        setValue(prevValue => !prevValue)
    }, [])

    return [value, toggleValue]
}

export default useToggle
