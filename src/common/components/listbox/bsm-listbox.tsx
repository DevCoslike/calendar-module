import './bsm-listbox.scss'

import {ListBox as PrimeListBox, ListBoxProps as PrimeListBoxProps} from 'primereact/listbox'

export interface ListBoxProps extends PrimeListBoxProps {
    elementId: string
    isZebraStyledList?: boolean
}

export const BsmListBox: React.FC<ListBoxProps> = (props: ListBoxProps) => {
    const {elementId, isZebraStyledList = true, ...listBoxProps} = props
    return (
        <div className="bsm-list-box-wrapper">
            <div className={`${isZebraStyledList ? 'zebra-list' : ''} `}>
                <PrimeListBox {...listBoxProps} id={elementId} listClassName="App-link" />
            </div>
        </div>
    )
}
