import React from "react";
import { createRoot, type Root } from "react-dom/client";
import "@apexui/tokens/css";
import "@apexui/react/styles.css";
import {
  Accordion,
  Alert,
  AppBar,
  Autocomplete,
  Avatar,
  Badge,
  BottomNavigation,
  Box,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  Carousel,
  Chart,
  Checkbox,
  Container,
  DataGrid,
  DataTable,
  DatePicker,
  Divider,
  EmptyState,
  FileUpload,
  FloatingActionButton,
  Grid,
  Icon,
  ImageList,
  Link,
  Masonry,
  Menu,
  MenuBar,
  NumberField,
  Pagination,
  Paper,
  Popover,
  Progress,
  RadioGroup,
  Rating,
  SearchForm,
  Select,
  Sidebar,
  Skeleton,
  Slider,
  Snackbar,
  SpeedDial,
  Spinner,
  Stack,
  Stepper,
  Switch,
  Tabs,
  Textarea,
  TextInput,
  TimePicker,
  Timeline,
  ToggleGroup,
  Toolbar,
  Tooltip,
  TransferList,
  TreeView,
  Typography,
  WorkflowBoard
} from "@apexui/react";
import "./styles.css";

type WorkRow = {
  component: React.ReactNode;
  layer: React.ReactNode;
  owner: React.ReactNode;
  risk: React.ReactNode;
  status: React.ReactNode;
};

const workColumns: Array<{ key: keyof WorkRow; header: string }> = [
  { key: "component", header: "Component" },
  { key: "layer", header: "Atomic layer" },
  { key: "owner", header: "Owner" },
  { key: "risk", header: "Risk" },
  { key: "status", header: "Status" }
];

const workRows: WorkRow[] = [
  { component: "TokenProvider", layer: "Foundation", owner: "Design Ops", risk: "Low", status: <Badge tone="success">Live</Badge> },
  { component: "App shell", layer: "Organism", owner: "Frameworks", risk: "Medium", status: <Badge tone="info">Dogfood</Badge> },
  { component: "Forms", layer: "Molecule", owner: "DX", risk: "Low", status: <Badge tone="success">Ready</Badge> },
  { component: "Data surfaces", layer: "Organism", owner: "Systems", risk: "Medium", status: <Badge tone="warning">Watch</Badge> }
];

type RegistryRow = {
  package: React.ReactNode;
  version: React.ReactNode;
  coverage: React.ReactNode;
  notes: React.ReactNode;
};

const registryColumns: Array<{ key: keyof RegistryRow; header: string }> = [
  { key: "package", header: "Package" },
  { key: "version", header: "Version" },
  { key: "coverage", header: "Coverage" },
  { key: "notes", header: "Notes" }
];

const registryRows: RegistryRow[] = [
  { package: "@apexui/react", version: "0.1.0", coverage: "42 exports", notes: "Atomic through organisms" },
  { package: "@apexui/tokens", version: "0.1.0", coverage: "Theme CSS", notes: "Gilded light and dark active" },
  { package: "vite app", version: "7.x", coverage: "Build target", notes: "GitHub Pages ready" }
];

const boardColumns = [
  {
    id: "intake",
    title: "Intake",
    items: [
      { id: "forms", title: "Form audit", meta: "TextInput, Select, RadioGroup" },
      { id: "upload", title: "Evidence upload", meta: "FileUpload" }
    ]
  },
  {
    id: "build",
    title: "Build",
    items: [
      { id: "layout", title: "Responsive shell", meta: "Container, Grid, Stack" },
      { id: "data", title: "Data desk", meta: "DataTable, DataGrid" }
    ]
  },
  {
    id: "ship",
    title: "Ship",
    items: [
      { id: "qa", title: "Theme QA", meta: "gilded-light, gilded-dark" },
      { id: "release", title: "Release notes", meta: "Ready" }
    ]
  }
];

const calendarDays = Array.from({ length: 35 }, (_, index) => {
  const day = index - 2;
  return {
    id: `day-${index}`,
    label: day > 0 && day < 31 ? day : "",
    muted: day <= 0 || day >= 31,
    selected: day === 18,
    badge: day === 12 ? "QA" : day === 18 ? "Ship" : day === 25 ? "Docs" : undefined
  };
});

