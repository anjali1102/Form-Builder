import { useDraggable } from "@dnd-kit/core";

function DraggableSidebarItem({ type, label, icon: Icon }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `draggable-${type}`,
    data: { type, label, icon: Icon },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="w-36 h-24 bg-gray-100 hover:bg-gray-200 rounded-lg flex flex-col justify-center items-center shadow-sm hover:shadow-md transition cursor-grab active:cursor-grabbing"
    >
      {Icon}
      <span className="mt-2 text-sm font-medium">{label}</span>
    </div>
  );
}

export default DraggableSidebarItem;
