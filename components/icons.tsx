cat <<'EOF' > components/icons.tsx
import React from 'react';

// Common props for SVG elements to maintain consistency
const commonProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 -960 960 960",
  fill: "currentColor"
};

// --- Toolbar Controls ---

export const PlayIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...commonProps} {...props}>
    <path d="M380-300v-360l280 180-280 180Z"/>
  </svg>
);

export const StopIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...commonProps} {...props}>
    <path d="M320-320v-320h320v320H320Z"/>
  </svg>
);

export const RefreshIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...commonProps} {...props}>
      <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-54-87-87t-121-33q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"/>
    </svg>
);
  
export const FullscreenIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...commonProps} {...props}>
      <path d="M220-160q-24 0-42-18t-18-42v-290h80v290h290v80H220Zm530-380v-290H460v-80h290q24 0 42 18t18 42v290h-80Z"/>
  </svg>
);

export const FocusIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...commonProps} {...props}>
        <path d="M480-320q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM200-160q-17 0-28.5-11.5T160-200v-120h80v120h120v80H200Zm440 0v-80h120v-120h80v120q0 17-11.5 28.5T800-160H640ZM200-600v-120q0-17 11.5-28.5T240-760h120v80H240v120h-80Zm560 0v-120H640v-80h120q17 0 28.5 11.5T800-720v120h-80Z"/>
    </svg>
);

export const DeleteIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...commonProps} {...props}>
        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
    </svg>
);

export const ToggleVisibilityIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...commonProps} {...props}>
        <path d="M480-320q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-80q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0 200q-147 0-273-81T40-500q54-139 181-220t259-81q132 0 259 81t181 220q-54 139-181 220t-259 81Z"/>
    </svg>
);

export const SettingsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...commonProps} {...props}>
        <path d="m480-160-40-168q-33-14-63-34t-54-46l-152 72-100-174 136-104q-2-16-2-32t2-32L80-680l100-174 152 72q24-26 54-46t63-34l40-168h200l40 168q33 14 63 34t54 46l152-72 100 174-136 104q2 16 2 32t-2 32l136 104-100 174-152-72q-24 26-54 46t-63 34L580-160H380Zm100-220q58 0 100-42t42-100q0-58-42-100t-100-42q-58 0-100 42t-42 100q0 58 42 100t100 42Z"/>
    </svg>
);

export const EnvironmentIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...commonProps} {...props}>
        <path d="m216-160-56-56 224-224 140 140 224-224 56 56-280 280-140-140-224 224ZM120-120q-33 0-56.5-23.5T40-200v-560q0-33 23.5-56.5T120-840h720q33 0 56.5 23.5T920-760v560q0 33-23.5 56.5T840-120H120Z"/>
    </svg>
);

export const DownloadIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...commonProps} {...props}>
        <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/>
    </svg>
);

export const SourceCodeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...commonProps} {...props}>
        <path d="m320-241 113-113-113-113 57-57 170 170-170 170-57-57Zm321 1-57-57 113-113-113-113 57-57 170 170-170 170Z"/>
    </svg>
);

// --- File System & Scene Tree ---

export const FolderIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...commonProps} {...props}>
    <path d="M200-160q-33 0-56.5-23.5T120-240v-480q0-33 23.5-56.5T200-800h240l80 80h240q33 0 56.5 23.5T840-640v400q0 33-23.5 56.5T760-160H200Z"/>
  </svg>
);

export const FileIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...commonProps} {...props}>
    <path d="M240-120q-33 0-56.5-23.5T160-200v-560q0-33 23.5-56.5T240-840h360l160 160v440q0 33-23.5 56.5T720-120H240Zm320-520v-120H240v560h480v-440H560ZM240-760v120-120v560-560Z"/>
  </svg>
);

export const ModelIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...commonProps} {...props}>
      <path d="M480-120 210-330l52-52 218 218 218-218 52 52L480-120Zm0-248L210-578l52-52 218 218 218-218 52 52L480-368Zm0-242L210-820l52-52 218 218 218-218 52 52L480-610Z"/>
    </svg>
);

export const ScriptIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...commonProps} {...props}>
    <path d="m320-241 113-113-113-113 57-57 170 170-170 170-57-57Zm321 1-57-57 113-113-113-113 57-57 170 170-170 170Z"/>
  </svg>
);

export const CubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...commonProps} {...props}>
        <path d="m160-200 320-160 320 160-320 160-320-160Zm0-80v-400l320-160 320 160v400l-320 160-320-160Zm80-354 240-120 240 120-240 120-240-120Zm240 554 240-120v-268l-240 120v268Zm-320-160Z"/>
    </svg>
);

export const CameraIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...commonProps} {...props}>
    <path d="M480-400q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-240q-33 0-56.5-23.5T160-320v-320q0-33 23.5-56.5T240-720h480q33 0 56.5 23.5T800-640v320q0 33-23.5 56.5T720-240H240Z"/>
  </svg>
);

export const LightIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...commonProps} {...props}>
        <path d="M480-80q-116 0-198-82t-82-198q0-83 40-153t108-115v-132h64v132q68-45 108-115t40-153q0 116-82 198t-198 82Zm0-80q83 0 141.5-58.5T680-360q0-83-58.5-141.5T480-560q-83 0-141.5 58.5T280-360q0 83 58.5 141.5T480-160Zm0-200Z M400-800h160v-160H400v160Z"/>
    </svg>
);

export const GroupIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...commonProps} {...props}>
        <path d="M120-280v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Z"/>
    </svg>
);

export const TextureIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...commonProps} {...props}>
        <path d="M200-120q-33 0-56.5-23.5T120-200v-240q0-33 23.5-56.5T200-520h240q33 0 56.5 23.5T520-440v240q0 33-23.5 56.5T440-120H200Zm320 0q-33 0-56.5-23.5T440-200v-240q0-33 23.5-56.5T520-520h240q33 0 56.5 23.5T840-440v240q0 33-23.5 56.5T760-120H520Zm-320-320q-33 0-56.5-23.5T120-520v-240q0-33 23.5-56.5T200-840h240q33 0 56.5 23.5T520-760v240q0 33-23.5 56.5T440-440H200Zm320 0q-33 0-56.5-23.5T440-520v-240q0-33 23.5-56.5T520-840h240q33 0 56.5 23.5T840-760v240q0 33-23.5 56.5T760-440H520Z"/>
    </svg>
);

// --- Brand Icons ---

export const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);
EOF
