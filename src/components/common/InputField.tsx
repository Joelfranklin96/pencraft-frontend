type Props = {
    name: string,
    text: string,
    placeholder: string
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    isPassword: boolean
}

export function InputField({name, text, placeholder, onChange, isPassword}: Props){


    return (
        <div>
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{text}</label>
            <input type={isPassword ? "password" : "text"} onChange = {onChange} id={name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 md:w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
    )
}