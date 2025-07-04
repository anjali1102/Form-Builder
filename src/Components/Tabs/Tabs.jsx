import React from "react";

function Tabs() {
  return (
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
  );
}

export default Tabs;
