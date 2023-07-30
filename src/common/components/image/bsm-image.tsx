import React from 'react'

interface IBsmImage {
    imageUrl: string
    maxHeightImgContainer: number
}

const BsmImage: React.FC<IBsmImage> = ({imageUrl, maxHeightImgContainer}) => {
    return (
        <div className="bsm-image-wrapper">
            <div className="d-flex justify-content-center" style={{maxHeight: maxHeightImgContainer}}>
                <img src={imageUrl} alt="not rendering..." style={{width: '100%', height: 'auto'}} />
            </div>
        </div>
    )
}

export default BsmImage
