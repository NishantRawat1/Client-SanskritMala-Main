import React from "react";

const HighlightText = ({text}) => {
  return (
    <span className="font-bold text-orange3">
      {" "}
      {text}
    </span>
  );
};

export default HighlightText;