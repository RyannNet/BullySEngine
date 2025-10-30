cat <<'EOF' > components/RightPanel.tsx
import React from 'react';
import type { SceneObject, Vector3 } from '../types';

const Vector3Input = ({ label, value }: { label: string, value: Vector3 }) => (
  <div className="grid grid-cols-[15px_1fr_1fr_1fr] gap-x-2 items-center">
    <label className="text-sm font-bold text-gray-400">{label}</label>
    <div className="flex items-center bg-[#25252A] rounded-sm border border-black/50">
      <span className="text-xs px-1.5 text-red-400 font-mono">X</span>
      <input type="number" defaultValue={value.x.toFixed(2)} className="w-full bg-transparent text-right p-0.5 text-xs outline-none" />
    </div>
    <div className="flex items-center bg-[#25252A] rounded-sm border border-black/50">
      <span className="text-xs px-1.5 text-green-400 font-mono">Y</span>
      <input type="number" defaultValue={value.y.toFixed(2)} className="w-full bg-transparent text-right p-0.5 text-xs outline-none" />
    </div>
    <div className="flex items-center bg-[#25252A] rounded-sm border border-black/50">
      <span className="text-xs px-1.5 text-blue-400 font-mono">Z</span>
      <input type="number" defaultValue={value.z.toFixed(2)} className="w-full bg-transparent text-right p-0.5 text-xs outline-none" />
    </div>
  </div>
);

const ColorInput = ({ label, value }: { label: string, value: string }) => (
  <div className="flex items-center justify-between">
    <label className="text-xs text-gray-400">{label}</label>
    <div className="flex items-center gap-2 bg-[#25252A] rounded-sm border border-black/50 px-2 py-1">
        <span className="text-xs">{value.toUpperCase()}</span>
        <input type="color" defaultValue={value} className="w-5 h-5 bg-transparent border-none rounded-sm cursor-pointer" />
    </div>
  </div>
);

const TextInput = ({ label, value }: { label: string, value: string }) => (
    <div className="flex items-center justify-between">
        <label className="text-xs text-gray-400">{label}</label>
        <input type="text" readOnly value={value} className="w-2/3 bg-[#25252A] text-right p-0.5 text-xs outline-none rounded-sm border border-black/50 px-2" />
    </div>
);


const ComponentHeader = ({ title }: { title: string }) => (
  <h3 className="text-md font-bold text-gray-300 border-b border-white/10 pb-1 mb-2">{title}</h3>
);

export default function RightPanel({ selectedObject }: { selectedObject: SceneObject | null }) {
  return (
    <div className="flex flex-col h-full text-sm">
      <div className="p-2 bg-[#25252A] font-bold text-base border-b border-black/50">Inspector</div>
      <div className="flex-1 p-3 overflow-y-auto">
        {selectedObject ? (
          <div className="space-y-6">
            <input type="text" defaultValue={selectedObject.name} className="w-full p-1 bg-transparent text-xl font-semibold border-b border-transparent focus:border-white/20 outline-none" />
            
            {/* Transform Component */}
            <div>
              <ComponentHeader title="Transform" />
              <div className="space-y-2 p-2 bg-black/20 rounded-md">
                <Vector3Input label="P" value={selectedObject.transform.position} />
                <Vector3Input label="R" value={selectedObject.transform.rotation} />
                <Vector3Input label="S" value={selectedObject.transform.scale} />
              </div>
            </div>

            {/* Mesh Component */}
            {selectedObject.components?.mesh && (
                <div>
                    <ComponentHeader title="Mesh" />
                    <div className="space-y-2 p-2 bg-black/20 rounded-md">
                       <TextInput label="Type" value={selectedObject.components.mesh.type.toUpperCase()} />
                    </div>
                </div>
            )}
            
            {/* Material Component */}
            {selectedObject.components?.material && (
                <div>
                    <ComponentHeader title="Material" />
                    <div className="space-y-2 p-2 bg-black/20 rounded-md">
                        <ColorInput label="Color" value={selectedObject.components.material.color} />
                        <TextInput label="Texture" value={selectedObject.components.material.texture || 'None'} />
                    </div>
                </div>
            )}
            
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-600">
            <p>Select an object to inspect</p>
          </div>
        )}
      </div>
    </div>
  );
}
EOF
