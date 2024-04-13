import { createContext, useContext, useEffect, useState } from "react"
import { IoCloseOutline } from "react-icons/io5"
import { DataContext } from "../context/DataContext"
import TextBox from "./TextBox"
import ButtonBox from "./ButtonBox"
import ContributorsBox from "./ContributorsBox"
import AddMember from "./AddMember"
import PopUp from "../components/PopUp"

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
            }
        }

        if(list === 'my-timelines' && myTimelines.length) fetchData(myTimelines)
        else if(list === 'public-timelines' && publicTimelines.length) fetchData(publicTimelines)
    }, [publicTimelines, myTimelines, id])





    // // MENU VARIABLES
    const [openMembers, setOpenMembers] = useState(false)
    const [addMember, setAddMember] = useState(false)

    const handleClose = () => {
        setSettings(null)
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
            <PopUp
                shown={id}
                closeFunc={() => setSettings(null)}
                className="timeline-settings-container"
            >

                {
                    loading ?
                        <p>Loading</p>
                        :
                        <>
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

                        </>
                }

            </PopUp>
        </TimelineContext.Provider>
    )
}

export default TimelineSettings