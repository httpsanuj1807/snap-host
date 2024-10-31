export default function Button({type, children}){

    let classes = "gap-2 h-4/5 px-4 text-lg flex items-center font-semibold bg-green-700";

    if(type === 'white'){
        classes = "gap-2 px-2 sm:px-4 text-xs sm:text-base w-32 sm:w-44 py-3 justify-center rounded-full flex items-center font-semibold text-black border border-gray-300"
    }

    if(type === 'black'){
        classes = "gap-2 px-2 sm:px-4 text-xs sm:text-base w-32 sm:w-44 py-3 justify-center rounded-full flex items-center font-semibold text-white bg-black"
    }

    return (
        <button className={classes}>{children}</button>
    )

}