import { NextResponse } from "next/server";

type Task = { title: string; agent: string; state: string; detail: string };

const baseTasks: Task[] = [
  { title: "Define the core gameplay loop", agent: "Game Designer", state: "Queued", detail: "Clicks, rewards, upgrades and progression" },
  { title: "Design the economy and balancing rules", agent: "Game Designer", state: "Queued", detail: "Prices, multipliers and pacing targets" },
  { title: "Specify server-authoritative gameplay", agent: "Luau Engineer", state: "Queued", detail: "Remote validation, cooldowns and persistence" },
  { title: "Draft the starter world layout", agent: "World Builder", state: "Queued", detail: "Spawn area, shop, egg zone and portals" },
  { title: "Define HUD and shop screens", agent: "UI Designer", state: "Queued", detail: "Responsive Roblox UI component specification" },
  { title: "Write multiplayer and exploit test cases", agent: "QA Tester", state: "Queued", detail: "Abuse cases, edge cases and regression checks" },
  { title: "Set performance budgets", agent: "Optimizer", state: "Queued", detail: "Instance counts, replication and memory targets" },
  { title: "Prepare project validation checklist", agent: "Build & Release", state: "Queued", detail: "Rojo structure, build checks and release gates" }
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const gameName = typeof body.gameName === "string" ? body.gameName.trim().slice(0, 80) : "";
    const prompt = typeof body.prompt === "string" ? body.prompt.trim().slice(0, 2000) : "";
    const gameMode = typeof body.gameMode === "string" ? body.gameMode.slice(0, 60) : "Single-player";
    if (!gameName || !prompt) {
      return NextResponse.json({ error: "Add a project name and game brief first." }, { status: 400 });
    }
    const keywords = prompt.toLowerCase();
    const tasks = baseTasks.map((task) => {
      if (keywords.includes("pet") && task.agent === "Game Designer" && task.title.includes("core")) {
        return { ...task, detail: "Clicks, rewards, upgrades, pets and progression" };
      }
      return task;
    });
    return NextResponse.json({
      project: { gameName, gameMode, brief: prompt },
      tasks,
      note: "This is the deterministic planning baseline. Model-backed agent execution is not enabled yet."
    });
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
}
