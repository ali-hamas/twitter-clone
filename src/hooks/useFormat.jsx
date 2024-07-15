import React from "react";

const useFormat = (paragraph) => {
  return paragraph.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
};

export default useFormat;
