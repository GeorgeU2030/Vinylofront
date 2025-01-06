import { Button } from "../ui/button";
import { CoolMode } from "../ui/cool-mode";
import PropTypes from "prop-types";

export function CoolModeCustom({ onClick, content, disabled = false }) {
  return (
    <div className="relative justify-center">
      <CoolMode className="py-3">
        <Button 
          className={`h-12 text-lg text-white font-bold border-2 ${
            disabled 
              ? 'bg-gray-500 border-gray-600 cursor-not-allowed opacity-70' 
              : 'bg-violetneon border-strong hover:bg-strong'
          }`}
          onClick={onClick}
          disabled={disabled}
        >
          {content}
        </Button>
      </CoolMode>
    </div>
  )
}

CoolModeCustom.propTypes = {
  onClick: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  disabled: PropTypes.bool
}