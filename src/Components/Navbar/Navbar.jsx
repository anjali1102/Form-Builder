import React from "react";
import PreviewForm from "../PreviewForm/PreviewForm";

function Navbar({ template }) {
  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      <div className="navbar-start"></div>
      <div className="navbar-center"></div>
      <div className="navbar-end flex gap-2">
        <div className="flex justify-between text-center gap-2">
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
