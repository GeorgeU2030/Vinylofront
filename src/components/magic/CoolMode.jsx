import { Button } from "../ui/button";
import { CoolMode } from "../ui/cool-mode";

export function CoolModeCustom(onClick){
  return (
    <div className="relative justify-center">
          <CoolMode className="py-3">
            <Button className="bg-strong h-12 text-lg font-bold hover:bg-primary"
            onClick={onClick}
            >Get Started</Button>
          </CoolMode>
    </div>
  )
}