import { CoolModeCustom } from "../magic/CoolMode"

export const NoArtistsMessage = ({image, message, buttonText, buttonAction}) => {
    return (
        <div className="flex flex-col justify-center items-center h-96 my-16">
            <img src={image} className="w-32 h-32"/>
            <h1 className="text-base text-prim py-5">{message}</h1>
            <CoolModeCustom content={buttonText} onClick={buttonAction}/>
        </div>
    )
}