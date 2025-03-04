import { useState } from "react";
import PropTypes from "prop-types";

const TooltipMessagge = ({ messagge }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <span
        className="cursor-pointer rounded-full bg-yellow-600 font-bold text-white opacity-50 hover:opacity-100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-6 text-center">?</div>
        {isHovered && (
          <div className="absolute z-10 inline-block max-w-60 translate-y-3 transform text-wrap rounded-lg bg-yellow-600 px-3 py-2 text-white">
            {messagge}
          </div>
        )}
      </span>
    </>
  );
};

TooltipMessagge.propTypes = {
  messagge: PropTypes.string.isRequired,
};

export default TooltipMessagge;
