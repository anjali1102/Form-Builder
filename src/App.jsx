import { useState } from "react";
import "./App.css";
import {
  CheckSquare,
  ChevronDown,
  Image,
  Radio,
  Rows2,
  ToggleLeft,
  Type,
  Upload,
} from "lucide-react";
import { produce } from "immer";
import Navbar from "./Components/Navbar/Navbar";
import Search from "./Components/Search/Search";
import Tabs from "./Components/Tabs/Tabs";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import Canvas from "./Components/Canvas/Canvas";
import DraggableSidebarItem from "./Components/DraggableSideBarItem/DraggableSideBarItem";

function App() {
  const [activeDragItem, setActiveDragItem] = useState(null);
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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

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

    const updatedTemplate = produce(template, (draft) => {
      draft.sections[0].fields.push(newField);
    });

    setTemplate(updatedTemplate);
    localStorage.setItem("updatedTemplate", JSON.stringify(updatedTemplate));
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

  function handleDragStart(e) {
    setActiveDragItem(e.active.data.current);
  }

  function handleDragEnd(e) {
    const { active, over } = e;

    if (over?.id === "canvas-dropzone" && active?.data?.current?.type) {
      handleAddField(active.data.current.type);
    }
    setActiveDragItem(null);
  }

  return (
    <>
      <Navbar template={template} />
      <main className="flex min-h-screen flex justify-between bg-white">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex justify-center w-screen mt-8">
            <div className="flex justify-between ">
              <Canvas
                fields={template.sections[0].fields}
                template={template}
                setTemplate={setTemplate}
                handleRemoveField={handleRemoveField}
              />
            </div>
          </div>
          <div className="w-[340px] bg-white text-black p-4 shadow-md border-r">
            <Tabs />
            <Search />
            <div className="mb-6">
              <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                TEXT ELEMENTS
              </p>
              <div className="flex gap-4 justify-between">
                <DraggableSidebarItem
                  type="text"
                  label="Short Answers"
                  icon={<Type />}
                />
                <DraggableSidebarItem
                  type="paragraph"
                  label="Paragraph"
                  icon={<Rows2 />}
                />
              </div>
            </div>
            <div className="mb-6">
              <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                MULTIPLE CHOICE
              </p>
              <div className="grid grid-cols-2 gap-4">
                <DraggableSidebarItem
                  type="dropdown"
                  label="Dropdown"
                  icon={<ChevronDown />}
                />
                <DraggableSidebarItem
                  type="radio"
                  label="Radio"
                  icon={<Radio />}
                />
                <DraggableSidebarItem
                  type="toggle"
                  label="Yes / No"
                  icon={<ToggleLeft />}
                />
                <DraggableSidebarItem
                  type="checkbox"
                  label="Checkbox"
                  icon={<CheckSquare />}
                />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                MEDIA ELEMENT
              </p>
              <div className="flex gap-4 justify-between">
                <DraggableSidebarItem
                  type="uploadFile"
                  label="Upload File"
                  icon={<Upload />}
                />
                <DraggableSidebarItem
                  type="image"
                  label="Upload Image"
                  icon={<Image />}
                />
              </div>
            </div>
          </div>
          <DragOverlay>
            {activeDragItem ? (
              <div className="w-36 h-24 bg-blue-500 text-white rounded-lg flex flex-col justify-center items-center shadow-lg cursor-grabbing opacity-80">
                {typeof activeDragItem.icon === "function" ? (
                  <activeDragItem.icon size={24} />
                ) : (
                  activeDragItem.icon
                )}
                <span className="mt-2 text-sm font-medium">
                  {activeDragItem.label}
                </span>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </main>
    </>
  );
}

export default App;
