import { useContext } from "react"
import { TimelineContext } from "./TimelineSettings"

const Search = () => {
    const { search, setSearch, setAddMember, addMember, owner } = useContext(TimelineContext)

    return (
        <div className="timeline-settings-search-box">
            <input
                type="text" 
                className="timeline-settings-search" 
                placeholder="Search members"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {
                owner.id === parseInt(JSON.parse(localStorage.getItem('accData')).id) ?
                <button className="btn" onClick={() => setAddMember(!addMember)}>
                    {
                        addMember ?
                        '- Add'
                        :
                        '+ Add'

                    }
                </button>
                :
                null
            }
        </div>
    )
}

export default Search