import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const DashboardSkeleton = () => {
    return (
        <div className="timeline-container">
                                        
            <div className="timeline-text-box">
                <h3>
                    <Skeleton count={2} />
                </h3>

                <p className="timeline-description">
                    
                </p>
            </div>

            <div className="timeline-img-box">
                

            </div>

        </div>
    )
}

export default DashboardSkeleton