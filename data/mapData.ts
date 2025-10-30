cat <<'EOF' > data/mapData.ts
import type { SceneObject, FileNode } from '../types';

export const mockScene: SceneObject[] = [
  {
    id: '1',
    name: 'Main Scene',
    type: 'group',
    visible: true,
    transform: { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } },
    children: [
      {
        id: '2',
        name: 'Player',
        type: 'object',
        visible: true,
        transform: { position: { x: 0, y: 0.5, z: 5 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } },
        components: {
            mesh: { type: 'capsule' },
            material: { color: '#00aeff' }
        },
        children: [],
      },
      {
        id: '3',
        name: 'Environment',
        type: 'group',
        visible: true,
        transform: { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } },
        children: [],
      },
      {
        id: '5',
        name: 'Main Camera',
        type: 'camera',
        visible: true,
        transform: { position: { x: 0, y: 10, z: 20 }, rotation: { x: -0.5, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } },
        children: [],
      },
      {
        id: '6',
        name: 'Directional Light',
        type: 'light',
        visible: true,
        transform: { position: { x: 10, y: 20, z: 10 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } },
        children: [],
      },
    ],
  },
];


export const mockFiles: FileNode[] = [
    {
        id: 'f1',
        name: 'Assets',
        type: 'folder',
        children: [
            { id: 'f2', name: 'Models', type: 'folder', children: [
                { id: 'f3', name: 'player.glb', type: 'file', fileType: 'model' },
                { id: 'f8', name: 'tree.glb', type: 'file', fileType: 'model' },
                { id: 'f9', name: 'rock.glb', type: 'file', fileType: 'model' },
            ]},
            { id: 'f4', name: 'Textures', type: 'folder', children: [
                 { id: 'f10', name: 'grass_albedo.png', type: 'file', fileType: 'texture' },
                 { id: 'f11', name: 'rock_normal.png', type: 'file', fileType: 'texture' },
            ]},
            { id: 'f5', name: 'Scripts', type: 'folder', children: [
                 { id: 'f6', name: 'player_controller.js', type: 'file', fileType: 'script' }
            ]},
        ]
    },
    {
        id: 'f7',
        name: 'README.md',
        type: 'file'
    }
];
EOF
