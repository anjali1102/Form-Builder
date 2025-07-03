import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  ArrowLeft,
  CheckSquare,
  Image,
  Radio,
  ToggleLeft,
  Upload,
} from "lucide-react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function App() {
  return (
    <>
      <div>
        /* Navbar */
        <div className="navbar bg-base-100 shadow-sm">
          <div className="navbar-start">
            <a className="btn">
              <ArrowLeft />
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
        /* Main Section */
        <main className="flex min-h-screen">
          /* Builder Canvas */
          <div id="builder" className="flex-1 p-8 bg-gray-50">
            <h2 className="text-lg font-semibold mb-4">Form Builder Area</h2>
          </div>
          <div className="w-[340px] bg-white text-black p-4 shadow-md border-r">
            <div className="tabs tabs-boxed mb-4">
              <input
                type="radio"
                name="my_tabs_1"
                className="tab"
                aria-label="Field"
                defaultChecked
              />
              <input
                type="radio"
                name="my_tabs_1"
                className="tab"
                aria-label="Workflow"
              />
              <input
                type="radio"
                name="my_tabs_1"
                className="tab"
                aria-label="Permissions"
              />
            </div>
            /* Search */
            <div className="mb-4">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
                <input type="search" placeholder="Search element" />
              </label>
            </div>
            <div className="mb-6">
              <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                TEXT ELEMENTS
              </p>
              <div className="flex gap-4 justify-between">
                <button className="w-36 h-24 bg-gray-100 hover:bg-gray-200 rounded-lg flex flex-col justify-center items-center shadow-sm hover:shadow-md transition">
                  <span className="text-xl">T</span>
                  <span className="mt-2 text-sm font-medium">Short Answer</span>
                </button>

                <button className="w-36 h-24 bg-gray-100 hover:bg-gray-200 rounded-lg flex flex-col justify-center items-center shadow-sm hover:shadow-md transition">
                  <span className="text-2xl">≡</span>
                  <span className="mt-2 text-sm font-medium">Paragraph</span>
                </button>
              </div>
            </div>
            <div className="mb-6">
              <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                MULTIPLE CHOICE
              </p>
              <div className="grid grid-cols-2 gap-4">
                <button className="w-36 h-24 bg-gray-100 hover:bg-gray-200 rounded-lg flex flex-col justify-center items-center shadow-sm hover:shadow-md transition">
                  <ChevronDownIcon className="w-5 h-5" />
                  <span className="mt-2 text-sm font-medium">Dropdown</span>
                </button>

                <button className="w-36 h-24 bg-gray-100 hover:bg-gray-200 rounded-lg flex flex-col justify-center items-center shadow-sm hover:shadow-md transition">
                  <Radio size={24} />
                  <span className="mt-2 text-sm font-medium">Radio</span>
                </button>

                <button className="w-36 h-24 bg-gray-100 hover:bg-gray-200 rounded-lg flex flex-col justify-center items-center shadow-sm hover:shadow-md transition">
                  <ToggleLeft size={24} />
                  <span className="mt-2 text-sm font-medium">Yes / No</span>
                </button>

                <button className="w-36 h-24 bg-gray-100 hover:bg-gray-200 rounded-lg flex flex-col justify-center items-center shadow-sm hover:shadow-md transition">
                  <CheckSquare size={24} />
                  <span className="mt-2 text-sm font-medium">Dropdown</span>
                </button>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                MEDIA ELEMENT
              </p>
              <div className="flex gap-4 justify-between">
                <button className="w-36 h-24 bg-gray-100 hover:bg-gray-200 rounded-lg flex flex-col justify-center items-center shadow-sm hover:shadow-md transition">
                  <Upload size={24} />
                  <span className="mt-2 text-sm font-medium">Upload</span>
                </button>
                <button className="w-36 h-24 bg-gray-100 hover:bg-gray-200 rounded-lg flex flex-col justify-center items-center shadow-sm hover:shadow-md transition">
                  <Image size={24} />
                  <span className="mt-2 text-sm font-medium">Image</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
