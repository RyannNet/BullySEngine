cat <<'EOF' > types.ts
export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface Transform {
  position: Vector3;
  rotation: Vector3;
  scale: Vector3;
}

export interface MaterialComponent {
    color: string;
    texture?: string; // Path to texture file
    // more properties like roughness, metalness etc. can be added
}

export interface MeshComponent {
    type: 'box' | 'sphere' | 'capsule' | 'cone' | 'custom';
    // more properties like vertices, faces for custom meshes
}

export interface SceneObject {
  id: string;
  name: string;
  type: 'object' | 'group' | 'camera' | 'light';
  transform: Transform;
  children: SceneObject[];
  visible: boolean;
  components?: {
    mesh?: MeshComponent;
    material?: MaterialComponent;
    // other components like scripts, physics bodies, etc.
  };
}

export interface FileNode {
    id: string;
    name: string;
    type: 'folder' | 'file';
    fileType?: 'model' | 'texture' | 'script';
    children?: FileNode[];
}
EOF
