import { createContext, useState } from "react";

export const CurrentUser = createContext(null)

const UserContext = ({children}) => {
    const [user,setUser] = useState(null)
    const [commentOn,setCommentOn] = useState(false)

    return (
        <CurrentUser.Provider value={{user,setUser,commentOn,setCommentOn}}>
        {children}
        </CurrentUser.Provider>
    )

}
export default UserContext