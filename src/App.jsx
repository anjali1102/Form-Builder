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
import { produce } from "immer";

function App() {
  const [template, setTemplate] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("updatedTemplate"));
    return stored
      ? stored
      : {
          name: "Add Title",
          sections: [
            {
              id: "section-1",
              title: "Untitled title",
              fields: [],
            },
          ],
        };
  });

  function handleAddField(type) {
    const newField = {
      id: crypto.randomUUID(),
      type,
      label: type,
      required: false,
      options:
        type === "dropdown" || type === "radio" || type === "checkbox"
          ? ["Option1", "Option2", "Anjali"]
          : undefined,
      selectedOption: type === "dropdown" ? "" : undefined,
      toggleValue: type === "toggle" ? false : undefined,
      selectedCheckbox: type === "checkbox" ? "" : undefined,
      file: type === "uploadFile" || type === "image" ? "" : null,
    };
    const storedTemplate =
      JSON.parse(localStorage.getItem("updatedTemplate")) || template;
    const updatedTemplate = { ...storedTemplate };
    updatedTemplate.sections[0].fields.push(newField);
    localStorage.setItem("updatedTemplate", JSON.stringify(updatedTemplate));
    setTemplate(updatedTemplate);
  }

  function handleRemoveField(fieldid) {
    const updated = produce(template, (draft) => {
      draft.sections[0].fields = draft.sections[0].fields.filter(
        (eachField) => eachField.id !== fieldid
      );
    });
    setTemplate(updated);
    localStorage.setItem("updatedTemplate", JSON.stringify(updated));
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
                      id="fieldText"
                      value={field.label}
                      onChange={(e) => {
                        console.log("e0", e.target.value);
                        const updated = produce(template, (draft) => {
                          const toBeUpdated = draft.sections[0].fields.find(
                            (f) => f.id === field.id
                          );
                          if (toBeUpdated) {
                            toBeUpdated.label = e.target.value;
                          }
                        });
                        setTemplate(updated);
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Add help text"
                      className="input input-bordered w-full"
                      id="fieldHelpText"
                      value={field.helpText}
                      onChange={(e) => {
                        console.log("e", e.target.value);
                        const updated = produce(template, (draft) => {
                          const toBeUpdated = draft.sections[0].fields.find(
                            (f) => f.id === field.id
                          );
                          if (toBeUpdated) {
                            toBeUpdated.helpText = e.target.value;
                          }
                        });
                        setTemplate(updated);
                      }}
                    />
                  </div>
                ) : null}

                {field.type === "dropdown" ? (
                  <div className="space-y-2 item-center">
                    <label>Options</label>
                    <select
                      className="select select-bordered mt-2 ml-4"
                      value={field.selectedOption || ""}
                      onChange={(e) => {
                        const updated = produce(template, (draft) => {
                          const target = draft.sections[0].fields.find(
                            (f) => f.id === field.id
                          );
                          if (target) {
                            target.selectedOption = e.target.value;
                          }
                        });
                        setTemplate(updated);
                        localStorage.setItem(
                          "updatedTemplate",
                          JSON.stringify(updated)
                        );
                      }}
                    >
                      <option value="">Select option</option>
                      {field.options?.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : null}

                {field.type === "radio" ? (
                  <div className="space-y-2 item-center flex flex-col">
                    {field.options?.map((option, index) => (
                      <div className="flex gap-2" key={index}>
                        <input
                          key={index}
                          type="radio"
                          name={`radio-${field.id}`}
                          value={option}
                          className="radio radio-secondary"
                          checked={field.selectedRadioOption === option}
                          onChange={(e) => {
                            const updated = produce(template, (draft) => {
                              const target = draft.sections[0].fields.find(
                                (f) => f.id === field.id
                              );
                              if (target) {
                                target.selectedRadioOption = e.target.value;
                              }
                            });
                            setTemplate(updated);
                          }}
                        />
                        <label htmlFor="">{option}</label>
                      </div>
                    ))}
                  </div>
                ) : null}

                {field.type === "toggle" ? (
                  <div className="flex items-center gap-2 mt-2 text-sm">
                    <span>Yes/No</span>
                    <input
                      type="checkbox"
                      className="toggle toggle-secondary toggle-sm ml-2"
                      checked={field.toggleValue || false}
                      onChange={(e) => {
                        const updated = produce(template, (draft) => {
                          const target = draft.sections[0].fields.find(
                            (f) => f.id === field.id
                          );
                          if (target) {
                            target.toggleValue = e.target.value;
                          }
                        });
                        setTemplate(updated);
                        // localStorage.setItem(
                        //   "updatedTemplate",
                        //   JSON.stringify(updated)
                        // );
                      }}
                    />
                  </div>
                ) : null}

                {field.type === "checkbox" ? (
                  <div className="space-y-2 item-center flex flex-col">
                    {console.log(field)}
                    {field.options?.map((option, index) => (
                      <div className="flex gap-2" key={index}>
                        <input
                          key={index}
                          type="checkbox"
                          name={`checkbox-${field.id}`}
                          value={option}
                          className="checkbox checkbox-neutral"
                          checked={field.selectedCheckbox === option}
                          onChange={(e) => {
                            const updated = produce(template, (draft) => {
                              const target = draft.sections[0].fields.find(
                                (f) => f.id === field.id
                              );
                              if (target) {
                                target.selectedCheckbox = e.target.value;
                              }
                            });
                            setTemplate(updated);
                          }}
                        />
                        <label>{option}</label>
                      </div>
                    ))}
                  </div>
                ) : null}

                {field.type === "uploadFile" ? (
                  <>
                    <input
                      type="file"
                      className="file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100 dark:file:bg-violet-600 dark:file:text-violet-100 dark:hover:file:bg-violet-500 ..."
                      onChange={(e) => {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.onload = () => {
                          const updated = produce(template, (draft) => {
                            const target = draft.sections[0].fields.find(
                              (f) => f.id === field.id
                            );
                            if (target) {
                              target.file = reader.result;
                              target.fileName = file.name;
                            }
                          });
                          setTemplate(updated);
                        };
                        if (file) reader.readAsDataURL(file);
                      }}
                    />
                    {field.file && (
                      <div className="mt-2 text-sm">
                        Uploaded:{" "}
                        <a
                          href={field.file}
                          download={field.fileName || "file"}
                          className="link link-success"
                        >
                          {field.fileName || "Download File"}
                        </a>
                      </div>
                    )}
                  </>
                ) : null}

                {field.type === "image" ? (
                  <>
                    <input
                      type="file"
                      className="file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100 dark:file:bg-violet-600 dark:file:text-violet-100 dark:hover:file:bg-violet-500 ..."
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.onload = () => {
                          const updated = produce(template, (draft) => {
                            const target = draft.sections[0].fields.find(
                              (f) => f.id === field.id
                            );
                            if (target) {
                              target.file = reader.result;
                              target.fileName = file.name;
                            }
                          });
                          setTemplate(updated);
                        };
                        if (file) reader.readAsDataURL(file);
                      }}
                    />
                    {field.file && (
                      <div className="mt-2 text-sm">
                        Uploaded Image:{" "}
                        <a
                          href={field.file}
                          download={field.fileName || "file"}
                          className="link link-success"
                        >
                          {field.fileName || "Download Image"}
                        </a>
                      </div>
                    )}
                  </>
                ) : null}
                <div className="mt-4 flex justify-between">
                  <button
                    className="btn btn-ghost text-red-500 text-sm"
                    onClick={() => handleRemoveField(field.id)}
                  >
                    <Trash />
                  </button>
                  <button
                    className="btn btn-sm bg-black text-white hover:bg-gray-600 focus:outline-2 focus:outline-offset-2 focus:outline-gray-500 active:bg-gray-700 ..."
                    id="save-field-btn"
                    onClick={() => {
                      const updatedField = produce(template, (draft) => {
                        const fieldToUpdate = draft.sections[0].fields.find(
                          (f) => f.id === field.id
                        );
                        if (fieldToUpdate) {
                          fieldToUpdate.label = field.label || "";
                          fieldToUpdate.helpText = field.helpText || "";
                          fieldToUpdate.selectedOption =
                            field.selectedOption || "";
                          fieldToUpdate.selectedRadioOption =
                            field.selectedRadioOption;
                          fieldToUpdate.selectedOption = field.selectedOption;
                          fieldToUpdate.toggleValue = field.toggleValue;
                          fieldToUpdate.selectedCheckbox =
                            field.selectedCheckbox;
                          fieldToUpdate.file = field.file || null;
                        }
                      });
                      setTemplate(updatedField);
                      localStorage.setItem(
                        "updatedTemplate",
                        JSON.stringify(updatedField)
                      );
                    }}
                  >
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
                  onClick={() => handleAddField("checkbox")}
                  className="w-36 h-24 bg-gray-100 hover:bg-gray-200 rounded-lg flex flex-col justify-center items-center shadow-sm hover:shadow-md transition"
                >
                  <CheckSquare size={24} />
                  <span className="mt-2 text-sm font-medium">Checkbox</span>
                </button>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                MEDIA ELEMENT
              </p>
              <div className="flex gap-4 justify-between">
                <button
                  onClick={() => handleAddField("uploadFile")}
                  className="w-36 h-24 bg-gray-100 hover:bg-gray-200 rounded-lg flex flex-col justify-center items-center shadow-sm hover:shadow-md transition"
                >
                  <Upload size={24} />
                  <span className="mt-2 text-sm font-medium">Upload File</span>
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
