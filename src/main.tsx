import React from "react";
import { createRoot, type Root } from "react-dom/client";
import "@apexui/tokens/css";
import "@apexui/react/styles.css";
import {
  Alert,
  AppBar,
  Autocomplete,
  Badge,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  Chart,
  Checkbox,
  Container,
  DataGrid,
  DataTable,
  DatePicker,
  Divider,
  EmptyState,
  FileUpload,
  Icon,
  Link,
  List,
  NumberField,
  Paper,
  Progress,
  RadioGroup,
  Rating,
  SearchForm,
  Select,
  Sidebar,
  Slider,
  Snackbar,
  Stack,
  Stepper,
  Switch,
  Tabs,
  Textarea,
  TextInput,
  Timeline,
  ToggleGroup,
  Toolbar,
  Typography,
  WorkflowBoard
} from "@apexui/react";
import "./styles.css";

type PackageRow = {
  package: React.ReactNode;
  role: React.ReactNode;
  usage: React.ReactNode;
  status: React.ReactNode;
};

type CustomerRow = {
  team: React.ReactNode;
  stack: React.ReactNode;
  outcome: React.ReactNode;
};

const packageColumns: Array<{ key: keyof PackageRow; header: string }> = [
  { key: "package", header: "Package" },
  { key: "role", header: "Role" },
  { key: "usage", header: "Usage" },
  { key: "status", header: "Status" }
];

const packageRows: PackageRow[] = [
  { package: "@apexui/react", role: "Product UI", usage: "Shells, forms, charts, data", status: <Badge tone="success">Live</Badge> },
  { package: "@apexui/tokens", role: "Theme source", usage: "Gilded light and dark", status: <Badge tone="success">Active</Badge> },
  { package: "GitHub Pages", role: "Proof", usage: "Public demo deployment", status: <Badge tone="info">Deployed</Badge> }
];

const customerColumns: Array<{ key: keyof CustomerRow; header: string }> = [
  { key: "team", header: "Team" },
  { key: "stack", header: "Stack" },
  { key: "outcome", header: "Outcome" }
];

const customerRows: CustomerRow[] = [
  { team: "Acme Design Ops", stack: "React + tokens", outcome: "One launch surface across web apps" },
  { team: "Northstar Platform", stack: "React + web components", outcome: "Shared workflows without a rewrite" },
  { team: "Ledger Product", stack: "React + i18n", outcome: "Theme and locale checks before release" }
];

const boardColumns = [
  {
    id: "intake",
    title: "Intake",
    items: [
      { id: "brief", title: "Capture launch brief", meta: "SearchForm, TextInput" },
      { id: "theme", title: "Pick theme mode", meta: "Switch, ToggleGroup" }
    ]
  },
  {
    id: "build",
    title: "Build",
    items: [
      { id: "layout", title: "Compose product shell", meta: "AppBar, Sidebar, Grid" },
      { id: "data", title: "Wire evidence", meta: "Chart, DataTable" }
    ]
  },
  {
    id: "ship",
    title: "Ship",
    items: [
      { id: "qa", title: "Verify accessibility", meta: "Progress, Alert" },
      { id: "docs", title: "Publish package notes", meta: "Timeline, EmptyState" }
    ]
  }
];

const calendarDays = Array.from({ length: 35 }, (_, index) => {
  const day = index - 1;
  return {
    id: `day-${index}`,
    label: day > 0 && day < 31 ? String(day) : "",
    muted: day <= 0 || day >= 31,
    selected: day === 18,
    badge: day === 7 ? "QA" : day === 18 ? "Ship" : day === 24 ? "Docs" : undefined
  };
});

const implementationSteps = [
  { id: "install", label: "Install", description: "Add @apexui/react and @apexui/tokens." },
  { id: "theme", label: "Theme", description: "Scope data-apex-theme at the app shell." },
  { id: "compose", label: "Compose", description: "Use atoms and molecules to build the page." },
  { id: "ship", label: "Ship", description: "Deploy and dogfood the package API." }
];

