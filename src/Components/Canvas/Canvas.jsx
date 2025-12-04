import React from "react";
import { Trash } from "lucide-react";
import { produce } from "immer";
import { useDroppable } from "@dnd-kit/core";

function Canvas({ fields, template, setTemplate, handleRemoveField }) {
  const { setNodeRef } = useDroppable({ id: "canvas-dropzone" });
  return (
    <div
      ref={setNodeRef}
      id="canvas-dropzone"
      className="flex-1 p-4 md:p-8 bg-gray-50 min-h-screen w-[450px]"
    >
      <h2 className="text-lg font-semibold mb-4">Form Builder Area</h2>
      {fields.map((field) => (
        <form key={field.id} onSubmit={(e) => e.preventDefault()}>
          <div className="bg-white rounded-xl border p-4 mb-4 shadow-sm w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">
                {`${field.type[0].toUpperCase()}${field.type.slice(1)} Field`}
              </h4>
              <label className="flex items-center gap-2 text-sm">
                Make as required
                <input
                  type="checkbox"
                  className="toggle toggle-sm"
                  onChange={(e) => {
                    const updated = produce(template, (draft) => {
                      const toBeUpdated = draft.sections[0].fields.find(
                        (f) => f.id === field.id
                      );
                      if (toBeUpdated) {
                        toBeUpdated.required = e.target.checked;
                      }
                    });
                    setTemplate(updated);
                  }}
                  checked={field.required || false}
                />
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
                  required={field.required}
                />
                <input
                  type="text"
                  placeholder="Add help text"
                  className="input input-bordered w-full"
                  id="fieldHelpText"
                  value={field.helpText}
                  onChange={(e) => {
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
                  required={field.required}
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
                  }}
                  required={field.required}
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
                      required={field.required}
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
                        target.toggleValue = e.target.checked;
                      }
                    });
                    setTemplate(updated);
                  }}
                />
              </div>
            ) : null}

            {field.type === "checkbox" ? (
              <div className="space-y-2 item-center flex flex-col">
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
                      required={field.required}
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
                  required={field.required}
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
                  required={field.required}
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
                type="submit"
                onClick={() => {
                  const updatedField = produce(template, (draft) => {
                    const fieldToUpdate = draft.sections[0].fields.find(
                      (f) => f.id === field.id
                    );
                    if (fieldToUpdate) {
                      fieldToUpdate.label = field.label || "";
                      fieldToUpdate.helpText = field.helpText || "";
                      fieldToUpdate.selectedOption = field.selectedOption || "";
                      fieldToUpdate.selectedRadioOption =
                        field.selectedRadioOption;
                      fieldToUpdate.selectedOption = field.selectedOption;
                      fieldToUpdate.toggleValue = field.toggleValue;
                      fieldToUpdate.selectedCheckbox = field.selectedCheckbox;
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
        </form>
      ))}
    </div>
  );
}

export default Canvas;
