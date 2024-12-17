import { Button } from "../ui/button";
import { CoolMode } from "../ui/cool-mode";
import PropTypes from "prop-types";

export function CoolModeCustom({ onClick, content }){
  return (
    <div className="relative justify-center">
          <CoolMode className="py-3">
            <Button className="bg-violetneon h-12 text-lg text-white font-bold border-2 border-strong hover:bg-strong"
            onClick={onClick}
          >
            {content}
          </Button>
          </CoolMode>
    </div>
  )
}

CoolModeCustom.propTypes = {
  onClick: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired
}