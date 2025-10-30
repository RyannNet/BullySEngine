cat <<'EOF' > components/Header.tsx
import React from 'react';
import { 
  PlayIcon, 
  StopIcon, 
  GithubIcon, 
  RefreshIcon, 
  FullscreenIcon,
  FocusIcon,
  DeleteIcon,
  ToggleVisibilityIcon,
  SettingsIcon,
  EnvironmentIcon,
  DownloadIcon,
  SourceCodeIcon
} from './icons';

interface HeaderProps {
    onPlay: () => void;
    onStop: () => void;
    onFocus: () => void;
    onDelete: () => void;
    onToggleVisibility: () => void;
    onRefresh: () => void;
    onFullscreen: () => void;
}

export default function Header({ onPlay, onStop, onFocus, onDelete, onToggleVisibility, onRefresh, onFullscreen }: HeaderProps) {
  const buttonClass = "p-1.5 rounded text-[#DADEE5]/80 hover:bg-[#0077FF]/20 hover:text-[#DADEE5] transition-colors disabled:text-gray-600 disabled:hover:bg-transparent";
  const destructiveButtonClass = "p-1.5 rounded text-[#D40700] hover:bg-[#D40700]/20 transition-colors disabled:text-gray-600 disabled:hover:bg-transparent";
  
  return (
    <div className="w-full h-12 bg-[#25252A] flex items-center justify-between px-4 shrink-0 border-b border-black/50 shadow-md">
      {/* Left: Brand & Source */}
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold text-[#DADEE5] tracking-wider">BullyEngine</h1>
        <a 
          href="https://github.com/your-repo/bully-engine" 
          target="_blank" 
          rel="noopener noreferrer"
          title="View on GitHub"
          className="p-1.5 rounded text-gray-400 hover:text-[#DADEE5] hover:bg-white/10 transition-colors"
        >
          <GithubIcon className="w-5 h-5" />
        </a>
      </div>
      
      {/* Center: Main Toolbar */}
      <div className="flex items-center gap-1.5">
        <button className={buttonClass} title="Play" onClick={onPlay}>
          <PlayIcon className="w-5 h-5" />
        </button>
        <button className={destructiveButtonClass} title="Stop" onClick={onStop}>
          <StopIcon className="w-5 h-5" />
        </button>
        
        <div className="w-px h-6 bg-black/30 mx-2"></div>

        <button className={buttonClass} title="Focus on selected object" onClick={onFocus}>
          <FocusIcon className="w-5 h-5" />
        </button>
        <button className={destructiveButtonClass} title="Delete selected object" onClick={onDelete}>
          <DeleteIcon className="w-5 h-5" />
        </button>
        <button className={buttonClass} title="Toggle object visibility" onClick={onToggleVisibility}>
          <ToggleVisibilityIcon className="w-5 h-5" />
        </button>
        
        <div className="w-px h-6 bg-black/30 mx-2"></div>

        <button className={buttonClass} title="Editor Settings" onClick={() => console.log('Open Editor Settings')}>
          <SettingsIcon className="w-5 h-5" />
        </button>
        <button className={buttonClass} title="Environment Settings" onClick={() => console.log('Open Environment Settings')}>
          <EnvironmentIcon className="w-5 h-5" />
        </button>
        
        <div className="w-px h-6 bg-black/30 mx-2"></div>
        
        <button className={buttonClass} title="Download/Export project" onClick={() => console.log('Open Export Dialog')}>
          <DownloadIcon className="w-5 h-5" />
        </button>
        <button className={buttonClass} title="Download engine source code" onClick={() => window.open('https://github.com/your-repo/bully-engine', '_blank')}>
          <SourceCodeIcon className="w-5 h-5" />
        </button>
      </div>

       {/* Right: Window Controls */}
       <div className="flex items-center gap-2">
         <button className={buttonClass} title="Refresh" onClick={onRefresh}>
          <RefreshIcon className="w-5 h-5" />
        </button>
        <button className={buttonClass} title="Toggle Fullscreen" onClick={onFullscreen}>
          <FullscreenIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
EOF
