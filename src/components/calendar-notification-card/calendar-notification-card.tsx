import {ListBox as PrimeListBox, ListBoxProps as PrimeListBoxProps} from 'primereact/listbox'

export interface ListBoxProps extends PrimeListBoxProps {
    elementId: string
}

export const ListBox = (props: ListBoxProps) => {
    const {elementId, ...listBoxProps} = props
    return (
        <div className="portal-component">
            <div className="list-box-wrapper">
                <PrimeListBox {...listBoxProps} id={elementId} />
            </div>
        </div>
    )
}
