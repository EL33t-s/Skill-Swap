import React from "react";

const Button = ({ children, onClick, variant = "default", size = "md", className = "", ...props }) => {
  const baseClasses = "rounded-lg font-medium focus:outline-none transition";

  const variants = {
    default: "bg-purple-600 text-white hover:bg-purple-700",
    outline: "border border-gray-400 text-gray-800 hover:bg-gray-100",
    ghost: "text-purple-600 hover:underline",
  };

  const sizes = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-5 py-3",
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
