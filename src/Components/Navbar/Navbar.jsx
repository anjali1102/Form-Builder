import React from "react";
import { ArrowLeft } from "lucide-react";

function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <a className="btn mr-2">
          <ArrowLeft size={12} />
        </a>
        Back
      </div>
      <div className="navbar-center hidden lg:flex"></div>
      <div className="navbar-end">
        <div className="flex justify-between text-center gap-2">
          <a className="p-2">Save draft</a>
          <a className="btn">Preview</a>
          <a className="btn">Share</a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
