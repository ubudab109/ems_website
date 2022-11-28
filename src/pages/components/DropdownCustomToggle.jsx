import React, { forwardRef } from "react";

export const CustomToggle = forwardRef(({ children, onClick }, ref) => (
  <a
    href="/#"
    ref={ref}
    style={{
      margin: '0'
    }}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

export const CustomMenu = forwardRef(
  ({
    children, style, className, 'aria-labelledby': labeledBy,
  }, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        className={className + ' card-shadow'}
        aria-labelledby={labeledBy}
      >
        <div className="card-body">
          <ul className="text-table">
            {children}
          </ul>
        </div>
      </div>
    );
  },
);