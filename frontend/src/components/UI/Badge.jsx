import React from "react";

const Badge = ({ children, className = "" }) => {
  const classes = `inline-block text-xs font-semibold px-3 py-1 rounded-full bg-purple-100 text-purple-800 ${className}`;
  return <span className={classes}>{children}</span>;
};

export default Badge;
