import { createContext, useContext, useEffect, useState } from "react"
import { IoCloseOutline } from "react-icons/io5"
import { DataContext } from "../context/DataContext"
import TextBox from "./TextBox"
import ButtonBox from "./ButtonBox"
import ContributorsBox from "./ContributorsBox"
import AddMember from "./AddMember"

export const TimelineContext = createContext({})

const TimelineSettings = ({ id, setSettings, list = 'public-timelines' }) => {

    // SCROLL TO TOP
    useEffect(() => {
        const currentScroll = window.scrollY

        window.scrollTo(0, 0);

        return () => window.scrollTo(0, currentScroll)
    }, [])




    // TIMELINE VARIABLES
    const { publicTimelines, myTimelines } = useContext(DataContext)
    const [timeline, setTimeline] = useState()
    const [owner, setOwner] = useState(null)


    useEffect(() => {
        const fetchData = async (timelines) => {
            const foundTimeline = timelines.find(currentTimeline => currentTimeline.id === id)

            console.log(timelines)

            const sortedContributors = foundTimeline.contributors.sort((user1, user2) => {
                if (user1.role > user2.role) return -1
                else if (user1.role < user2.role) return 1
                else return 0
            })

            const sortedTimeline = { ...foundTimeline, contributors: sortedContributors }

            setTimeline(sortedTimeline)

            if (sortedTimeline) {
                setOwner(sortedTimeline.contributors.find(user => user.role === 3))

                setLoading(false)

                console.log(timeline)
            }
        }

        if(list === 'my-timelines' && myTimelines.length) fetchData(myTimelines)
        else if(list === 'public-timelines' && publicTimelines.length) fetchData(publicTimelines)
    }, [publicTimelines, myTimelines, id])





    // // MENU VARIABLES
    const [closed, setClosed] = useState(false)
    const [openMembers, setOpenMembers] = useState(false)
    const [addMember, setAddMember] = useState(false)

    const handleClose = () => {
        setClosed(true)

        setTimeout(() => {
            setSettings(null)
        }, 400)
    }




    // // LOADING
    const [loading, setLoading] = useState(true)




    return (
        <TimelineContext.Provider value={{
            id, owner, timeline, setTimeline,
            openMembers, setOpenMembers,
            addMember, setAddMember,
            handleClose
        }}>
            {
                loading ?
                    <p className="timeline-settings">Loading</p>
                    :
                    <div className="timeline-settings">
                        <div className={closed ? "timeline-settings-container timeline-settings-closed" : "timeline-settings-container"}>
                            <TextBox />

                            <ButtonBox />

                            {
                                openMembers &&
                                <ContributorsBox />
                            }

                            {
                                openMembers && addMember &&
                                <AddMember />
                            }

                            <IoCloseOutline className="timeline-settings-close" onClick={handleClose} />

                        </div>
                    </div>
            }
        </TimelineContext.Provider>
    )
}

export default TimelineSettings