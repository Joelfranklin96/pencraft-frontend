type OnclickType = () => Promise<void>;

type ButtonType = {
    onClick: OnclickType,
    text: string
}

export function AuthButton({onClick, text} : ButtonType){
    return (
        <div>
            <div onClick={onClick} className="flex justify-center w-40 md:w-80 h-10 bg-black rounded-md cursor-pointer hover:bg-gray-800 active:bg-gray-700">
                <button className="text-white cursor-pointer">{text}</button>
            </div>
        </div>
    )
}