"use client";

import { useMemo, useState } from "react";
import {
  Activity, ArrowRight, Bot, Boxes, Check, ChevronDown, CircleHelp,
  Code2, Compass, Cpu, Gamepad2, Layers3, Menu, Plus, Rocket,
  ShieldCheck, Sparkles, WandSparkles, Workflow, Zap
} from "lucide-react";

const agents = [
  { name: "Game Director", role: "Plans work and coordinates the team", icon: Compass, color: "violet", status: "Ready" },
  { name: "Game Designer", role: "Economy, upgrades and progression", icon: Sparkles, color: "amber", status: "Ready" },
  { name: "Luau Engineer", role: "Roblox systems and server logic", icon: Code2, color: "blue", status: "Ready" },
  { name: "World Builder", role: "World layouts and environment specs", icon: Boxes, color: "green", status: "Ready" },
  { name: "UI Designer", role: "HUD, shops and inventory screens", icon: Layers3, color: "pink", status: "Ready" },
  { name: "QA Tester", role: "Test plans and regression checks", icon: ShieldCheck, color: "cyan", status: "Ready" },
  { name: "Optimizer", role: "Performance and network budgets", icon: Activity, color: "orange", status: "Ready" },
  { name: "Build & Release", role: "Validation and release preparation", icon: Rocket, color: "slate", status: "Ready" },
];

const initialTasks = [
  { title: "Define clicker economy", agent: "Game Designer", state: "In review", detail: "Coins, click power, upgrade costs and pacing" },
  { title: "Create server-authoritative click loop", agent: "Luau Engineer", state: "Queued", detail: "Remote validation, cooldowns and rewards" },
  { title: "Draft starter world layout", agent: "World Builder", state: "Queued", detail: "Spawn island, shop zone and portal locations" },
];

