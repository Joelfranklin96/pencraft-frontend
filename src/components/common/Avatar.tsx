import { Link } from "react-router-dom"

type AvatarType = {
    name: string,
    profileId: string,
    userType: string,
    isUserLoaded: boolean
}

export function Avatar({name, profileId ="", userType, isUserLoaded}: AvatarType){
    return (
        <Link to={userType != 'guest' ? `/profile/${profileId}` : ""}>
            <div>
                <div className="bg-gray-100 h-10 w-10 rounded-full flex items-center justify-center mr-3 hover:bg-gray-50">
                    {!isUserLoaded ? (
                        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <p className="text-xl">{userType === 'guest' ? 'G' : name ? name[0].toUpperCase() : ""}</p>
                    )}
                </div>
            </div>
        </Link>
    )
}