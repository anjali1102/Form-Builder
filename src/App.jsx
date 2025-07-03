import { useState } from "react";
import "./App.css";
import {
  ArrowLeft,
  CheckSquare,
  Image,
  Radio,
  ToggleLeft,
  Trash,
  Upload,
} from "lucide-react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import os from "os";

function App() {
  const [template, setTemplate] = useState({
    name: "Add Title",
    sections: [
      {
        id: "section-1",
        title: "Untitled title",
        fields: [],
      },
    ],
  });
  function handleAddField(type) {
    console.log("type", type);
    const newField = {
      id: crypto.randomUUID(),
      type,
      label: type,
      required: false,
    };
    const updatedTemplate = { ...template };
    updatedTemplate.sections[0].fields.push(newField);
    setTemplate(updatedTemplate);
  }
  return (
    <>
      <div>
        {/*  Navbar  */}
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
        {/* Main Section */}
        <main className="flex min-h-screen">
          {/* Builder Canvas */}
          <div id="builder" className="flex-1 p-8 bg-gray-50 min-h-screen">
            <h2 className="text-lg font-semibold mb-4">Form Builder Area</h2>
            {template.sections[0].fields.map((field) => (
              <div
                key={field.id}
                className="bg-white rounded-xl border p-4 mb-4 shadow-sm w-full max-w-2xl"
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">
                    {`${field.type[0].toUpperCase()}${field.type.slice(
                      1
                    )} Field`}
                  </h4>
                  <label className="flex items-center gap-2 text-sm">
                    Make as required
                    <input type="checkbox" className="toggle toggle-sm" />
                  </label>
                </div>

                {field.type === "text" || field.type === "paragraph" ? (
                  <div className="space-y-2">
                    <label>Label</label>
                    <input
                      type="text"
                      placeholder="Add field label"
                      className="input input-bordered w-full"
                    />
                    <input
                      type="text"
                      placeholder="Add help text"
                      className="input input-bordered w-full"
                    />
                  </div>
                ) : null}

                {field.type === "dropdown" ? (
                  <div className="space-y-2 item-center">
                    <label>Options</label>
                    <select className="select select-bordered mt-2 ml-4">
                      <option>Select option</option>
                      <option>Text</option>
                      <option>Number</option>
                    </select>
                  </div>
                ) : null}

                {field.type === "radio" ? (
                  <div className="space-y-2 item-center flex flex-col">
                    <div className="flex gap-2">
                      <input
                        type="radio"
                        name="radio-5"
                        className="radio radio-secondary"
                        defaultChecked
                      />
                      <label htmlFor="">Option 1</label>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="radio"
                        name="radio-5"
                        className="radio radio-secondary"
                      />
                      <label htmlFor="">Option 2</label>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="radio"
                        name="radio-5"
                        className="radio radio-secondary"
                      />
                      <label htmlFor="">Option 3</label>
                    </div>
                  </div>
                ) : null}

                {field.type === "toggle" ? (
                  <div className="flex items-center gap-2 mt-2 text-sm">
                    <span>Yes/No</span>
                    <input type="checkbox" className="toggle toggle-sm ml-2" />
                  </div>
                ) : null}

                {field.type === "upload" ? (
                  <>
                    <label className="mt-2">Upload File</label>
                    <input
                      type="file"
                      className="file-input file-input-bordered w-full mt-2"
                    />
                  </>
                ) : null}

                {field.type === "image" ? (
                  <>
                    <label className="mt-2">Upload Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="file-input file-input-bordered w-full mt-2"
                    />
                  </>
                ) : null}
                <div className="mt-4 flex justify-between">
                  <button className="btn btn-ghost text-red-500 text-sm">
                    <Trash />
                  </button>
                  <button className="btn btn-sm bg-black text-white">
                    Done
                  </button>
                </div>
              </div>
            ))}
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
            {/* Search */}
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
                <button
                  onClick={() => handleAddField("text")}
                  className="w-36 h-24 bg-gray-100 hover:bg-gray-200 rounded-lg flex flex-col justify-center items-center shadow-sm hover:shadow-md transition"
                >
                  <span className="text-xl">T</span>
                  <span className="mt-2 text-sm font-medium">Short Answer</span>
                </button>

                <button
                  onClick={() => handleAddField("paragraph")}
                  className="w-36 h-24 bg-gray-100 hover:bg-gray-200 rounded-lg flex flex-col justify-center items-center shadow-sm hover:shadow-md transition"
                >
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
                <button
                  onClick={() => handleAddField("dropdown")}
                  className="w-36 h-24 bg-gray-100 hover:bg-gray-200 rounded-lg flex flex-col justify-center items-center shadow-sm hover:shadow-md transition"
                >
                  <ChevronDownIcon className="w-5 h-5" />
                  <span className="mt-2 text-sm font-medium">Dropdown</span>
                </button>

                <button
                  onClick={() => handleAddField("radio")}
                  className="w-36 h-24 bg-gray-100 hover:bg-gray-200 rounded-lg flex flex-col justify-center items-center shadow-sm hover:shadow-md transition"
                >
                  <Radio size={24} />
                  <span className="mt-2 text-sm font-medium">Radio</span>
                </button>

                <button
                  onClick={() => handleAddField("toggle")}
                  className="w-36 h-24 bg-gray-100 hover:bg-gray-200 rounded-lg flex flex-col justify-center items-center shadow-sm hover:shadow-md transition"
                >
                  <ToggleLeft size={24} />
                  <span className="mt-2 text-sm font-medium">Yes / No</span>
                </button>

                <button
                  onClick={() => handleAddField("dropdown")}
                  className="w-36 h-24 bg-gray-100 hover:bg-gray-200 rounded-lg flex flex-col justify-center items-center shadow-sm hover:shadow-md transition"
                >
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
                <button
                  onClick={() => handleAddField("upload")}
                  className="w-36 h-24 bg-gray-100 hover:bg-gray-200 rounded-lg flex flex-col justify-center items-center shadow-sm hover:shadow-md transition"
                >
                  <Upload size={24} />
                  <span className="mt-2 text-sm font-medium">Upload</span>
                </button>
                <button
                  onClick={() => handleAddField("image")}
                  className="w-36 h-24 bg-gray-100 hover:bg-gray-200 rounded-lg flex flex-col justify-center items-center shadow-sm hover:shadow-md transition"
                >
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
