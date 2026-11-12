# KYAMCH Morgue Module — Architecture & Module Map

## Running the Application
- **URL**: http://localhost:1999/en/morgue
- **Sign-In URL**: http://localhost:1999/en/signin (`admin` / `admin123`)
- **Server**: [server.py](file:///f:/KYAMCH/KYAMCH(Additional%20Modules)/Morgue_Module/server.py) (or [start_morgue.bat](file:///f:/KYAMCH/KYAMCH(Additional%20Modules)/Morgue_Module/start_morgue.bat))
- **SPA Entry & Router**: [index.html](file:///f:/KYAMCH/KYAMCH(Additional%20Modules)/Morgue_Module/index.html) and [morgue-app.js](file:///f:/KYAMCH/KYAMCH(Additional%20Modules)/Morgue_Module/morgue-app.js)

## Core Morgue Chunks & Turbopack Module IDs

| Chunk File | Module IDs | Purpose |
| :--- | :--- | :--- |
| [087exaop58_bo.js](file:///f:/KYAMCH/KYAMCH(Additional%20Modules)/Morgue_Module/_next/static/chunks/087exaop58_bo.js) | `691515`, `446650`, `574640`, `228024`, `952520`, `233381`, `696206`, `421179` | Morgue Mock Data Store, State Mutations, Action Handlers, Shared UI Primitives, Print Layouts |
| [0yo05iq8fu0d8.js](file:///f:/KYAMCH/KYAMCH(Additional%20Modules)/Morgue_Module/_next/static/chunks/0yo05iq8fu0d8.js) | `317823` | `DashboardLayout` (Morgue-only Left Rail, Sidebar Navigation, Topbar, Notifications, Settings) |
| [149wzei5ds97j.js](file:///f:/KYAMCH/KYAMCH(Additional%20Modules)/Morgue_Module/_next/static/chunks/149wzei5ds97j.js) | `735381` | **Overview** (`/en/morgue`) — KPIs, Cold Storage Strip, Work Queues, Live Temp Strip, Floor Map |
| [0uynk6f_niu31.js](file:///f:/KYAMCH/KYAMCH(Additional%20Modules)/Morgue_Module/_next/static/chunks/0uynk6f_niu31.js) | `147722` | **Section & Tab Dispatcher** (`/en/morgue/:section` & `/en/morgue/:section/:tab`) |
| [0cb4~t3ya6yr9.js](file:///f:/KYAMCH/KYAMCH(Additional%20Modules)/Morgue_Module/_next/static/chunks/0cb4~t3ya6yr9.js) | `223370`, `149174`, `614330`, `149578`, `855495`, `747609` | **Intake** (`IntakeSection`, `IntakeEditor`), **Condition Checks** (`ChecksSection`, `CheckEditor`), **Release** (`ReleaseSection`, `ReleaseEditor`) |
| [08ux~l6ir55~m.js](file:///f:/KYAMCH/KYAMCH(Additional%20Modules)/Morgue_Module/_next/static/chunks/08ux~l6ir55~m.js) | `540678`, `11715`, `450113`, `497568` | **Bodies** (`BodiesSection`, `BodyProfile`) & **Belongings** (`BelongingsSection`, `BelongingsPacketProfile`) |
| [0o~de3fk21m2u.js](file:///f:/KYAMCH/KYAMCH(Additional%20Modules)/Morgue_Module/_next/static/chunks/0o~de3fk21m2u.js) | `84836` | **Cold Storage** (`StorageSection` — Occupancy Board, Requests, Moves, Extensions, Referrals Out, Cleaning) |
| [0dctsfnul18yz.js](file:///f:/KYAMCH/KYAMCH(Additional%20Modules)/Morgue_Module/_next/static/chunks/0dctsfnul18yz.js) | `823531` | **Billing** (`BillingSection` — Clearances, Waivers & `ClearanceRecord` profile) |
| [0yqh5kv98c34j.js](file:///f:/KYAMCH/KYAMCH(Additional%20Modules)/Morgue_Module/_next/static/chunks/0yqh5kv98c34j.js) | `89116`, `701552` | **Temperature Monitoring** (`MonitoringSection`, `ExcursionRecord`) & **Reports** (`ReportsSection` R1–R10) |
| [0orwmes~9ap2y.js](file:///f:/KYAMCH/KYAMCH(Additional%20Modules)/Morgue_Module/_next/static/chunks/0orwmes~9ap2y.js) | `349792` | **Scan** (`/en/morgue/scan`) — QR/Barcode Scanner & Token Lookup |
| [0odm7tft_wtgb.js](file:///f:/KYAMCH/KYAMCH(Additional%20Modules)/Morgue_Module/_next/static/chunks/0odm7tft_wtgb.js) | `627126`, `726981`, `381773` | **Morgue Setup** (`SetupSection`, `ColdUnitRecord`, `ColdUnitEditor`, `BelongingsUnitRecord`, `BelongingsUnitEditor`) |
| [041ur7f2q1l1_.js](file:///f:/KYAMCH/KYAMCH(Additional%20Modules)/Morgue_Module/_next/static/chunks/041ur7f2q1l1_.js) | `466144`, `105935`, `280635` | **Setup Editors** (`StatusEditor`, `TempConfigEditor`, `AuthRuleEditor`) |
| [03ao2jl4jym2w.js](file:///f:/KYAMCH/KYAMCH(Additional%20Modules)/Morgue_Module/_next/static/chunks/03ao2jl4jym2w.js) | `551426` | **Sign-In Form** (`/en/signin` — supports `admin` / `admin123`) |

