import React from "react";

const HighlightText = ({text}) => {
  return (
    <span className="font-bold text-blue1">
      {" "}
      {text}
    </span>
  );
};

export default HighlightText;