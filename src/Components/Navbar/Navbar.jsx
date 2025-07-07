import React from "react";
import { ArrowLeft } from "lucide-react";
import PreviewForm from "../PreviewForm/PreviewForm";

function Navbar({ template }) {
  console.log("@@@", template);
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
          <a
            className="btn"
            onClick={() => document.getElementById("my_modal_2").showModal()}
          >
            Preview
          </a>
          <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
              <PreviewForm template={template} />
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          <a
            className="btn"
            target="_blank"
            href="https://twitter.com/intent/tweet?text=Check%20out%20this%20cool%20dynamic%20form%20builder%20by%20%40anjalii1102%20%0A&url=https%3A%2F%2Fform-builder-v2.netlify.app%2F"
          >
            Share
          </a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
