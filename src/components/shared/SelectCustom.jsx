import { 
    Select, 
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue, } from "../ui/select"
import { useState } from "react";

export const SelectCustom = ({ options, navigate,activeItem }) => {
    
    const activeOption = options.find((option)=> option.key == activeItem) || options[0]

    const [selected, setSelected] = useState(activeOption.key);
    const defaultValue = activeOption.label

    return (
        <Select onValueChange={(value) => {
                setSelected(value);
                navigate(`/${value}`);
        }}>
            <SelectTrigger className="w-[180px] bg-prim">
                <SelectValue value={selected} placeholder={defaultValue} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {options.map((option) => (
                        <SelectItem key={option.key} value={option.key} disabled={selected === option.key} >
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};