export default function Home() {
  const [gameName, setGameName] = useState("Cosmic Clicker Simulator");
  const [gameMode, setGameMode] = useState("Single-player + Multiplayer");
  const [prompt, setPrompt] = useState("Build a 3D clicker simulator with coins, upgrades, pets, eggs, rebirths and unlockable worlds.");
  const [tasks, setTasks] = useState(initialTasks);
  const [activeTab, setActiveTab] = useState("Overview");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  const completed = useMemo(() => tasks.filter((task) => task.state === "Done").length, [tasks]);

  async function createPlan() {
    if (!prompt.trim() || busy) return;
    setBusy(true);
    setNotice("");
    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameName, gameMode, prompt }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not create plan");
      setTasks(data.tasks);
      setNotice("Project plan created. Tasks are ready for agent execution.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark"><Gamepad2 size={21} /></div><div><strong>SIMFORGE</strong><span>ROBLOX AI STUDIO</span></div></div>
        <div className="workspace-label">WORKSPACE</div>
        <button className="workspace-switch"><span className="workspace-avatar">C</span><span><b>Creator workspace</b><small>Personal project</small></span><ChevronDown size={15} /></button>
        <nav className="nav-list">
          {["Overview", "Agent team", "Task board", "Project files"].map((item) => <button key={item} className={activeTab === item ? "nav-item active" : "nav-item"} onClick={() => setActiveTab(item)}>{item === "Overview" ? <Compass size={17} /> : item === "Agent team" ? <Bot size={17} /> : item === "Task board" ? <Workflow size={17} /> : <Code2 size={17} />}{item}</button>)}
        </nav>
        <div className="sidebar-bottom"><div className="help-card"><CircleHelp size={18} /><div><b>Need a hand?</b><span>Learn how your agent team works.</span></div><ArrowRight size={15} /></div><div className="profile"><div className="profile-avatar">CR</div><div><b>Creator</b><span>Free workspace</span></div><Menu size={17} /></div></div>
      </aside>

      <section className="main-area">
        <header className="topbar"><div className="breadcrumbs">Projects <span>/</span> <b>{gameName}</b></div><div className="top-actions"><span className="connection"><i /> Workspace ready</span><button className="icon-button" aria-label="Help"><CircleHelp size={18} /></button><div className="top-avatar">CR</div></div></header>
        <div className="content">
          <div className="page-heading"><div><div className="eyebrow"><span className="eyebrow-dot" /> AI GAME WORKSPACE</div><h1>Build your next <em>Roblox hit.</em></h1><p>One game brief. A coordinated team of specialist agents. Your creative direction stays in control.</p></div><button className="primary-button" onClick={createPlan} disabled={busy}><WandSparkles size={16} />{busy ? "Planning..." : "Generate project plan"}</button></div>

          <div className="project-banner">
            <div className="project-art"><div className="planet planet-one" /><div className="planet planet-two" /><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="art-core"><Gamepad2 size={30} /></div><span className="art-star star-one">✦</span><span className="art-star star-two">✧</span></div>
            <div className="project-info"><div className="project-kicker">CURRENT PROJECT <span className="status-pill"><i /> Draft</span></div><h2>{gameName}</h2><p>3D Simulator <span>·</span> {gameMode}</p><div className="project-meta"><span><Zap size={14} /> Core loop: Click & upgrade</span><span><Layers3 size={14} /> 8 specialist agents</span></div></div>
            <button className="subtle-button" onClick={() => setNotice("Project settings will be added in the next build.")}>Project settings <ArrowRight size={15} /></button>
          </div>

          <div className="section-heading"><div><h2>Agent team</h2><p>Specialists assigned to your simulator project</p></div><span className="count-pill">08 AGENTS</span></div>
          <div className="agent-grid">{agents.map((agent) => { const Icon = agent.icon; return <article className="agent-card" key={agent.name}><div className={"agent-icon " + agent.color}><Icon size={19} /></div><div className="agent-status"><i /> {agent.status}</div><h3>{agent.name}</h3><p>{agent.role}</p><button onClick={() => setNotice(agent.name + " is defined, but its execution workflow is not connected yet.")}>View role <ArrowRight size={13} /></button></article>; })}</div>

          <div className="lower-grid">
            <section className="panel brief-panel"><div className="panel-heading"><div><h2>Game brief</h2><p>Give the Director the outcome you want.</p></div><span className="panel-icon"><Sparkles size={17} /></span></div><label>PROJECT NAME</label><input value={gameName} onChange={(e) => setGameName(e.target.value)} /><label>GAME MODE</label><select value={gameMode} onChange={(e) => setGameMode(e.target.value)}><option>Single-player + Multiplayer</option><option>Single-player</option><option>Multiplayer</option></select><label>YOUR GAME IDEA</label><textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={4} /><button className="primary-button full" onClick={createPlan} disabled={busy}><Sparkles size={15} />{busy ? "Creating..." : "Ask Game Director"}<ArrowRight size={15} /></button></section>
            <section className="panel task-panel"><div className="panel-heading"><div><h2>Execution board</h2><p>Planned work across your agent team.</p></div><span className="task-total">{completed}/{tasks.length} done</span></div><div className="progress-track"><div style={{ width: tasks.length ? (completed / tasks.length * 100) + "%" : "0%" }} /></div><div className="task-list">{tasks.map((task, index) => <div className="task-row" key={task.title}><div className={"task-check " + (task.state === "Done" ? "done" : "")}>{task.state === "Done" ? <Check size={13} /> : <span>{String(index + 1).padStart(2, "0")}</span>}</div><div className="task-copy"><b>{task.title}</b><span>{task.agent} · {task.detail}</span></div><span className={"task-state " + task.state.toLowerCase().replace(" ", "-")}>{task.state}</span></div>)}</div><button className="text-button" onClick={() => setActiveTab("Task board")}>Open task board <ArrowRight size={14} /></button></section>
          </div>
          {notice && <div className="notice" role="status">{notice}<button onClick={() => setNotice("")}>Dismiss</button></div>}
          <footer><span>SIMFORGE STUDIO <b>·</b> BUILD WITH INTENT</span><span>Roblox gameplay runs on Roblox servers. This studio manages planning and project files.</span></footer>
        </div>
      </section>
    </main>
  );
}
