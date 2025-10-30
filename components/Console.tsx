cat <<'EOF' > components/Console.tsx
import React from 'react';

export default function Console() {
  return (
    <div className="flex flex-col h-full text-sm">
      <div className="p-2 bg-[#25252A] font-bold text-base border-t border-black/50">Console</div>
      <div className="flex-1 p-2 overflow-y-auto font-mono text-xs text-[#DADEE5]/80">
        <p><span className="text-green-500">&gt;</span> Engine initialized successfully.</p>
        <p><span className="text-green-500">&gt;</span> Ready for commands...</p>
      </div>
    </div>
  );
}
EOF
