import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const DashboardSkeleton = () => {
    return (
        <div className="timeline-container">
                                        
            <div className="timeline-text-box">
                <h3 className='timeline-name'>
                    <Skeleton />
                </h3>

                <p className="timeline-description">
                    <Skeleton count={4} />
                </p>
            </div>

            <div className="timeline-img-box">
                {
                    Array.from({length: 5}, _ => null).map(_ => (
                        <Skeleton className="timeline-pfp" />
                    ))
                }
            </div>

        </div>
    )
}

export default DashboardSkeleton