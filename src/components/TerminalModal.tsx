import React, { useState, useEffect, useRef } from 'react';
import { THEME_PRESETS, applyTheme, getSavedTheme } from '../services/themeService';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TermOutputItem {
  id: string;
  type: 'banner' | 'prompt' | 'output';
  content: string;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({
  isOpen,
  onClose
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [outputs, setOutputs] = useState<TermOutputItem[]>([
    {
      id: 'init-banner',
      type: 'banner',
      content: `
        <div class="term-block">
          <span class="text-green">Linux ruchir-workstation 6.8.0-enterprise #1 SMP PREEMPT_DYNAMIC x86_64</span><br>
          Type <span class="term-accent">'help'</span> or <span class="term-accent">'neofetch'</span> to display system diagnostics.<br>
        </div>
      `
    }
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const outputContainerRef = useRef<HTMLDivElement>(null);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current && window.innerWidth > 768) {
          inputRef.current.focus();
        }
        scrollToBottom();
      }, 100);
    }
  }, [isOpen]);

  // Scroll to bottom when output changes
  const scrollToBottom = () => {
    if (outputContainerRef.current) {
      outputContainerRef.current.scrollTop = outputContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [outputs]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    // Add to history
    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    // Add prompt line
    const promptItem: TermOutputItem = {
      id: `prompt-${Date.now()}`,
      type: 'prompt',
      content: `
        <div class="term-prompt-line">
          <span class="text-green">ruchir@arch-server</span>:<span class="text-amber">~</span>$ <span class="text-white">${cmd}</span>
        </div>
      `
    };

    const cmdLower = cmd.toLowerCase();

    let outputHtml = '';

    if (cmdLower === 'clear') {
      setOutputs([]);
      return;
    } else if (cmdLower === 'help') {
      outputHtml = `
        <span class="term-highlight">Builtin Linux Commands:</span><br>
        &bull; <span class="term-accent">neofetch</span>   - Print system telemetry &amp; architecture summary<br>
        &bull; <span class="term-accent">whoami</span>     - Engineer identity &amp; focus<br>
        &bull; <span class="term-accent">experience</span> - Career history (Accenture, EV Software, iEnergizer)<br>
        &bull; <span class="term-accent">projects</span>   - Production microservices &amp; AI engines<br>
        &bull; <span class="term-accent">skills</span>     - Capabilities matrix<br>
        &bull; <span class="term-accent">github</span>     - Open source telemetry &amp; repo link<br>
        &bull; <span class="term-accent">medium</span>     - Technical engineering publications<br>
        &bull; <span class="term-accent">vsco</span>       - Photography gallery &amp; visual diary<br>
        &bull; <span class="term-accent">theme</span>      - Change accent color (e.g. 'theme cyan', 'theme #ff007f')<br>
        &bull; <span class="term-accent">resume</span>     - Fetch PDF curriculum vitae<br>
        &bull; <span class="term-accent">contact</span>    - Communication sockets (LinkedIn, GitHub)<br>
        &bull; <span class="term-accent">clear</span>      - Flush terminal buffer<br>
        &bull; <span class="term-accent">exit</span>       - Exit CLI session<br>
      `;
    } else if (cmdLower === 'neofetch') {
      outputHtml = `
        <span class="text-green">       /\\         ruchir@enterprise-arch</span><br>
        <span class="text-green">      /  \\        ----------------------</span><br>
        <span class="text-green">     /\\   \\       OS:</span> RuchirOS Linux x86_64<br>
        <span class="text-green">    /      \\      Host:</span> Accenture High-Concurrency Node<br>
        <span class="text-green">   /   ,,   \\     Kernel:</span> 6.8.0-distributed-sys<br>
        <span class="text-green">  /   |  |  -\\    Uptime:</span> 5+ Years Active<br>
        <span class="text-green"> /_-''    ''-_\\   Packages:</span> 16 (Node.js, MSSQL, React, Redis)<br>
        <span class="text-green">                  Shell:</span> zsh 5.9 (powerlevel10k)<br>
        <span class="text-green">                  Throughput:</span> 500+ WebSocket Connections<br>
      `;
    } else if (cmdLower === 'whoami') {
      outputHtml = `
        <span class="term-highlight">Ruchir Gupta</span><br>
        <span class="text-secondary">Senior Software Engineer &bull; Backend Developer</span><br>
        Organization: Accenture (12/2024 &mdash; Present)<br>
        Core Focus: Distributed Systems, High-Concurrency WebSockets, MS SQL Tuning, Azure OpenAI Automation.<br>
        Experience: 5+ Years in production enterprise software.<br>
      `;
    } else if (cmdLower === 'experience') {
      outputHtml = `
        <span class="term-highlight">Production Career Log</span><br><br>
        <span class="term-accent">[12/2024 - Present] Accenture &mdash; Senior Software Engineer</span><br>
        &bull; Automated Chat Auditing Engine (OpenAI API + MS SQL, -70% QA overhead).<br>
        &bull; Real-time Break Management Portal (WebSockets, 500+ live concurrent nodes).<br>
        &bull; AI Rapid Response Resolution Engine (Azure OpenAI, -60% latency).<br>
        &bull; Teams Voice Bot IT Assistant.<br><br>
        <span class="term-accent">[08/2022 - 12/2024] EV Software Solutions &mdash; Full Stack Engineer</span><br>
        &bull; Scaled React architecture for dev team of 25 engineers (+55% velocity).<br>
        &bull; Spearheaded enterprise platform (+45% engagement lift).<br>
        &bull; Improved UI speed by 60% with custom state lifecycle tuning.<br>
        &bull; Integrated DataDog &amp; Sentry observability.<br>
      `;
    } else if (cmdLower === 'projects') {
      outputHtml = `
        <span class="term-highlight">Deployed Systems</span><br><br>
        1. <span class="term-accent">Chat Sentinel:</span> Automated QA audit pipeline via OpenAI API &amp; MS SQL (-70% QA overhead).<br>
        2. <span class="term-accent">SyncShift:</span> WebSocket synchronization portal for 500+ concurrent agents.<br>
        3. <span class="term-accent">ApexResolve:</span> Azure OpenAI tier-1 ticket resolution pipeline (-60% response time).<br>
        4. <span class="term-accent">Teams VoiceBot:</span> Conversational voice bot for enterprise IT triage.<br>
        5. <span class="term-accent">OmniPortal:</span> High-velocity React/Redux platform (+45% user engagement).<br>
        6. <span class="term-accent">Cyber Tesseract 3D:</span> Hardware-accelerated Three.js WebGL matrix wireframe.<br>
      `;
    } else if (cmdLower === 'github' || cmdLower === 'git') {
      outputHtml = `
        <span class="term-highlight">GitHub Telemetry Daemon</span><br>
        Target Profile: <a href="https://github.com/rchrx" target="_blank" rel="noopener noreferrer" class="term-accent">https://github.com/rchrx</a><br>
        Status: Public repositories active &bull; Main branch automated via CI/CD<br>
        View the live contribution chart under section <strong>[5:github]</strong>.<br>
      `;
    } else if (cmdLower === 'medium' || cmdLower === 'articles') {
      outputHtml = `
        <span class="term-highlight">Medium Engineering Publications</span><br>
        Direct URL: <a href="https://medium.com/@rchrx" target="_blank" rel="noopener noreferrer" class="term-accent">https://medium.com/@rchrx</a><br>
        Focus Areas: Distributed Systems, High-Concurrency WebSockets, Azure OpenAI, and React Velocity.<br>
        <span class="text-green">[LAUNCH]</span> Opened @rchrx Medium publications in external browser tab.
      `;
      window.open('https://medium.com/@rchrx', '_blank', 'noopener,noreferrer');
    } else if (cmdLower === 'vsco' || cmdLower === 'photos' || cmdLower === 'gallery') {
      outputHtml = `
        <span class="term-highlight">VSCO Visual Frame Buffer</span><br>
        Direct URL: <a href="https://vsco.co/rchrx" target="_blank" rel="noopener noreferrer" class="term-accent">https://vsco.co/rchrx</a><br>
        Visual Focus: Urban Brutalism, Cyber Neon, 35mm Analog, and Perspective Geometry.<br>
        <span class="text-green">[LAUNCH]</span> Opened @rchrx VSCO gallery in external browser tab.
      `;
      window.open('https://vsco.co/rchrx', '_blank', 'noopener,noreferrer');
    } else if (cmdLower === 'skills') {
      outputHtml = `
        <span class="term-highlight">Stack Matrix</span><br><br>
        [Backend] Node.js, Express.js, MS SQL, PostgreSQL, WebSockets, RESTful APIs.<br>
        [AI/LLM] Azure OpenAI, OpenAI API, LLM Triage, Voice Bots, Prompt Engineering.<br>
        [Frontend] React.js, Next.js, Redux, TypeScript, Modern CSS/HTML.<br>
        [DevOps/Infra] Docker, Azure Cloud, Git/GitHub, CI/CD, DataDog, Sentry, Zsh/Bash.<br>
      `;
    } else if (cmdLower === 'resume') {
      outputHtml = '<span class="text-secondary">Initiating wget RuchirGupta-SoftwareEngineer.pdf...</span>';
      const link = document.createElement('a');
      link.href = 'assets/RuchirGupta-SoftwareEngineer.pdf';
      link.download = 'RuchirGupta-SoftwareEngineer.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (cmdLower === 'contact') {
      outputHtml = `
        <span class="term-highlight">Socket Endpoints:</span><br>
        &bull; LinkedIn: <a href="https://www.linkedin.com/in/rchrx" target="_blank" rel="noopener noreferrer">linkedin.com/in/rchrx</a><br>
        &bull; GitHub: <a href="https://github.com/rchrx" target="_blank" rel="noopener noreferrer">github.com/rchrx</a><br>
      `;
    } else if (cmdLower === 'theme' || cmdLower.startsWith('theme ') || cmdLower.startsWith('color ') || cmdLower === 'color') {
      const parts = cmd.trim().split(/\s+/);
      if (parts.length === 1) {
        const currentHex = getSavedTheme();
        const currentPreset = THEME_PRESETS.find((p) => p.hex.toLowerCase() === currentHex.toLowerCase());
        outputHtml = `
          <span class="term-highlight">Phosphor Accent Theme Daemon</span><br>
          Active Accent: <strong style="color:${currentHex}">${currentPreset ? currentPreset.name : currentHex} (${currentHex})</strong><br><br>
          Usage:<br>
          &bull; <span class="term-accent">theme &lt;name&gt;</span> &mdash; Switch to preset palette<br>
          &bull; <span class="term-accent">theme &lt;#hex&gt;</span> &mdash; Set custom color (e.g. <code>theme #ff007f</code>)<br><br>
          Available Presets:<br>
          ${THEME_PRESETS.map((p) => `&bull; <span style="color:${p.hex}; font-weight:700;">${p.id}</span> &mdash; ${p.name} (${p.hex})`).join('<br>')}
        `;
      } else {
        const arg = parts.slice(1).join(' ').trim();
        const result = applyTheme(arg);
        if (result.success) {
          outputHtml = `
            <span class="text-green">[SUCCESS]</span> Accent color switched to <strong style="color:${result.hex}">${result.name}</strong>.<br>
            HUD accents, 3D WebGL mesh, and GitHub matrix synced immediately.
          `;
        } else {
          outputHtml = `
            <span class="text-red">[ERROR]</span> Invalid color or preset: '<code>${arg}</code>'.<br>
            Use a preset (<strong>matrix, cyan, amber, purple, orange, crimson</strong>) or a valid hex code (e.g. <code>#00ff66</code>).
          `;
        }
      }
    } else if (cmdLower === 'exit') {
      outputHtml = '<span class="text-secondary">Session terminated.</span>';
      setTimeout(() => onClose(), 250);
    } else if (cmdLower === 'uname' || cmdLower === 'uname -a') {
      outputHtml = 'Linux ruchir-enterprise 6.8.0-42-generic #42-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux';
    } else if (cmdLower === 'uptime') {
      outputHtml = 'up 5 years, 142 days, 3 users, load average: 0.12, 0.08, 0.05';
    } else if (cmdLower === 'sudo') {
      outputHtml = '<span class="text-secondary">[sudo] password for ruchir: **********<br>ruchir is in the sudoers file. This incident will not be reported.</span>';
    } else {
      outputHtml = `bash: command not found: ${cmd}. Type <span class="term-accent">'help'</span> for available commands.`;
    }

    const responseItem: TermOutputItem = {
      id: `resp-${Date.now()}`,
      type: 'output',
      content: outputHtml
    };

    setOutputs((prev) => [...prev, promptItem, responseItem]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInputVal(history[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        if (historyIndex < history.length - 1) {
          const nextIndex = historyIndex + 1;
          setHistoryIndex(nextIndex);
          setInputVal(history[nextIndex]);
        } else {
          setHistoryIndex(-1);
          setInputVal('');
        }
      }
    }
  };

  const handleQuickChip = (cmd: string) => {
    executeCommand(cmd);
    if (inputRef.current && window.innerWidth > 768) {
      inputRef.current.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="macos-modal-backdrop open"
      id="terminal-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="terminal-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="macos-modal-container">
        <div className="macos-terminal-window">
          {/* Window Titlebar */}
          <div className="macos-titlebar">
            <div className="traffic-lights">
              <button
                className="traffic-light light-close"
                id="modal-close-btn"
                title="Close (Esc)"
                aria-label="Close"
                onClick={onClose}
              ></button>
              <button className="traffic-light light-min" title="Minimize" aria-label="Minimize"></button>
              <button className="traffic-light light-zoom" title="Zoom" aria-label="Zoom"></button>
            </div>
            <div className="macos-terminal-title" id="terminal-modal-title">
              <span>ruchir@enterprise-arch: ~ (zsh)</span>
            </div>
            <div className="titlebar-hint">
              <span>esc or 'exit' to quit</span>
            </div>
          </div>

          {/* Quick Action Bar */}
          <div className="terminal-quick-bar">
            <span className="quick-label">Execute:</span>
            {['neofetch', 'help', 'whoami', 'experience', 'projects', 'skills', 'github', 'medium', 'vsco', 'theme', 'resume', 'clear'].map((chip) => (
              <button
                key={chip}
                className="quick-chip"
                onClick={() => handleQuickChip(chip)}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Terminal Output Stream */}
          <div className="macos-terminal-body" id="modal-terminal-output" ref={outputContainerRef}>
            {outputs.map((item) => (
              <div
                key={item.id}
                className="term-block"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            ))}
          </div>

          {/* Terminal Command Input Line */}
          <div className="macos-input-bar">
            <span className="cli-prompt">
              <span className="user-txt">ruchir</span>@<span className="host-txt">arch-server</span>:<span className="path-txt">~</span>$
            </span>
            <input
              type="text"
              ref={inputRef}
              id="modal-command-input"
              className="macos-input"
              autoComplete="off"
              spellCheck="false"
              placeholder="Type a command (e.g. 'neofetch', 'help')..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="cli-submit-btn"
              id="cli-submit-btn"
              aria-label="Run command"
              onClick={() => {
                executeCommand(inputVal);
                setInputVal('');
                if (inputRef.current) inputRef.current.focus();
              }}
            >
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