const screenshotItems = [
  {
    alt: "Gilded light token preview",
    caption: "Light shell",
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='420' height='260' viewBox='0 0 420 260'%3E%3Crect width='420' height='260' fill='%23fbfaf5'/%3E%3Crect x='32' y='34' width='356' height='48' rx='8' fill='%23fffdf7' stroke='%23ded2b6'/%3E%3Crect x='32' y='104' width='154' height='124' rx='8' fill='%23f4eddb'/%3E%3Crect x='210' y='104' width='178' height='124' rx='8' fill='%23fffdf7' stroke='%23ded2b6'/%3E%3Crect x='230' y='128' width='76' height='14' rx='7' fill='%239b6500'/%3E%3Crect x='230' y='158' width='132' height='10' rx='5' fill='%23665a43'/%3E%3C/svg%3E"
  },
  {
    alt: "Gilded dark token preview",
    caption: "Dark shell",
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='420' height='260' viewBox='0 0 420 260'%3E%3Crect width='420' height='260' fill='%23090a0c'/%3E%3Crect x='32' y='34' width='356' height='48' rx='8' fill='%2315171a' stroke='%233f444c'/%3E%3Crect x='32' y='104' width='154' height='124' rx='8' fill='%2322252a'/%3E%3Crect x='210' y='104' width='178' height='124' rx='8' fill='%2315171a' stroke='%233f444c'/%3E%3Crect x='230' y='128' width='76' height='14' rx='7' fill='%23f6c343'/%3E%3Crect x='230' y='158' width='132' height='10' rx='5' fill='%23c7bea8'/%3E%3C/svg%3E"
  }
];

