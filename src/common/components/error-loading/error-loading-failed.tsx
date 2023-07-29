interface IErrorLoadingFailed {
    error: string
}

export const ErrorLoadingFailed: React.FC<IErrorLoadingFailed> = props => {
    return (
        <div className="calendar-notification-card-wrapper">
            <div className="container-fluid py-1">
                <div className="row d-flex align-items-center">
                    <h2>
                        <i className="pi pi-times pe-1 h2i" />
                        {props.error || 'Something went wrong...'}
                    </h2>
                </div>
            </div>
        </div>
    )
}
