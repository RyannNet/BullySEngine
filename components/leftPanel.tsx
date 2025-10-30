cat <<'EOF' > components/LeftPanel.tsx
import React from 'react';
import type { SceneObject, FileNode } from '../types';
import { FolderIcon, FileIcon, ModelIcon, ScriptIcon, CubeIcon, CameraIcon, LightIcon, GroupIcon, TextureIcon } from './icons';

interface LeftPanelProps {
  sceneObjects: SceneObject[];
  files: FileNode[];
  selectedObject: SceneObject | null;
  onSelectObject: (object: SceneObject | null) => void;
  placementAsset: FileNode | null;
  onSelectPlacementAsset: (file: FileNode | null) => void;
}

const SceneTree = ({ objects, level = 0, selectedObject, onSelectObject }: { objects: SceneObject[], level?: number, selectedObject: SceneObject | null, onSelectObject: (object: SceneObject | null) => void }) => {
  const getIcon = (type: SceneObject['type']) => {
    switch (type) {
      case 'object': return <CubeIcon className="w-4 h-4 mr-2 shrink-0" />;
      case 'group': return <GroupIcon className="w-4 h-4 mr-2 shrink-0" />;
      case 'camera': return <CameraIcon className="w-4 h-4 mr-2 shrink-0" />;
      case 'light': return <LightIcon className="w-4 h-4 mr-2 shrink-0" />;
      default: return <CubeIcon className="w-4 h-4 mr-2 shrink-0" />;
    }
  };

  return (
    <div>
      {objects.map(obj => (
        <div key={obj.id}>
          <div 
            className={`flex items-center p-1 rounded cursor-pointer transition-colors duration-100 ${selectedObject?.id === obj.id ? 'bg-[#0077FF]/80 text-white' : 'hover:bg-white/10'}`}
            style={{ paddingLeft: `${level * 16 + 4}px` }}
            onClick={(e) => {
                e.stopPropagation();
                onSelectObject(obj);
            }}
          >
            {getIcon(obj.type)}
            <span className={`truncate ${!obj.visible ? 'text-[#DADEE5]/50' : ''}`}>{obj.name}</span>
          </div>
          {obj.children && obj.children.length > 0 && (
            <SceneTree objects={obj.children} level={level + 1} selectedObject={selectedObject} onSelectObject={onSelectObject} />
          )}
        </div>
      ))}
    </div>
  );
};

const FileTree = ({ files, level = 0, selectedAsset, onSelectAsset }: { files: FileNode[], level?: number, selectedAsset: FileNode | null, onSelectAsset: (file: FileNode | null) => void }) => {
  const getIcon = (file: FileNode) => {
    if (file.type === 'folder') {
      return <FolderIcon className="w-4 h-4 mr-2 shrink-0" />;
    }
    switch (file.fileType) {
        case 'model': return <ModelIcon className="w-4 h-4 mr-2 shrink-0" />;
        case 'script': return <ScriptIcon className="w-4 h-4 mr-2 shrink-0" />;
        case 'texture': return <TextureIcon className="w-4 h-4 mr-2 shrink-0" />;
        default: return <FileIcon className="w-4 h-4 mr-2 shrink-0" />;
    }
  };

  const handleFileClick = (file: FileNode) => {
    if (file.fileType === 'model') {
      if (selectedAsset?.id === file.id) {
        onSelectAsset(null);
      } else {
        onSelectAsset(file);
      }
    }
  }
    
  return (
    <div>
      {files.map(file => (
        <div key={file.id}>
          <div 
            className={`flex items-center p-1 rounded transition-colors duration-100 ${file.fileType === 'model' ? 'cursor-pointer' : 'cursor-default'} 
            ${selectedAsset?.id === file.id ? 'bg-green-600/80 text-white' : file.fileType === 'model' ? 'hover:bg-white/10' : ''}`}
            style={{ paddingLeft: `${level * 16 + 4}px` }}
            onClick={() => handleFileClick(file)}
          >
            {getIcon(file)}
            <span className="truncate">{file.name}</span>
          </div>
          {file.children && file.children.length > 0 && (
            <FileTree files={file.children} level={level + 1} selectedAsset={selectedAsset} onSelectAsset={onSelectAsset} />
          )}
        </div>
      ))}
    </div>
  );
};

export default function LeftPanel({ sceneObjects, files, selectedObject, onSelectObject, placementAsset, onSelectPlacementAsset }: LeftPanelProps) {
  return (
    <div className="flex flex-col h-full text-sm">
      <div className="p-2 bg-[#25252A] font-bold text-base border-b border-black/50">Scene</div>
      <div className="flex-1 p-1 overflow-y-auto">
        <SceneTree objects={sceneObjects} selectedObject={selectedObject} onSelectObject={onSelectObject} />
      </div>
      <div className="p-2 bg-[#25252A] font-bold text-base border-t border-black/50">Assets</div>
      <div className="flex-1 p-1 overflow-y-auto">
        <FileTree files={files} selectedAsset={placementAsset} onSelectAsset={onSelectPlacementAsset} />
      </div>
    </div>
  );
}
EOF
