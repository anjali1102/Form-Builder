import React from "react";

function PreviewForm({ template }) {
  return (
    <div className="flex-1 p-8 bg-white">
      <h2 className="text-lg font-semibold mb-4">Form Preview</h2>
      <div className="space-y-4">
        {template.sections[0].fields.map((field) => (
          <div key={field.id} className="w-full max-w-xl">
            {field.type === "text" && (
              <>
                <input
                  type="text"
                  className="input input-bordered w-full mb-2"
                  value={field.label}
                  disabled
                />
                {field.helpText && (
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={field.helpText}
                    disabled
                  />
                )}
              </>
            )}
            {field.type === "paragraph" && (
              <>
                <input
                  type="text"
                  className="input input-bordered w-full pt-4 mb-2"
                  value={field.label}
                  disabled
                />
                {field.helpText && (
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={field.helpText}
                    disabled
                  />
                )}
              </>
            )}
            {field.type === "dropdown" && (
              <select
                className="select select-bordered w-full pt-4 mb-2"
                value={field.selectedOption}
                disabled
              >
                <option>{field.selectedOption}</option>
              </select>
            )}
            {field.type === "radio" && (
              <div className="space-y-2 item-center flex flex-col pt-4 mb-2">
                {field.options?.map((option, index) => (
                  <div className="flex gap-2" key={index}>
                    <input
                      key={index}
                      type="radio"
                      name={`radio-preview-${field.id}`}
                      value={option}
                      className="radio radio-secondary"
                      checked={field.selectedRadioOption === option}
                      disabled
                    />
                    <label>{option}</label>
                  </div>
                ))}
              </div>
            )}
            {field.type === "checkbox" && (
              <div className="space-y-2 item-center flex flex-col">
                {field.options?.map((option, index) => (
                  <div className="flex gap-2" key={index}>
                    <input
                      key={index}
                      type="checkbox"
                      name={`checkbox-preview-${field.id}`}
                      value={option}
                      className="checkbox checkbox-neutral"
                      checked={field.selectedCheckbox === option}
                      disabled
                    />
                    <label>{option}</label>
                  </div>
                ))}
              </div>
            )}
            {field.type === "toggle" && (
              <>
                <label className="mr-4 toggle-secondary">
                  {String(field.toggleValue)}
                </label>
                <input
                  name={`toggle-preview`}
                  type="checkbox"
                  checked={field.toggleValue || false}
                  className="toggle toggle-sm"
                  disabled
                />
              </>
            )}
            {field.type === "uploadFile" && field.file && (
              <div className="w-full max-w-sm p-4 bg-gray-100 rounded-lg border text-center">
                <p className="text-sm font-medium text-gray-700">
                  📎 {field.fileName || "Uploaded File"}
                </p>
                <a
                  href={field.file}
                  download={field.fileName || "File"}
                  className="link link-success"
                >
                  Download
                </a>
              </div>
            )}
            {field?.type === "image" && field?.file && (
              <div className="w-full max-w-sm p-4 bg-gray-100 rounded-lg border text-center">
                <p className="text-sm font-medium text-gray-700 mb-4">
                  📎 {field.fileName || "Uploaded File"}
                </p>
                <img
                  src={field.file}
                  alt={field.fileName || "Image"}
                  className="mx-auto max-h-48"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PreviewForm;
