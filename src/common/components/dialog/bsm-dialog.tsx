import './bsm-dialog.scss'

import {Dialog as PrimeDialog, DialogProps as PrimeDialogProps} from 'primereact/dialog'
import React from 'react'

export interface DialogProps extends PrimeDialogProps {
    elementId: string
}
/**
 * This is a wrapper component utilizing primereact library components in order to be fully customized
 * @param props
 * @returns a dialog component
 */
export const BsmDialog: React.FC<DialogProps> = props => {
    const {elementId, ...dialogProps} = props
    return (
        <div className="bsm-dialog-wrapper">
            <PrimeDialog {...dialogProps} id={elementId}>
                {dialogProps.children}
            </PrimeDialog>
        </div>
    )
}
