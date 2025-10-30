cat <<'EOF' > App.tsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './components/Header';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import Viewport from './components/Viewport';
import Console from './components/Console';
import type { SceneObject, FileNode, Vector3 } from './types';
import { mockScene, mockFiles } from './data/mapData';

// Helper function to recursively search and update the scene tree
const updateObjectInTree = (nodes: SceneObject[], id: string, updater: (node: SceneObject) => SceneObject): SceneObject[] => {
  return nodes.map(node => {
    if (node.id === id) {
      return updater(node);
    }
    if (node.children) {
      const updatedChildren = updateObjectInTree(node.children, id, updater);
      if (updatedChildren !== node.children) {
        return { ...node, children: updatedChildren };
      }
    }
    return node;
  });
};

// Helper function to recursively search and remove from the scene tree
const removeObjectFromTree = (nodes: SceneObject[], id: string): SceneObject[] => {
  return nodes.reduce((acc, node) => {
    if (node.id === id) {
      return acc; // Skip adding this node
    }
    if (node.children) {
      node.children = removeObjectFromTree(node.children, id);
    }
    acc.push(node);
    return acc;
  }, [] as SceneObject[]);
};


export default function App() {
  const [sceneObjects, setSceneObjects] = useState<SceneObject[]>(mockScene);
  const [selectedObject, setSelectedObject] = useState<SceneObject | null>(null);
  const [placementAsset, setPlacementAsset] = useState<FileNode | null>(null);
  const [focusRequest, setFocusRequest] = useState<SceneObject | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [leftPanelWidth, setLeftPanelWidth] = useState(300);
  const [rightPanelWidth, setRightPanelWidth] = useState(320);
  const [consoleHeight, setConsoleHeight] = useState(200);

  type DraggingDivider = 'left' | 'right' | 'horizontal' | null;
  const [draggingDivider, setDraggingDivider] = useState<DraggingDivider>(null);

  const appRef = useRef<HTMLDivElement>(null);

  const handlePlaceObject = useCallback((position: Vector3) => {
    if (!placementAsset) return;

    const newObject: SceneObject = {
      id: `${placementAsset.id}-${Date.now()}`,
      name: placementAsset.name.split('.')[0],
      type: 'object',
      visible: true,
      transform: {
        position,
        rotation: { x: 0, y: Math.random() * Math.PI * 2, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      },
      components: {
        mesh: { type: placementAsset.name.includes('tree') ? 'cone' : 'box' },
        material: { color: '#'+(Math.random()*0xFFFFFF<<0).toString(16).padStart(6, '0') }
      },
      children: [],
    };
    
    const updatedScene = JSON.parse(JSON.stringify(sceneObjects));
    const environment = updatedScene[0]?.children.find((child: SceneObject) => child.id === '3');
    if (environment) {
        environment.children.push(newObject);
        setSceneObjects(updatedScene);
    }

  }, [placementAsset, sceneObjects]);

  const handleSelectObject = (object: SceneObject | null) => {
    // If the same object is selected, deselect it. Otherwise, select the new one.
    setSelectedObject(prev => (prev?.id === object?.id ? null : object));
  };
  
  const handleDelete = () => {
    if (!selectedObject) return;
    setSceneObjects(prev => removeObjectFromTree(prev, selectedObject.id));
    setSelectedObject(null);
  };

  const handleToggleVisibility = () => {
    if (!selectedObject) return;
    const updatedScene = updateObjectInTree(sceneObjects, selectedObject.id, obj => ({
      ...obj,
      visible: !obj.visible,
    }));
    setSceneObjects(updatedScene);
    // Also update the selected object state to reflect the change immediately
    setSelectedObject(prev => prev ? { ...prev, visible: !prev.visible } : null);
  };
  
  const handleFocus = () => {
    if (selectedObject) {
      setFocusRequest(selectedObject);
      // Reset the request after a short delay to allow re-focusing on the same object
      setTimeout(() => setFocusRequest(null), 100);
    }
  };
  
  const handleRefresh = () => window.location.reload();
  
  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!draggingDivider) return;
    e.preventDefault();
    e.stopPropagation();

    if (draggingDivider === 'left') {
      const newWidth = e.clientX;
      setLeftPanelWidth(Math.max(200, Math.min(newWidth, window.innerWidth - rightPanelWidth - 400)));
    } else if (draggingDivider === 'right') {
      const newWidth = window.innerWidth - e.clientX;
      setRightPanelWidth(Math.max(200, Math.min(newWidth, window.innerWidth - leftPanelWidth - 400)));
    } else if (draggingDivider === 'horizontal') {
      if (!appRef.current) return;
      const mainContentTop = appRef.current.offsetTop + 48; // header height
      const newHeight = appRef.current.offsetHeight + mainContentTop - e.clientY;
      const totalHeight = appRef.current.offsetHeight - 48;
      setConsoleHeight(Math.max(80, Math.min(newHeight, totalHeight - 200)));
    }
  }, [draggingDivider, leftPanelWidth, rightPanelWidth]);

  const handleMouseUp = useCallback(() => setDraggingDivider(null), []);

  useEffect(() => {
    if (draggingDivider) {
      document.body.style.cursor = draggingDivider === 'horizontal' ? 'ns-resize' : 'ew-resize';
      document.body.style.userSelect = 'none';
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp, { once: true });
    }
    return () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingDivider, handleMouseMove, handleMouseUp]);

  return (
    <div ref={appRef} className="w-screen h-screen bg-[#0F0F12] text-[#DADEE5] font-sans flex flex-col overflow-hidden">
      <Header 
        onPlay={() => setIsPlaying(true)}
        onStop={() => setIsPlaying(false)}
        onFocus={handleFocus}
        onDelete={handleDelete}
        onToggleVisibility={handleToggleVisibility}
        onRefresh={handleRefresh}
        onFullscreen={handleFullscreen}
      />
      <div className="flex-grow flex flex-row min-h-0">
        <div style={{ width: `${leftPanelWidth}px` }} className="bg-[#1A1A1E] shrink-0">
          <LeftPanel 
            sceneObjects={sceneObjects} 
            files={mockFiles}
            selectedObject={selectedObject}
            onSelectObject={handleSelectObject}
            placementAsset={placementAsset}
            onSelectPlacementAsset={setPlacementAsset}
          />
        </div>

        <div 
          onMouseDown={() => setDraggingDivider('left')}
          className="w-1.5 cursor-ew-resize bg-[#0F0F12] hover:bg-[#0077FF] transition-colors duration-200"
        />

        <div className="flex-1 flex flex-col min-w-0 min-h-0">
           <div className="bg-black flex-1 relative min-h-0">
             <Viewport 
                sceneObjects={sceneObjects} 
                selectedObject={selectedObject} 
                placementAsset={placementAsset}
                onPlaceObject={handlePlaceObject}
                focusRequest={focusRequest}
                isPlaying={isPlaying}
             />
           </div>
           
           <div
             onMouseDown={() => setDraggingDivider('horizontal')}
             className="h-1.5 cursor-ns-resize bg-[#0F0F12] hover:bg-[#0077FF] transition-colors duration-200 shrink-0"
           />
           
           <div style={{ height: `${consoleHeight}px` }} className="bg-[#1A1A1E] shrink-0">
             <Console />
           </div>
        </div>
        
        <div 
          onMouseDown={() => setDraggingDivider('right')}
          className="w-1.5 cursor-ew-resize bg-[#0F0F12] hover:bg-[#0077FF] transition-colors duration-200"
        />

        <div style={{ width: `${rightPanelWidth}px` }} className="bg-[#1A1A1E] shrink-0">
          <RightPanel selectedObject={selectedObject} />
        </div>
      </div>
    </div>
  );
}
EOF