function App() {
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const [activeTab, setActiveTab] = React.useState("overview");
  const [activeNav, setActiveNav] = React.useState("release");
  const [density, setDensity] = React.useState("balanced");
  const [quality, setQuality] = React.useState(92);
  const [rating, setRating] = React.useState(4);
  const [selectedPackage, setSelectedPackage] = React.useState("@apexui/react");
  const [toastOpen, setToastOpen] = React.useState(true);
  const theme = `gilded-${mode}`;
  const handleNavSelect = (value: string | React.SyntheticEvent<HTMLElement>) => {
    if (typeof value === "string") {
      setActiveNav(value);
    }
  };

  return (
    <main className="app-shell" data-apex-theme={theme}>
      <AppBar
        title="ApexUI Release Studio"
        navigation={<Breadcrumbs items={[{ label: "ApexUI", href: "#" }, { label: "React demo", current: true }]} />}
        actions={
          <Stack direction="row" gap="sm" align="center" className="app-actions">
            <Switch
              label="Dark mode"
              checked={mode === "dark"}
              onChange={() => setMode((value) => (value === "light" ? "dark" : "light"))}
            />
            <Menu
              label={<Icon name="moreHorizontal" title="Open release menu" />}
              items={[
                { id: "copy", label: "Copy package link" },
                { id: "refresh", label: "Refresh checks" },
                { id: "archive", label: "Archive candidate", disabled: true }
              ]}
            />
          </Stack>
        }
      />

      <MenuBar
        className="app-menubar"
        items={[
          { id: "release", label: "Release", current: true },
          { id: "themes", label: "Themes" },
          { id: "registry", label: "Registry" },
          { id: "support", label: "Support" }
        ]}
      />

      <Container size="full" className="app-main">
        <div className="app-layout">
          <Sidebar
            activeId={activeNav}
            heading="React workspace"
            label="Demo sections"
            onSelect={handleNavSelect}
            items={[
              { id: "release", label: "Release room", icon: <Icon name="release" />, badge: <Badge tone="success">Ready</Badge> },
              { id: "tokens", label: "Theme QA", icon: <Icon name="theme" />, badge: <Badge tone="info">{mode}</Badge> },
              { id: "components", label: "Component fit", icon: <Icon name="component" /> },
              { id: "registry", label: "Registry ops", icon: <Icon name="registry" /> }
            ]}
            footer={<Alert tone="info" title="Atomic path">Atoms compose molecules, organisms, and release workflows.</Alert>}
          />

          <div className="app-page">
            <Toolbar
              label="Release controls"
              actions={
                <ButtonGroup label="Release actions">
                  <Button size="sm">Publish candidate</Button>
                  <Button size="sm" variant="secondary">Open checklist</Button>
                </ButtonGroup>
              }
            >
              <Stack direction="row" gap="sm" align="center" className="app-toolbar-copy">
                <Badge tone="success">React native</Badge>
                <Typography variant="body">Theme: {theme}</Typography>
                <Tooltip content="Token CSS">
                  <Icon name="token" title="Token source" />
                </Tooltip>
              </Stack>
            </Toolbar>

            <section className="app-hero">
              <Paper elevation="md" className="app-hero-panel">
                <Stack gap="lg">
                  <Stack gap="sm">
                    <Badge tone="success">Full product workflow</Badge>
                    <Typography as="h1" variant="display">Registry launch command center</Typography>
                    <Typography variant="subtitle">
                      React demo using ApexUI atoms, molecules, organisms, and token themes end to end.
                    </Typography>
                  </Stack>
                  <SearchForm label="Find component or package" placeholder="Autocomplete, tokens, workflow board" onSubmit={() => undefined} />
                  <Stack direction="row" gap="sm" align="center" className="app-actions">
                    <Button>Approve train</Button>
                    <Button variant="secondary">Review evidence</Button>
                    <Avatar initials="AV" alt="ApexUI reviewer" />
                    <Popover
                      placement="end"
                      trigger={<Button variant="secondary" size="sm">Scope</Button>}
                      content={<Typography variant="caption">Published package API only</Typography>}
                    />
                  </Stack>
                </Stack>
              </Paper>

              <Card eyebrow="Theme system" title="Gilded token mode">
                <Stack gap="md">
                  <ToggleGroup
                    label="Density"
                    value={density}
                    onValueChange={setDensity}
                    options={[
                      { label: "Compact", value: "compact" },
                      { label: "Balanced", value: "balanced" },
                      { label: "Roomy", value: "roomy" }
                    ]}
                  />
                  <Switch
                    label="App dark mode"
                    description="Switches data-apex-theme between gilded-light and gilded-dark."
                    checked={mode === "dark"}
                    onChange={() => setMode((value) => (value === "light" ? "dark" : "light"))}
                  />
                  <Progress label="Contrast checks" value={quality} />
                  <Slider label="Quality gate" value={quality} onChange={(event) => setQuality(Number(event.currentTarget.value))} />
                  <Rating label="Premium fit" value={rating} onValueChange={setRating} />
                  <Select label="Theme family" value="gilded" options={[{ label: "Gilded", value: "gilded" }]} disabled />
                </Stack>
              </Card>
            </section>

            <Grid columns="three" className="app-kpis">
              <Box surface="surface" padding="lg">
                <Stack gap="sm">
                  <Icon name="component" />
                  <Typography variant="title">42 exports</Typography>
                  <Typography variant="caption">Atoms through organisms available from @apexui/react.</Typography>
                </Stack>
              </Box>
              <Box surface="surface" padding="lg">
                <Stack gap="sm">
                  <Icon name="palette" />
                  <Typography variant="title">2 modes</Typography>
                  <Typography variant="caption">One app switch drives gilded token light and dark.</Typography>
                </Stack>
              </Box>
              <Box surface="surface" padding="lg">
                <Stack gap="sm">
                  <Icon name="workflow" />
                  <Typography variant="title">5 layers</Typography>
                  <Typography variant="caption">Foundations, atoms, molecules, organisms, pages.</Typography>
                </Stack>
              </Box>
            </Grid>

            <section className="app-grid">
              <Card eyebrow="Plan" title="Atomic component flow">
                <Stepper
                  activeIndex={3}
                  steps={[
                    { id: "tokens", label: "Tokens", description: "CSS variables set theme physics" },
                    { id: "atoms", label: "Atoms", description: "Controls, type, icons, fields" },
                    { id: "molecules", label: "Molecules", description: "Cards, tabs, lists, uploads" },
                    { id: "organisms", label: "Organisms", description: "Shell, data, workflow surfaces" }
                  ]}
                />
              </Card>
              <Chart
                label="Framework adoption"
                data={[
                  { label: "React", value: 94 },
                  { label: "Tokens", value: 92 },
                  { label: "Docs", value: 78 },
                  { label: "QA", value: quality }
                ]}
              />
              <Card eyebrow="Inputs" title="Release parameters">
                <Stack gap="sm">
                  <Autocomplete
                    label="Package"
                    value={selectedPackage}
                    onChange={(event) => setSelectedPackage(event.currentTarget.value)}
                    options={["@apexui/react", "@apexui/tokens", "apexui-demo-react"]}
                  />
                  <TextInput label="Package scope" value={selectedPackage} readOnly />
                  <NumberField label="Release candidate" defaultValue={1} min={1} />
                  <DatePicker label="Ship date" defaultValue="2026-06-18" />
                  <TimePicker label="Cut time" defaultValue="15:30" />
                </Stack>
              </Card>
            </section>

            <Paper elevation="sm">
              <Stack gap="md">
                <Tabs
                  label="Release views"
                  activeId={activeTab}
                  onChange={setActiveTab}
                  items={[
                    { id: "overview", label: "Overview" },
                    { id: "api", label: "API" },
                    { id: "theme", label: "Theme" },
                    { id: "docs", label: "Docs" }
                  ]}
                />
                <DataTable caption="Release workstreams" columns={workColumns} rows={workRows} />
                <Pagination count={4} page={activeTab === "overview" ? 1 : 2} onPageChange={() => undefined} />
              </Stack>
            </Paper>

            <section className="app-split">
              <Stack gap="md">
                <WorkflowBoard columns={boardColumns} />
                <DataGrid caption="Registry readiness grid" columns={registryColumns} rows={registryRows} />
              </Stack>

              <Stack gap="md">
                <Card eyebrow="Form molecule" title="Component request">
                  <Stack gap="sm">
                    <RadioGroup
                      label="Priority"
                      name="priority"
                      value="standard"
                      options={[
                        { label: "Standard", value: "standard", description: "Next release batch" },
                        { label: "Urgent", value: "urgent", description: "Blocks registry use" }
                      ]}
                    />
                    <Checkbox label="Include token audit" description="Attach theme evidence to issue." defaultChecked />
                    <Textarea label="Notes" defaultValue="Track package-level friction back to ApexUI issues." />
                    <FileUpload
                      label="Attach audit evidence"
                      description="TXT, PNG, or JSON proof files"
                      files={[{ name: "pages-smoke.txt", meta: "verified" }]}
                    />
                  </Stack>
                </Card>

                <Timeline
                  events={[
                    { id: "tokens", label: "Tokens published", meta: "0.1.0" },
                    { id: "demo", label: "React demo dogfood", meta: "now" },
                    { id: "registry", label: "Registry hardening", meta: "next" }
                  ]}
                />
              </Stack>
            </section>

            <section className="app-two-column">
              <Calendar
                label="Release calendar"
                monthLabel="June 2026"
                weekdays={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
                days={calendarDays}
              />
              <TransferList
                sourceTitle="Available checks"
                targetTitle="Ship gate"
                sourceItems={[
                  { id: "axe", label: "Accessibility scan", selected: true },
                  { id: "bundle", label: "Bundle review" },
                  { id: "docs", label: "Docs screenshots" }
                ]}
                targetItems={[
                  { id: "build", label: "npm run build", selected: true },
                  { id: "theme", label: "gilded token pass", selected: true }
                ]}
              />
            </section>

            <section className="app-showcase">
              <Masonry columns="two">
                <Card eyebrow="Token imagery" title="Visual theme previews">
                  <ImageList columns="two" items={screenshotItems} />
                </Card>
                <Card eyebrow="Navigation" title="Registry tree">
                  <TreeView
                    label="Component hierarchy"
                    items={[
                      {
                        id: "foundation",
                        label: "Foundation",
                        children: [
                          { id: "tokens", label: "Tokens" },
                          { id: "icons", label: "Icons" }
                        ]
                      },
                      {
                        id: "react",
                        label: "React",
                        children: [
                          { id: "atoms", label: "Atoms" },
                          { id: "molecules", label: "Molecules" },
                          { id: "organisms", label: "Organisms" }
                        ]
                      }
                    ]}
                  />
                </Card>
                <Carousel
                  label="Release story"
                  items={[
                    {
                      id: "foundation",
                      label: "Foundation",
                      content: (
                        <Stack gap="sm">
                          <Badge tone="success">Foundation</Badge>
                          <Typography variant="title">Token CSS drives every surface.</Typography>
                          <Typography variant="body">No component internals are restyled in app CSS.</Typography>
                        </Stack>
                      )
                    },
                    {
                      id: "composition",
                      label: "Composition",
                      content: (
                        <Stack gap="sm">
                          <Badge tone="info">Composition</Badge>
                          <Typography variant="title">ApexUI components build real product workflows.</Typography>
                          <Typography variant="body">Shell, tables, boards, forms, calendar, and release evidence share one system.</Typography>
                        </Stack>
                      )
                    }
                  ]}
                />
              </Masonry>

              <Accordion
                items={[
                  { id: "styling", title: "Styling contract", content: "App CSS owns layout, spacing, responsive behavior, and page composition only." },
                  { id: "tokens", title: "Theme contract", content: "The app toggles data-apex-theme between gilded-light and gilded-dark." },
                  { id: "atomic", title: "Atomic contract", content: "ApexUI atoms become molecules and organisms before page-level composition." }
                ]}
              />
            </section>

            <section className="app-utility-row">
              <Alert tone="success" title="Release candidate coherent">Theme, package, data, form, navigation, and workflow surfaces render in one app.</Alert>
              <Snackbar
                open={toastOpen}
                tone="info"
                action={<Button size="sm" variant="secondary" onClick={() => setToastOpen(false)}>Dismiss</Button>}
              >
                Gilded {mode} mode active.
              </Snackbar>
              <Stack direction="row" gap="sm" align="center" className="app-loading">
                <Spinner label="Checking package metadata" size="sm" />
                <Skeleton label="Build status loading" size="md" />
              </Stack>
            </section>

            <Divider>Ship room</Divider>

            <EmptyState
              title="No preview-only surface remains"
              description="This demo behaves like a complete release desk assembled from ApexUI."
              action={
                <Stack direction="row" gap="sm" align="center" className="app-actions">
                  <Button size="sm">Open next issue</Button>
                  <Link href="https://www.npmjs.com/package/@apexui/react" variant="standalone">Package page</Link>
                </Stack>
              }
            />
          </div>
        </div>
      </Container>

      <div className="app-bottom-nav">
        <BottomNavigation
          label="Mobile release navigation"
          activeId={activeNav}
          onChange={handleNavSelect}
          items={[
            { id: "release", label: "Release", icon: <Icon name="release" /> },
            { id: "tokens", label: "Tokens", icon: <Icon name="palette" /> },
            { id: "registry", label: "Registry", icon: <Icon name="registry" /> }
          ]}
        />
      </div>

      <div className="app-floating-actions">
        <SpeedDial
          open
          label="Quick actions"
          actions={[
            { id: "refresh", label: "Refresh", icon: <Icon name="refresh" /> },
            { id: "copy", label: "Copy", icon: <Icon name="copy" /> },
            { id: "send", label: "Send", icon: <Icon name="send" /> }
          ]}
        />
        <FloatingActionButton aria-label="Create release note" size="sm">
          <Icon name="add" />
        </FloatingActionButton>
      </div>
    </main>
  );
}

type RootElement = HTMLElement & { __apexRoot?: Root };

const rootElement = document.getElementById("root") as RootElement;
const root = rootElement.__apexRoot ?? createRoot(rootElement);
rootElement.__apexRoot = root;
root.render(<App />);
