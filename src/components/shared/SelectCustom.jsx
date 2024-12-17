import { 
    Select, 
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue, } from "../ui/select"
import { useState } from "react";

export const SelectCustom = ({ options, navigate }) => {
    const [selected, setSelected] = useState(options[0].key);
    const defaultValue = options[0].label

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