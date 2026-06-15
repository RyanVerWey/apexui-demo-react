import React from "react";
import { createRoot } from "react-dom/client";
import "@apexui/tokens/css";
import "@apexui/react/styles.css";
import { Alert, AppBar, Avatar, Badge, Button, Card, Chart, Checkbox, DataTable, Grid, Progress, Rating, SearchForm, Select, Slider, Stack, Switch, Tabs, TextInput, Timeline, ToggleGroup, Typography } from "@apexui/react";
import "./styles.css";

type StatusRow = { area: string; owner: string; status: string };
const rows: StatusRow[] = [
  { area: "Tokens", owner: "Platform", status: "Live" },
  { area: "Components", owner: "Design", status: "Beta" },
  { area: "Routing", owner: "React", status: "Ready" }
];
const columns: Array<{ key: keyof StatusRow; header: string }> = [{ key: "area", header: "Area" }, { key: "owner", header: "Owner" }, { key: "status", header: "Status" }];

function App() {
  return <main className="demo-shell" data-apex-theme="gilded-light"><div className="demo-frame">
    <AppBar title="ApexUI React Ops" actions={<Button size="sm">Ship report</Button>} />
    <section className="demo-hero"><div className="demo-panel"><Stack gap="md"><Badge tone="info">React native package</Badge><Typography as="h1" variant="display">Launch cockpit built only with ApexUI</Typography><Typography variant="body">A product console proving tokens, forms, data, navigation, and charts from published npm packages.</Typography><div className="demo-actions"><Button>Approve release</Button><Button variant="secondary">View audit</Button><Avatar initials="RV" alt="Ryan VerWey" /></div><SearchForm label="Find component" placeholder="Search ApexUI" onSubmit={() => undefined} /></Stack></div><Card eyebrow="Readiness" title="Registry quality"><Stack gap="sm"><Progress label="MVP confidence" value={88} /><Rating label="DX rating" value={4} /><Switch label="Use selected theme" checked /><Checkbox label="Publish as public package" checked /></Stack></Card></section>
    <section className="demo-grid"><Chart label="Adoption" data={[{ label: "React", value: 94 }, { label: "Tokens", value: 88 }, { label: "Docs", value: 76 }]} /><Card eyebrow="Controls" title="Release options"><Stack gap="sm"><Select label="Theme" options={[{ label: "Gilded", value: "gilded" }, { label: "Graphite", value: "graphite" }]} /><Slider label="Coverage" defaultValue={82} /><ToggleGroup label="Mode" value="beta" options={[{ label: "Beta", value: "beta" }, { label: "Stable", value: "stable" }]} /></Stack></Card><Tabs label="Release phases" activeId="plan" onChange={() => undefined} items={[{ id: "plan", label: "Plan" }, { id: "ship", label: "Ship" }]} /></section>
    <section className="demo-workspace"><Timeline events={[{ id: "audit", label: "Audit", meta: "Done" }, { id: "publish", label: "Publish", meta: "Live" }, { id: "dogfood", label: "Dogfood", meta: "Now" }]} /><DataTable caption="Framework status" columns={columns} rows={rows} /></section><Alert tone="success" title="React demo live">This app installs @apexui/react and @apexui/tokens from npm.</Alert>
  </div></main>;
}

createRoot(document.getElementById("root")!).render(<App />);
