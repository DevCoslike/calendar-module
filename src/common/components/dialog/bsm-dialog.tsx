import './bsm-dialog.scss'

import {Dialog as PrimeDialog, DialogProps as PrimeDialogProps} from 'primereact/dialog'
import React from 'react'

import {DIALOG_CONTENT_HEIGHT, DIALOG_HEADER_HEIGHT} from '../../constants/componentStyle'

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
            <PrimeDialog
                {...dialogProps}
                id={elementId}
                headerStyle={{height: DIALOG_HEADER_HEIGHT + 'vh', padding: 0}}
                style={{maxWidth: '60vw', background: 'white'}}
                contentStyle={{
                    height: DIALOG_CONTENT_HEIGHT + 'vh',
                    padding: '0 16px',
                    marginTop: '1rem',
                }}
            >
                {dialogProps.children}
            </PrimeDialog>
        </div>
    )
}