function App() {
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const [activeView, setActiveView] = React.useState("launch");
  const [activeNav, setActiveNav] = React.useState("overview");
  const [quality, setQuality] = React.useState(91);
  const [tone, setTone] = React.useState("balanced");
  const [packageName, setPackageName] = React.useState("@apexui/react");
  const [toastOpen, setToastOpen] = React.useState(true);
  const theme = `gilded-${mode}`;

  const handleSidebarSelect = (value: string | React.SyntheticEvent<HTMLElement>) => {
    if (typeof value === "string") {
      setActiveNav(value);
    }
  };

  return (
    <main className="site-shell" data-apex-theme={theme}>
      <AppBar
        title="ApexUI"
        navigation={<Breadcrumbs items={[{ label: "Demos", href: "#" }, { label: "React", current: true }]} />}
        actions={
          <Stack direction="row" gap="sm" align="center" className="site-actions">
            <Button variant="secondary" size="sm">Docs</Button>
            <Button size="sm">Start build</Button>
            <Switch label="Dark" checked={mode === "dark"} onChange={() => setMode((value) => (value === "light" ? "dark" : "light"))} />
          </Stack>
        }
      />

      <section className="site-hero">
        <Container size="lg">
          <div className="hero-grid">
            <Stack gap="lg" className="hero-copy">
              <Stack gap="sm">
                <Badge tone="success" className="site-kicker">React package in practice</Badge>
                <Typography as="h1" variant="display" className="hero-title">
                  Ship a release cockpit with ApexUI React.
                </Typography>
                <Typography variant="subtitle" className="hero-subtitle">
                  A complete product site with launch planning, theme QA, data review, forms, and package evidence, all composed from ApexUI components.
                </Typography>
              </Stack>

              <Stack direction="row" gap="sm" align="center" className="site-actions">
                <Button>Plan a release</Button>
                <Button variant="secondary">View package proof</Button>
                <Link href="https://www.npmjs.com/package/@apexui/react" variant="standalone">npm package</Link>
              </Stack>

              <Paper as="div" elevation="sm" className="proof-strip">
                <div className="proof-item">
                  <Typography variant="title">42+</Typography>
                  <Typography variant="caption">React exports used for real composition</Typography>
                </div>
                <div className="proof-item">
                  <Typography variant="title">2 modes</Typography>
                  <Typography variant="caption">Gilded light and dark are scoped on the shell.</Typography>
                </div>
                <div className="proof-item">
                  <Typography variant="title">0 add-ons</Typography>
                  <Typography variant="caption">No external UI library or restyled ApexUI controls.</Typography>
                </div>
              </Paper>
            </Stack>

            <Paper elevation="md" className="product-scene">
              <div className="scene-header">
                <Stack gap="sm">
                  <Badge tone="info" className="site-kicker">Live workspace</Badge>
                  <Typography variant="title">Launch room</Typography>
                </Stack>
                <div className="site-actions">
                  <ButtonGroup label="Theme mode">
                    <Button size="sm" variant={mode === "light" ? "primary" : "secondary"} onClick={() => setMode("light")}>Light</Button>
                    <Button size="sm" variant={mode === "dark" ? "primary" : "secondary"} onClick={() => setMode("dark")}>Dark</Button>
                  </ButtonGroup>
                </div>
              </div>
              <Stack gap="md">
                <SearchForm label="Find package work" placeholder="Search component, owner, release" onSubmit={() => undefined} />
                <Chart
                  label="Release health"
                  data={[
                    { label: "Theme", value: 96 },
                    { label: "Forms", value: 88 },
                    { label: "Data", value: 91 },
                    { label: "Docs", value: 83 }
                  ]}
                />
                <div className="scene-summary" aria-label="Release summary">
                  <div>
                    <Typography variant="caption">Readiness</Typography>
                    <Typography variant="title">91%</Typography>
                  </div>
                  <div>
                    <Typography variant="caption">Theme scope</Typography>
                    <Typography variant="title">{theme}</Typography>
                  </div>
                  <div>
                    <Typography variant="caption">Package</Typography>
                    <Typography variant="title">Live</Typography>
                  </div>
                </div>
                <Timeline
                  events={[
                    { id: "install", label: "Install package", description: "React and token CSS loaded from npm.", meta: "Done" },
                    { id: "compose", label: "Compose page", description: "Website and app workspace share ApexUI controls.", meta: "Now" },
                    { id: "deploy", label: "Deploy proof", description: "GitHub Pages publishes the working surface.", meta: "Next" }
                  ]}
                />
              </Stack>
            </Paper>
          </div>
        </Container>
      </section>

      <Container size="lg" className="site-main">
        <section className="section-stack">
          <div className="section-heading">
            <Stack gap="sm">
              <Badge tone="info" className="site-kicker">Why teams use it</Badge>
              <Typography as="h2" variant="title">A product surface, not a preview grid.</Typography>
            </Stack>
            <Typography variant="body">
              The public story and the operating workspace share the same tokens, forms, data, and navigation.
            </Typography>
          </div>

          <div className="value-layout">
            <Paper elevation="sm" className="value-statement">
              <Stack gap="md">
                <Badge tone="info" className="site-kicker">System proof</Badge>
                <Typography variant="title">One page has to prove the whole contract: tokens, components, routing, and workflow.</Typography>
                <Typography variant="body">ApexUI should feel useful before a team reads docs. This React demo shows the package as a production surface with real decisions, not a catalog dressed as an app.</Typography>
              </Stack>
            </Paper>
            <List
              className="value-list"
              items={[
                { id: "site", label: "Website composition", description: "Hero, proof band, customer evidence, and implementation path use ApexUI primitives.", meta: <Badge tone="success">Visible</Badge> },
                { id: "app", label: "Workspace composition", description: "Sidebar, toolbar, tabs, board, data table, forms, calendar, and feedback run the workflow.", meta: <Badge tone="info">Interactive</Badge> },
                { id: "package", label: "Package dogfood", description: "Every visible control comes from @apexui/react with token CSS scoped by theme.", meta: <Badge tone="success">Registry ready</Badge> }
              ]}
            />
          </div>
        </section>

        <section className="section-stack">
          <div className="section-heading">
            <Stack gap="sm">
              <Badge tone="success" className="site-kicker">In practice</Badge>
              <Typography as="h2" variant="title">ApexUI running the actual workflow.</Typography>
            </Stack>
            <Typography variant="body">
              This is where the demo stops selling and starts operating: navigation, launch planning, forms, data, theme QA, and package proof.
            </Typography>
          </div>
        </section>

        <section className="app-demo" aria-labelledby="workspace-heading">
          <Paper elevation="md" className="workspace-shell">
            <div className="app-layout">
            <Sidebar
              activeId={activeNav}
              heading="Workspace"
              label="Launch sections"
              onSelect={handleSidebarSelect}
              items={[
                { id: "overview", label: "Overview", icon: <Icon name="home" />, badge: <Badge tone="success">Live</Badge> },
                { id: "packages", label: "Packages", icon: <Icon name="package" /> },
                { id: "themes", label: "Themes", icon: <Icon name="palette" /> },
                { id: "customers", label: "Customers", icon: <Icon name="users" /> }
              ]}
              footer={<Alert tone="info" title="Atomic use">Controls compose sections, sections compose this product page.</Alert>}
            />

            <Stack gap="lg" className="workspace-panel">
              <Toolbar
                label="Product workspace"
                actions={
                  <ButtonGroup label="Workspace actions">
                    <Button size="sm">Invite reviewer</Button>
                    <Button size="sm" variant="secondary">Export report</Button>
                  </ButtonGroup>
                }
              >
                <Badge tone="success">{theme}</Badge>
              </Toolbar>

              <Tabs
                label="Workspace view"
                activeId={activeView}
                onChange={setActiveView}
                items={[
                  { id: "launch", label: "Launch plan" },
                  { id: "theme", label: "Theme QA" },
                  { id: "evidence", label: "Evidence" }
                ]}
              />

              <div className="workspace-grid">
                <WorkflowBoard columns={boardColumns} />
                <Card eyebrow="Release controls" title="Configure the train">
                  <Stack gap="md">
                    <Autocomplete
                      label="Package"
                      value={packageName}
                      onChange={(event) => setPackageName(event.currentTarget.value)}
                      options={["@apexui/react", "@apexui/tokens", "apexui-demo-react"]}
                    />
                    <Select label="Theme family" value="gilded" options={[{ label: "Gilded", value: "gilded" }]} disabled />
                    <DatePicker label="Ship date" defaultValue="2026-06-20" />
                    <NumberField label="Release candidate" defaultValue={1} min={1} />
                    <Textarea label="Launch note" defaultValue="React demo proves ApexUI in an end-to-end product website." />
                  </Stack>
                </Card>
              </div>

              <div className="workspace-grid workspace-grid-tight">
                <Card eyebrow="Theme quality" title="Gilded mode checks">
                  <Stack gap="md">
                    <ToggleGroup
                      label="Product tone"
                      value={tone}
                      onValueChange={setTone}
                      options={[
                        { label: "Focused", value: "focused" },
                        { label: "Balanced", value: "balanced" },
                        { label: "Rich", value: "rich" }
                      ]}
                    />
                    <Progress label="Accessibility pass" value={quality} />
                    <Slider label="Quality target" value={quality} onChange={(event) => setQuality(Number(event.currentTarget.value))} />
                    <Rating label="Executive fit" value={4} />
                    <Checkbox label="Publish as public package proof" defaultChecked />
                  </Stack>
                </Card>

                <DataTable caption="Package readiness" columns={packageColumns} rows={packageRows} />
              </div>
            </Stack>
            </div>
          </Paper>
        </section>

        <section className="section-stack">
          <div className="section-heading">
            <Stack gap="sm">
              <Badge tone="info" className="site-kicker">Implementation</Badge>
              <Typography as="h2" variant="title">From install to shipped page.</Typography>
            </Stack>
            <Button variant="secondary">Copy install command</Button>
          </div>

          <div className="two-column">
            <Card eyebrow="Developer path" title="Four steps to a working app">
              <Stepper activeIndex={3} steps={implementationSteps} />
            </Card>
            <Card eyebrow="Launch calendar" title="Team schedule">
              <Calendar
                label="June launch plan"
                monthLabel="June 2026"
                weekdays={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
                days={calendarDays}
              />
            </Card>
          </div>
        </section>

        <section className="section-stack">
          <div className="section-heading">
            <Stack gap="sm">
              <Badge tone="success" className="site-kicker">Evidence</Badge>
              <Typography as="h2" variant="title">Proof beyond the hero.</Typography>
            </Stack>
            <Typography variant="body">Real data surfaces show what teams would manage after adoption.</Typography>
          </div>

          <div className="two-column two-column-wide">
            <DataGrid caption="Customer rollout examples" columns={customerColumns} rows={customerRows} />
            <Card eyebrow="Intake form" title="Request migration help">
              <Stack gap="md">
                <TextInput label="Workstream" defaultValue="React package adoption" />
                <RadioGroup
                  label="Timeline"
                  name="timeline"
                  value="this-week"
                  options={[
                    { label: "This week", value: "this-week" },
                    { label: "This month", value: "this-month" }
                  ]}
                />
                <FileUpload label="Attach current UI audit" description="Use screenshots or JSON reports." files={[{ name: "react-pages-smoke.txt", meta: "verified" }]} />
                <Button>Send request</Button>
              </Stack>
            </Card>
          </div>
        </section>

        <section className="section-stack">
          <EmptyState
            title="Ready to build a real product surface"
            description="ApexUI React is shown here as a complete website and operating workflow, not as a preview grid."
            action={
              <Stack direction="row" gap="sm" align="center" className="site-actions">
                <Button>Start with React</Button>
                <Button variant="secondary">Compare frameworks</Button>
              </Stack>
            }
          />
        </section>
      </Container>

      <Snackbar
        open={toastOpen}
        tone="info"
        action={<Button size="sm" variant="secondary" onClick={() => setToastOpen(false)}>Dismiss</Button>}
      >
        React demo rebuilt as full ApexUI product website.
      </Snackbar>
    </main>
  );
}

type RootElement = HTMLElement & { __apexRoot?: Root };

const rootElement = document.getElementById("root") as RootElement;
const root = rootElement.__apexRoot ?? createRoot(rootElement);
rootElement.__apexRoot = root;
root.render(<App />);
