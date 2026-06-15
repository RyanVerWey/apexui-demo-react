import React from "react";
import { createRoot, type Root } from "react-dom/client";
import "@apexui/tokens/css";
import "@apexui/react/styles.css";
import {
  Alert,
  Autocomplete,
  Badge,
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
  Slider,
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

type RouteId = "home" | "metrics" | "work-orders" | "customers" | "settings" | "proof";

type PageProps = {
  navigate: (route: RouteId) => void;
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
  theme: string;
};

type WorkOrderRow = {
  crew: React.ReactNode;
  region: React.ReactNode;
  priority: React.ReactNode;
  status: React.ReactNode;
};

type CustomerRow = {
  account: React.ReactNode;
  plan: React.ReactNode;
  nextVisit: React.ReactNode;
  health: React.ReactNode;
};

const routes: Array<{ id: RouteId; label: string; eyebrow: string; icon: React.ReactNode }> = [
  { id: "home", label: "Home", eyebrow: "Marketing", icon: <Icon name="home" /> },
  { id: "metrics", label: "Metrics", eyebrow: "Dashboard", icon: <Icon name="chartLine" /> },
  { id: "work-orders", label: "Work orders", eyebrow: "Forms", icon: <Icon name="clipboardList" /> },
  { id: "customers", label: "Customers", eyebrow: "Records", icon: <Icon name="users" /> },
  { id: "settings", label: "Settings", eyebrow: "Account", icon: <Icon name="settings" /> },
  { id: "proof", label: "Package proof", eyebrow: "Integration", icon: <Icon name="package" /> }
];

const workOrderColumns: Array<{ key: keyof WorkOrderRow; header: string }> = [
  { key: "crew", header: "Crew" },
  { key: "region", header: "Region" },
  { key: "priority", header: "Priority" },
  { key: "status", header: "Status" }
];

const workOrderRows: WorkOrderRow[] = [
  { crew: "Crew A", region: "North Loop", priority: <Badge tone="warning">High</Badge>, status: <Badge tone="info">Scheduled</Badge> },
  { crew: "Crew B", region: "Lakeview", priority: <Badge tone="success">Normal</Badge>, status: <Badge tone="success">On route</Badge> },
  { crew: "Crew C", region: "West Yard", priority: <Badge tone="danger">Critical</Badge>, status: <Badge tone="warning">Needs parts</Badge> }
];

const customerColumns: Array<{ key: keyof CustomerRow; header: string }> = [
  { key: "account", header: "Account" },
  { key: "plan", header: "Plan" },
  { key: "nextVisit", header: "Next visit" },
  { key: "health", header: "Health" }
];

const customerRows: CustomerRow[] = [
  { account: "Aster Foods", plan: "Preventive", nextVisit: "Jun 18", health: <Badge tone="success">Stable</Badge> },
  { account: "Briar Commons", plan: "Priority", nextVisit: "Jun 19", health: <Badge tone="warning">Watch</Badge> },
  { account: "Cobalt Labs", plan: "Enterprise", nextVisit: "Jun 20", health: <Badge tone="info">Expanding</Badge> },
  { account: "Dover Hotel Group", plan: "Preventive", nextVisit: "Jun 21", health: <Badge tone="success">Stable</Badge> }
];

const boardColumns = [
  {
    id: "triage",
    title: "Triage",
    items: [
      { id: "hvac", title: "HVAC vibration alert", meta: "Aster Foods" },
      { id: "cooler", title: "Cooler pressure drop", meta: "Briar Commons" }
    ]
  },
  {
    id: "scheduled",
    title: "Scheduled",
    items: [
      { id: "generator", title: "Generator load test", meta: "Crew A" },
      { id: "controls", title: "Controls calibration", meta: "Crew B" }
    ]
  },
  {
    id: "complete",
    title: "Complete",
    items: [
      { id: "filter", title: "Filter bank replacement", meta: "Signed" },
      { id: "sensor", title: "Sensor swap", meta: "Closed" }
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
    badge: day === 6 ? "QA" : day === 18 ? "Route" : day === 27 ? "Close" : undefined
  };
});

const proofSteps = [
  { id: "install", label: "Install", description: "React imports @apexui/react and @apexui/tokens." },
  { id: "theme", label: "Theme", description: "The route shell controls data-apex-theme for light and dark." },
  { id: "route", label: "Route", description: "Each business page is reachable by hash route." },
  { id: "ship", label: "Ship", description: "GitHub Pages deploys the real demo surface." }
];

function getRouteFromHash(): RouteId {
  const value = window.location.hash.replace(/^#\/?/, "");
  return routes.some((route) => route.id === value) ? (value as RouteId) : "home";
}

function App() {
  const [route, setRoute] = React.useState<RouteId>(() => getRouteFromHash());
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const theme = `gilded-${mode}`;
  const activeRoute = routes.find((item) => item.id === route) ?? routes[0];

  React.useEffect(() => {
    const syncRoute = () => setRoute(getRouteFromHash());
    window.addEventListener("hashchange", syncRoute);
    return () => window.removeEventListener("hashchange", syncRoute);
  }, []);

  React.useEffect(() => {
    document.documentElement.dataset.apexTheme = theme;
    return () => {
      delete document.documentElement.dataset.apexTheme;
    };
  }, [theme]);

  const navigate = (nextRoute: RouteId) => {
    window.location.hash = nextRoute === "home" ? "#/" : `#/${nextRoute}`;
    setRoute(nextRoute);
  };

  return (
    <main className="site-shell" data-apex-theme={theme}>
      <SiteHeader route={route} navigate={navigate} mode={mode} setMode={setMode} />

      <Container size="lg" className="route-shell">
        <section className="route-panel" aria-label={`${activeRoute.label} page`}>
          {route === "home" && <HomePage navigate={navigate} mode={mode} setMode={setMode} theme={theme} />}
          {route === "metrics" && <MetricsPage navigate={navigate} mode={mode} setMode={setMode} theme={theme} />}
          {route === "work-orders" && <WorkOrdersPage navigate={navigate} mode={mode} setMode={setMode} theme={theme} />}
          {route === "customers" && <CustomersPage navigate={navigate} mode={mode} setMode={setMode} theme={theme} />}
          {route === "settings" && <SettingsPage navigate={navigate} mode={mode} setMode={setMode} theme={theme} />}
          {route === "proof" && <ProofPage navigate={navigate} mode={mode} setMode={setMode} theme={theme} />}
        </section>
      </Container>

      <SiteFooter navigate={navigate} />

    </main>
  );
}

function SiteHeader({ route, navigate, mode, setMode }: { route: RouteId; navigate: (route: RouteId) => void; mode: "light" | "dark"; setMode: (mode: "light" | "dark") => void }) {
  return (
    <header className="site-header">
      <a className="brand-lockup" href="#/" onClick={(event) => { event.preventDefault(); navigate("home"); }} aria-label="Northstar Field Services home">
        <span className="brand-mark"><Icon name="navigation" /></span>
        <span>
          <strong>Northstar</strong>
          <small>Field Services</small>
        </span>
      </a>

      <nav className="primary-nav" aria-label="Primary navigation">
        {routes.map((item) => (
          <a
            aria-current={route === item.id ? "page" : undefined}
            className={route === item.id ? "nav-link nav-link-active" : "nav-link"}
            href={item.id === "home" ? "#/" : `#/${item.id}`}
            key={item.id}
            onClick={(event) => {
              event.preventDefault();
              navigate(item.id);
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <Stack direction="row" gap="sm" align="center" className="header-actions">
        <Button variant="secondary" size="sm" onClick={() => navigate("customers")}>Customer portal</Button>
        <Button size="sm" onClick={() => navigate("work-orders")}>Book service</Button>
        <Switch label="Dark" checked={mode === "dark"} onChange={() => setMode(mode === "light" ? "dark" : "light")} />
      </Stack>
    </header>
  );
}

function SiteFooter({ navigate }: { navigate: (route: RouteId) => void }) {
  return (
    <footer className="site-footer">
      <div>
        <strong>Northstar Field Services</strong>
        <Typography variant="caption">React demo built entirely with ApexUI tokens and components.</Typography>
      </div>
      <nav aria-label="Footer navigation">
        <button type="button" onClick={() => navigate("metrics")}>Operations</button>
        <button type="button" onClick={() => navigate("work-orders")}>Service request</button>
        <button type="button" onClick={() => navigate("proof")}>Package proof</button>
      </nav>
    </footer>
  );
}

function HomePage({ navigate, theme }: PageProps) {
  return (
    <Stack gap="lg">
      <section className="hero-page">
        <Stack gap="lg" className="hero-copy">
          <Typography as="h1" variant="display" className="hero-title">Field service that feels calm before the crew arrives.</Typography>
          <Typography variant="subtitle" className="hero-subtitle">
            Northstar coordinates commercial maintenance, emergency dispatch, customer approvals, and executive reporting from one operating system.
          </Typography>
          <Stack direction="row" gap="sm" align="center" className="site-actions">
            <Button onClick={() => navigate("work-orders")}>Book a service visit</Button>
            <Button variant="secondary" onClick={() => navigate("metrics")}>View live metrics</Button>
            <Link href="https://www.npmjs.com/package/@apexui/react" variant="standalone">ApexUI React</Link>
          </Stack>
        </Stack>

        <Paper elevation="md" className="hero-console">
          <Toolbar
            label="Today at Northstar"
            actions={<Badge tone="success">{theme}</Badge>}
          >
            <ButtonGroup label="Home actions">
              <Button size="sm" onClick={() => navigate("customers")}>Accounts</Button>
              <Button size="sm" variant="secondary" onClick={() => navigate("settings")}>Preferences</Button>
            </ButtonGroup>
          </Toolbar>
          <Chart
            label="Service mix"
            data={[
              { label: "Maintenance", value: 86 },
              { label: "Emergency", value: 34 },
              { label: "Install", value: 52 },
              { label: "Audit", value: 69 }
            ]}
          />
          <div className="metric-band">
            <Metric label="Open orders" value="128" tone="info" />
            <Metric label="First-time fix" value="94%" tone="success" />
            <Metric label="At-risk sites" value="7" tone="warning" />
          </div>
        </Paper>
      </section>

      <section className="trust-band" aria-label="Customer proof">
        <span>Trusted by regional facilities teams</span>
        <strong>Aster Foods</strong>
        <strong>Briar Commons</strong>
        <strong>Cobalt Labs</strong>
        <strong>Dover Hotel Group</strong>
      </section>

      <section className="service-story">
        <div>
          <Typography as="h2" variant="title">A polished service website, not a component gallery.</Typography>
        </div>
        <div className="story-grid">
          <Card eyebrow="Response" title="Book urgent work without calling dispatch">
            <Typography variant="body">Customers can request service, upload logs, pick dates, and track status through one branded experience.</Typography>
          </Card>
          <Card eyebrow="Operations" title="Managers see the route plan before it breaks">
            <Typography variant="body">Dashboards combine work orders, crew load, SLA risk, and account health in one operations surface.</Typography>
          </Card>
          <Card eyebrow="Proof" title="Every page exercises ApexUI in context">
            <Typography variant="body">Marketing, metrics, forms, records, settings, and package proof share the same token system.</Typography>
          </Card>
        </div>
      </section>
    </Stack>
  );
}

function MetricsPage(_props: PageProps) {
  return (
    <PageFrame title="Operations command center" description="Real route density: crew load, SLA risk, customer health, and work-order evidence in one dashboard.">
      <section className="metric-band metric-band-four metric-band-compact" aria-label="Operations summary">
        <Metric label="Revenue protected" value="$4.8M" note="+12% this quarter" tone="success" />
        <Metric label="Open SLA risk" value="11" note="3 need dispatch today" tone="warning" />
        <Metric label="Utilization" value="87%" note="North region leads" tone="info" />
        <Metric label="Health" value="92%" note="4 accounts improving" tone="success" />
      </section>

      <section className="dashboard-visual-grid">
        <Paper elevation="sm" className="panel-stack dispatch-panel">
          <div className="panel-heading">
            <div>
              <Typography variant="title">Dispatch health</Typography>
              <Typography variant="caption">Completion rate by weekday</Typography>
            </div>
            <Badge tone="success">Live</Badge>
          </div>
          <Chart
            label="Weekly dispatch completion"
            data={[
              { label: "Mon", value: 72 },
              { label: "Tue", value: 84 },
              { label: "Wed", value: 91 },
              { label: "Thu", value: 78 },
              { label: "Fri", value: 88 }
            ]}
          />
        </Paper>

        <Paper elevation="sm" className="panel-stack">
          <div className="panel-heading">
            <div>
              <Typography variant="title">Regional load</Typography>
              <Typography variant="caption">Scheduled capacity by territory</Typography>
            </div>
            <Badge tone="info">4 regions</Badge>
          </div>
          <Chart
            label="Regional scheduled capacity"
            data={[
              { label: "North Loop", value: 86 },
              { label: "Lakeview", value: 64 },
              { label: "West Yard", value: 73 },
              { label: "South Bay", value: 58 }
            ]}
          />
        </Paper>

        <Paper elevation="sm" className="panel-stack">
          <div className="panel-heading">
            <div>
              <Typography variant="title">SLA risk mix</Typography>
              <Typography variant="caption">Open risk by operational cause</Typography>
            </div>
            <Badge tone="warning">11 open</Badge>
          </div>
          <Chart
            label="Open SLA risk by cause"
            data={[
              { label: "Parts hold", value: 42 },
              { label: "Crew delay", value: 28 },
              { label: "Customer approval", value: 18 },
              { label: "Weather", value: 12 }
            ]}
          />
        </Paper>

        <Paper elevation="sm" className="panel-stack">
          <div className="panel-heading">
            <div>
              <Typography variant="title">Customer health</Typography>
              <Typography variant="caption">Portfolio trend by account segment</Typography>
            </div>
            <Badge tone="success">92%</Badge>
          </div>
          <Chart
            label="Customer health by segment"
            data={[
              { label: "Enterprise", value: 94 },
              { label: "Priority", value: 87 },
              { label: "Preventive", value: 91 },
              { label: "At risk", value: 38 }
            ]}
          />
        </Paper>
      </section>

      <section className="dashboard-shell">
        <div className="dashboard-main">
          <Paper elevation="sm" className="panel-stack">
            <div className="panel-heading">
              <div>
                <Typography variant="title">Crew utilization</Typography>
                <Typography variant="caption">Assigned work by crew</Typography>
              </div>
              <Badge tone="info">87% avg</Badge>
            </div>
            <Chart
              label="Crew utilization"
              data={[
                { label: "Crew A", value: 92 },
                { label: "Crew B", value: 76 },
                { label: "Crew C", value: 88 },
                { label: "Crew D", value: 81 }
              ]}
            />
          </Paper>
        </div>

        <aside className="dashboard-side">
          <Paper elevation="sm" className="territory-panel panel-stack">
            <div className="panel-heading">
              <div>
                <Typography variant="title">Territory watchlist</Typography>
                <Typography variant="caption">Actual route exceptions, not a fake map</Typography>
              </div>
              <Badge tone="warning">7 risks</Badge>
            </div>
            <List
              items={[
                { id: "north", label: "North Loop", description: "Crew A has three stops and one SLA watch.", meta: <Badge tone="info">Active</Badge> },
                { id: "lake", label: "Lakeview", description: "Crew B cleared after customer approval.", meta: <Badge tone="success">Clear</Badge> },
                { id: "west", label: "West Yard", description: "Parts hold blocks a critical closeout.", meta: <Badge tone="warning">Hold</Badge> }
              ]}
            />
          </Paper>
        </aside>
      </section>

      <WorkflowBoard columns={boardColumns} />

      <DataTable caption="Open work order queue" columns={workOrderColumns} rows={workOrderRows} />
    </PageFrame>
  );
}

function WorkOrdersPage(_props: PageProps) {
  const [priority, setPriority] = React.useState("scheduled");
  const [confidence, setConfidence] = React.useState(72);
  const [asset, setAsset] = React.useState("Rooftop unit 14");

  return (
    <PageFrame title="Create a service visit" description="A realistic intake page with typed fields, route selection, urgency, attachment, and dispatch confidence.">
      <div className="two-column">
        <Card eyebrow="Request intake" title="Service details">
          <Stack gap="md">
            <TextInput label="Customer" defaultValue="Aster Foods" />
            <Autocomplete
              label="Asset"
              value={asset}
              onChange={(event) => setAsset(event.currentTarget.value)}
              options={["Rooftop unit 14", "Cold room compressor", "Dock door sensor", "Backup generator"]}
            />
            <Select
              label="Service type"
              defaultValue="maintenance"
              options={[
                { label: "Preventive maintenance", value: "maintenance" },
                { label: "Emergency repair", value: "emergency" },
                { label: "Installation", value: "install" }
              ]}
            />
            <DatePicker label="Requested date" defaultValue="2026-06-18" />
            <Textarea label="Technician notes" defaultValue="Customer reports intermittent alarm after compressor cycle." />
            <FileUpload label="Attach site photos" description="Upload customer images, logs, or prior inspection reports." files={[{ name: "unit-14-alarm-log.csv", meta: "ready" }]} />
          </Stack>
        </Card>

        <Card eyebrow="Dispatch controls" title="Route plan">
          <Stack gap="md">
            <RadioGroup
              label="Priority"
              name="priority"
              value={priority}
              onValueChange={setPriority}
              options={[
                { label: "Scheduled", value: "scheduled" },
                { label: "Same day", value: "same-day" },
                { label: "Emergency", value: "emergency" }
              ]}
            />
            <NumberField label="Crew size" defaultValue={2} min={1} max={8} />
            <Slider label="Dispatch confidence" value={confidence} onChange={(event) => setConfidence(Number(event.currentTarget.value))} />
            <Checkbox label="Notify customer when crew is assigned" defaultChecked />
            <Alert tone={priority === "emergency" ? "warning" : "info"} title="Routing note">Crew assignment updates the customer timeline and route board.</Alert>
            <Button>Create work order</Button>
          </Stack>
        </Card>
      </div>
    </PageFrame>
  );
}

function CustomersPage(_props: PageProps) {
  return (
    <PageFrame title="Account pipeline and health records" description="A customer operations page with searchable records, structured data, and next-best action states.">
      <Toolbar
        label="Account controls"
        actions={<ButtonGroup label="Customer actions"><Button size="sm">Add account</Button><Button size="sm" variant="secondary">Export CSV</Button></ButtonGroup>}
      >
        <SearchForm className="customer-search" label="Find customer" placeholder="Search account, plan, owner" onSubmit={() => undefined} />
      </Toolbar>

      <section className="customer-records" aria-label="Customer account records">
        <DataGrid caption="Customer account list" columns={customerColumns} rows={customerRows} />
      </section>

      <section className="customer-insight-grid" aria-label="Customer account insights">
        <Paper elevation="sm" className="panel-stack">
          <Typography variant="title">Account timeline</Typography>
          <Timeline
            events={[
              { id: "review", label: "Health review", description: "Briar Commons needs risk review before renewal.", meta: "Today" },
              { id: "visit", label: "Site visit", description: "Crew B assigned to Aster Foods.", meta: "Jun 18" },
              { id: "renew", label: "Renewal", description: "Cobalt Labs expanding enterprise support.", meta: "Jun 24" }
            ]}
          />
        </Paper>

        <Paper elevation="sm" className="panel-stack">
          <div className="panel-heading">
            <div>
              <Typography variant="title">Health by plan</Typography>
              <Typography variant="caption">Renewal stability across customer tiers</Typography>
            </div>
            <Badge tone="success">4 rows</Badge>
          </div>
          <Chart
            label="Customer health by plan"
            data={[
              { label: "Preventive", value: 92 },
              { label: "Priority", value: 78 },
              { label: "Enterprise", value: 88 },
              { label: "At risk", value: 31 }
            ]}
          />
        </Paper>

        <Paper elevation="sm" className="panel-stack">
          <EmptyState
            title="Open account plan"
            description="Select a customer row to review service history, renewal risk, and route coverage."
            action={<Button variant="secondary">Review customer plan</Button>}
          />
        </Paper>
      </section>
    </PageFrame>
  );
}

function SettingsPage({ mode, setMode }: PageProps) {
  const [tone, setTone] = React.useState("balanced");

  return (
    <PageFrame title="Workspace preferences" description="A settings route proving tabs, toggles, theme mode, locale-like controls, and account preferences.">
      <Tabs
        label="Settings sections"
        activeId="workspace"
        onChange={() => undefined}
        items={[
          { id: "workspace", label: "Workspace" },
          { id: "notifications", label: "Notifications" },
          { id: "billing", label: "Billing" }
        ]}
      />

      <div className="two-column">
        <Card eyebrow="Workspace" title="Operating defaults">
          <Stack gap="md">
            <TextInput label="Workspace name" defaultValue="Northstar Central" />
            <Select
              label="Locale"
              defaultValue="en-US"
              options={[
                { label: "English (US)", value: "en-US" },
                { label: "Spanish (US)", value: "es-US" },
                { label: "French (CA)", value: "fr-CA" }
              ]}
            />
            <ToggleGroup
              label="Workspace tone"
              value={tone}
              onValueChange={setTone}
              options={[
                { label: "Compact", value: "compact" },
                { label: "Balanced", value: "balanced" },
                { label: "Guided", value: "guided" }
              ]}
            />
            <Switch label="Dark mode" checked={mode === "dark"} onChange={() => setMode(mode === "light" ? "dark" : "light")} />
            <Checkbox label="Require manager approval for emergency dispatch" defaultChecked />
          </Stack>
        </Card>

        <Card eyebrow="Quality" title="Design-system fit">
          <Stack gap="md">
            <Rating label="Executive readability" value={4} />
            <Progress label="Theme coverage" value={100} />
            <Progress label="Route coverage" value={100} />
            <Alert tone="success" title="Settings saved">Preferences use the same ApexUI controls as every other page.</Alert>
          </Stack>
        </Card>
      </div>
    </PageFrame>
  );
}

function ProofPage({ theme }: PageProps) {
  return (
    <PageFrame title="React integration details" description="The demo installs real ApexUI packages from npm and uses route-level composition instead of preview-only examples.">
      <div className="two-column">
        <Card eyebrow="Install path" title="@apexui/react">
          <Stepper activeIndex={3} steps={proofSteps} />
        </Card>

        <Paper elevation="sm" className="panel-stack">
          <Typography variant="title">What this route proves</Typography>
          <List
            items={[
              { id: "routing", label: "Routing", description: "Hash routes work on GitHub Pages without rewrite config.", meta: <Badge tone="success">Live</Badge> },
              { id: "theme", label: "Theme", description: `${theme} is applied to html and the app shell.`, meta: <Badge tone="info">Scoped</Badge> },
              { id: "components", label: "Components", description: "Marketing, dashboard, forms, records, settings, and proof pages use ApexUI components.", meta: <Badge tone="success">Dogfood</Badge> }
            ]}
          />
          <Alert tone="info" title="Registry check">This app depends on @apexui/react and @apexui/tokens from npm.</Alert>
        </Paper>
      </div>

      <DataTable
        caption="Route coverage"
        columns={[
          { key: "page", header: "Page" },
          { key: "purpose", header: "Purpose" },
          { key: "components", header: "ApexUI coverage" }
        ]}
        rows={[
          { page: "Home", purpose: "Marketing", components: "Header, navigation, Card, Chart, Metric, Link" },
          { page: "Metrics", purpose: "Dashboard", components: "Chart, Progress, WorkflowBoard, DataTable" },
          { page: "Work orders", purpose: "Forms", components: "TextInput, Select, DatePicker, FileUpload, Slider" },
          { page: "Customers", purpose: "Records", components: "SearchForm, DataGrid, Timeline, EmptyState" },
          { page: "Settings", purpose: "Account", components: "Tabs, Switch, ToggleGroup, Rating, Alert" }
        ]}
      />
    </PageFrame>
  );
}

function PageFrame({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <Stack gap="lg">
      <header className="page-heading">
        <Typography as="h1" variant="display" className="page-title">{title}</Typography>
        <Typography variant="body" className="page-description">{description}</Typography>
      </header>
      {children}
    </Stack>
  );
}

function Metric({ label, value, note, tone }: { label: string; value: string; note?: string; tone: "info" | "success" | "warning" }) {
  return (
    <Paper as="article" elevation="sm" className={`metric-card metric-card-${tone}`}>
      <span className="metric-label">{label}</span>
      <Typography variant="title">{value}</Typography>
      {note && <span className="metric-note">{note}</span>}
    </Paper>
  );
}

type RootElement = HTMLElement & { __apexRoot?: Root };

const rootElement = document.getElementById("root") as RootElement;
const root = rootElement.__apexRoot ?? createRoot(rootElement);
rootElement.__apexRoot = root;
root.render(<App />);
