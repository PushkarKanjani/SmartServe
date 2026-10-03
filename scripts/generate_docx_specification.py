import os
import docx
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def set_cell_background(cell, fill_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(f'''
        <w:tcMar {nsdecls("w")}>
            <w:top w:w="{top}" w:type="dxa"/>
            <w:bottom w:w="{bottom}" w:type="dxa"/>
            <w:left w:w="{left}" w:type="dxa"/>
            <w:right w:w="{right}" w:type="dxa"/>
        </w:tcMar>
    ''')
    tcPr.append(tcMar)

def add_callout(doc, text, title="IMPORTANT NOTICE"):
    table = doc.add_table(rows=1, cols=1)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    
    cell = table.cell(0, 0)
    cell.width = Inches(6.5)
    set_cell_background(cell, "F0F9FF")
    set_cell_margins(cell, top=120, bottom=120, left=180, right=180)
    
    tcPr = cell._tc.get_or_add_tcPr()
    borders = parse_xml(f'''
        <w:tcBorders {nsdecls("w")}>
            <w:top w:val="none"/>
            <w:left w:val="single" w:sz="36" w:space="0" w:color="0284C7"/>
            <w:bottom w:val="none"/>
            <w:right w:val="none"/>
        </w:tcBorders>
    ''')
    tcPr.append(borders)
    
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.line_spacing = 1.15
    run_title = p.add_run(f"[{title}] ")
    run_title.bold = True
    run_title.font.name = "Segoe UI"
    run_title.font.size = Pt(9.5)
    run_title.font.color.rgb = RGBColor(2, 132, 199)
    
    run_text = p.add_run(text)
    run_text.font.name = "Segoe UI"
    run_text.font.size = Pt(9.5)
    run_text.font.color.rgb = RGBColor(15, 23, 42)
    
    doc.add_paragraph().paragraph_format.space_after = Pt(4)

def format_table(table, col_widths, headers, data, alt_shading="F8FAFC"):
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    
    # Format header row
    hdr_row = table.rows[0]
    hdr_row._tr.get_or_add_trPr().append(parse_xml(f'<w:tblHeader {nsdecls("w")}/>'))
    for idx, heading in enumerate(headers):
        cell = hdr_row.cells[idx]
        cell.width = Inches(col_widths[idx])
        cell.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
        set_cell_background(cell, "0F172A")
        set_cell_margins(cell, top=120, bottom=120, left=140, right=140)
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.LEFT
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(0)
        run = p.add_run(heading)
        run.bold = True
        run.font.name = "Segoe UI"
        run.font.size = Pt(9.5)
        run.font.color.rgb = RGBColor(255, 255, 255)
        
    # Format data rows
    for r_idx, row_data in enumerate(data):
        row = table.rows[r_idx + 1]
        bg_color = alt_shading if r_idx % 2 == 1 else "FFFFFF"
        for c_idx, cell_value in enumerate(row_data):
            cell = row.cells[c_idx]
            cell.width = Inches(col_widths[c_idx])
            cell.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
            set_cell_background(cell, bg_color)
            set_cell_margins(cell, top=80, bottom=80, left=140, right=140)
            p = cell.paragraphs[0]
            p.alignment = WD_ALIGN_PARAGRAPH.LEFT
            p.paragraph_format.space_before = Pt(0)
            p.paragraph_format.space_after = Pt(0)
            run = p.add_run(str(cell_value))
            run.font.name = "Segoe UI"
            run.font.size = Pt(9)
            run.font.color.rgb = RGBColor(31, 41, 55)

def build_docx():
    doc = Document()
    
    # Page setup: Standard Letter, 0.8 in margins
    for section in doc.sections:
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(0.8)
        section.right_margin = Inches(0.8)
        
    # Configure default style
    style_normal = doc.styles['Normal']
    style_normal.font.name = 'Segoe UI'
    style_normal.font.size = Pt(10)
    style_normal.font.color.rgb = RGBColor(31, 41, 55)
    style_normal.paragraph_format.line_spacing = 1.15
    style_normal.paragraph_format.space_after = Pt(4)
    
    # Helper functions for hierarchy
    def add_doc_title(text):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.LEFT
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(2)
        run = p.add_run(text)
        run.bold = True
        run.font.name = 'Segoe UI'
        run.font.size = Pt(24)
        run.font.color.rgb = RGBColor(15, 23, 42) # Slate-900

    def add_doc_subtitle(text):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.LEFT
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(12)
        run = p.add_run(text)
        run.font.name = 'Segoe UI'
        run.font.size = Pt(11)
        run.font.color.rgb = RGBColor(71, 85, 105) # Slate-600

    def add_h1(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(18)
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(text)
        run.bold = True
        run.font.name = 'Segoe UI'
        run.font.size = Pt(16)
        run.font.color.rgb = RGBColor(30, 64, 175) # Blue-800

    def add_h2(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(12)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(text)
        run.bold = True
        run.font.name = 'Segoe UI'
        run.font.size = Pt(12.5)
        run.font.color.rgb = RGBColor(30, 41, 59) # Slate-800

    def add_h3(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(8)
        p.paragraph_format.space_after = Pt(2)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(text)
        run.bold = True
        run.font.name = 'Segoe UI'
        run.font.size = Pt(11)
        run.font.color.rgb = RGBColor(51, 65, 85) # Slate-700

    def add_bullet(text, level=0, bold_prefix=None):
        p = doc.add_paragraph(style='List Bullet')
        p.paragraph_format.space_before = Pt(1)
        p.paragraph_format.space_after = Pt(2)
        p.paragraph_format.line_spacing = 1.15
        p.paragraph_format.left_indent = Inches(0.25 * (level + 1))
        if bold_prefix:
            run_b = p.add_run(bold_prefix)
            run_b.bold = True
            run_b.font.name = 'Segoe UI'
            run_b.font.size = Pt(10)
            run_b.font.color.rgb = RGBColor(15, 23, 42)
        run_t = p.add_run(text)
        run_t.font.name = 'Segoe UI'
        run_t.font.size = Pt(10)
        run_t.font.color.rgb = RGBColor(55, 65, 81)

    def add_code_block(code_text):
        table = doc.add_table(rows=1, cols=1)
        table.alignment = WD_TABLE_ALIGNMENT.CENTER
        table.autofit = False
        cell = table.cell(0, 0)
        cell.width = Inches(6.5)
        set_cell_background(cell, "F8FAFC")
        set_cell_margins(cell, top=100, bottom=100, left=150, right=150)
        
        tcPr = cell._tc.get_or_add_tcPr()
        borders = parse_xml(f'''
            <w:tcBorders {nsdecls("w")}>
                <w:top w:val="single" w:sz="6" w:space="0" w:color="E2E8F0"/>
                <w:left w:val="single" w:sz="24" w:space="0" w:color="3B82F6"/>
                <w:bottom w:val="single" w:sz="6" w:space="0" w:color="E2E8F0"/>
                <w:right w:val="single" w:sz="6" w:space="0" w:color="E2E8F0"/>
            </w:tcBorders>
        ''')
        tcPr.append(borders)
        
        p = cell.paragraphs[0]
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(0)
        p.paragraph_format.line_spacing = 1.1
        run = p.add_run(code_text)
        run.font.name = 'Consolas'
        run.font.size = Pt(8.5)
        run.font.color.rgb = RGBColor(30, 41, 59)
        doc.add_paragraph().paragraph_format.space_after = Pt(4)

    # -------------------------------------------------------------
    # DOCUMENT HEADER & METADATA
    # -------------------------------------------------------------
    add_doc_title("SmartServe: Technical & Functional Master Specification")
    add_doc_subtitle(
        "Platform Architecture · Multi-Portal Ecosystem · 14-Category Master Catalog (457 Services) · "
        "Event-Driven Streaming (Kafka + WebSockets) · Intelligent Document Processing & Assistive AI · "
        "Production Candidate 2.4.0 — September 30, 2026\n"
        "Engineered by Pushkar Kanjani (Provider Ecosystem & Cloud) & Aastha (Customer Ecosystem & AI/ML)"
    )
    
    add_callout(
        doc,
        "This specification represents the authoritative functional, architectural, and operational benchmark for the SmartServe platform. "
        "It details all completed subsystems, data models, state transition machines, security controls, and forward backlog.",
        title="EXECUTIVE ARCHITECTURE SPECIFICATION"
    )

    # -------------------------------------------------------------
    # 1. EXECUTIVE SUMMARY & SYSTEM OVERVIEW
    # -------------------------------------------------------------
    add_h1("1. Executive Summary & System Overview")
    
    add_h2("1.1 Project Vision & Market Problem")
    p = doc.add_paragraph()
    p.add_run(
        "SmartServe is an enterprise-grade on-demand service marketplace designed to connect home service consumers with certified, "
        "vetted professionals (service providers) under strict administrative governance. Modern on-demand service ecosystems frequently "
        "suffer from severe operational friction: slow and error-prone KYC verification, catalog content pollution, broken state transitions, "
        "and lack of synchronous multi-party communication. SmartServe solves these issues through a high-performance FastAPI modular monolith, "
        "dual-engine optical character recognition (PaddleOCR + EasyOCR), assistive LLM risk scoring, Apache Kafka event streaming, "
        "and reactive WebSockets broadcasting."
    )
    
    add_h2("1.2 Multi-Portal Architecture Overview")
    p = doc.add_paragraph()
    p.add_run(
        "The platform delivers four decoupled client interfaces communicating with a centralized RESTful & WebSocket backend engine:"
    )
    add_bullet("Admin Operations Portal (Port 5173): React 18, Vite, TypeScript, Tailwind CSS, Recharts analytics, KYC verification desk, live booking command center.", bold_prefix="• ")
    add_bullet("Customer Web Portal (Port 5174/5176): React 18, Vite, responsive UI, 14-sector service discovery, slot scheduler, live order tracker.", bold_prefix="• ")
    add_bullet("Provider Web Portal (Port 5175): Standalone partner application, Ivory/Forest-Green design, 6-step onboarding wizard, daily cockpit, slot manager.", bold_prefix="• ")
    add_bullet("Native Mobile Client (Port 8081 / Expo): React Native, native stack navigation, touch booking sheet, turn-by-turn map telemetry.", bold_prefix="• ")
    add_bullet("Landing & Marketing Portal (Port 5177/3000): Customer acquisition, service highlights, direct authentication entry points.", bold_prefix="• ")

    add_h2("1.3 Core Target Personas & Security Roles")
    table_p = doc.add_table(rows=5, cols=3)
    format_table(
        table_p,
        [1.5, 2.0, 3.0],
        ["Role Key", "Persona", "Responsibilities & Access Boundary"],
        [
            ["customer", "End Consumer", "Discovers services, books availability slots, selects providers, monitors live vehicle arrival, validates work via OTP."],
            ["provider", "Service Professional", "Submits KYC credentials, manages work calendar, receives job dispatches, updates lifecycle (Accept/Start/Complete)."],
            ["admin", "Operations Admin", "Validates provider KYC dossiers, reviews OCR extraction, monitors bookings, oversees 14-category catalog, resolves tickets."],
            ["super_admin", "System Administrator", "Configures security rules, manages admin accounts, revokes sessions, monitors fraud and audit logs."]
        ]
    )

    # -------------------------------------------------------------
    # 2. TOOLS, TECHNOLOGIES & INFRASTRUCTURE STACK
    # -------------------------------------------------------------
    add_h1("2. Tools, Technologies & Infrastructure Stack")
    
    add_h2("2.1 Backend Core & API Layer")
    add_bullet("Python 3.11+: Modern asynchronous runtime utilizing strict type annotations and pattern matching.", bold_prefix="• Language: ")
    add_bullet("FastAPI: Asynchronous ASGI framework for high-throughput HTTP REST routes and WebSocket streaming.", bold_prefix="• Web Framework: ")
    add_bullet("Uvicorn: Lightning-fast ASGI production web server running on uvloop.", bold_prefix="• Server: ")
    add_bullet("Pydantic v2: Strict schema validation, data serialization, and tracking of explicitly mutated fields via model_fields_set.", bold_prefix="• Validation: ")
    add_bullet("SQLAlchemy 2.0: Declarative ORM managing connection pooling, ACID transactions, and JSONB queries.", bold_prefix="• Database ORM: ")
    add_bullet("Alembic: Automated relational schema versioning and database migration management.", bold_prefix="• Migrations: ")

    add_h2("2.2 Data Stores & Streaming Pipeline")
    add_bullet("PostgreSQL 16: Primary relational database storing all transactional, booking, provider, customer, catalog, and security data.", bold_prefix="• Relational Engine: ")
    add_bullet("MongoDB: NoSQL document store capturing unstructured media metadata, deep OCR hierarchy trees, and GPS telemetry logs.", bold_prefix="• Document Store: ")
    add_bullet("Apache Kafka (aiokafka): Distributed pub/sub streaming platform handling state mutation events across topics.", bold_prefix="• Event Broker: ")
    add_bullet("In-Memory Store (store.py): Resilient fallback ring-buffer enabling zero-dependency local execution without external Kafka.", bold_prefix="• Dev Fallback: ")
    add_bullet("WebSockets: Multi-channel real-time gateway (/ws/stream, /ws/dashboard, /ws/bookings, /ws/tracking) broadcasting instant updates.", bold_prefix="• Real-Time Gateway: ")

    add_h2("2.3 AI, Computer Vision & Intelligent Document Processing (IDP)")
    add_bullet("OpenRouter LLM Gateway: Unified AI gateway utilizing ox-alpha, Claude 3.5 Sonnet, and GPT-4o for catalog enrichment.", bold_prefix="• AI Gateway: ")
    add_bullet("PaddleOCR: Primary deep-learning OCR engine extracting legal names, document numbers, and authority metadata.", bold_prefix="• Primary OCR: ")
    add_bullet("EasyOCR: PyTorch-based neural OCR fallback executing when document geometry or characters fail primary processing.", bold_prefix="• Secondary OCR: ")
    add_bullet("OpenCV (cv2) & Pillow: Computer vision pre-processing computing Laplacian variance to detect and reject blurry uploads.", bold_prefix="• Quality Engine: ")
    add_bullet("Levenshtein Distance: Normalized string similarity algorithm matching OCR document names against provider legal profiles.", bold_prefix="• Identity Match: ")

    add_h2("2.4 Frontend, Mobile & Testing Suites")
    add_bullet("React 18 & Vite: High-performance client-side rendering with lightning-fast HMR and modular component architecture.", bold_prefix="• Frontend Core: ")
    add_bullet("Tailwind CSS: Curated design tokens, responsive breakpoints, sleek dark modes, and custom micro-animations.", bold_prefix="• Styling: ")
    add_bullet("React Native (Expo SDK 51+): Cross-platform mobile client featuring native stack routing and touch-optimized sheets.", bold_prefix="• Mobile Core: ")
    add_bullet("Playwright & Puppeteer: Multi-browser concurrency test runner testing live event propagation across concurrent user sessions.", bold_prefix="• E2E Testing: ")
    add_bullet("Pytest & HTTPX: Asynchronous backend test framework validating endpoint contracts, RBAC isolation, and DB regression.", bold_prefix="• Unit/API Testing: ")

    # -------------------------------------------------------------
    # 3. METHODOLOGIES & ARCHITECTURAL PATTERNS
    # -------------------------------------------------------------
    add_h1("3. Methodologies & Architectural Patterns")

    add_h2("3.1 Inviolable Master Catalog Protection Policy (11 Golden Rules)")
    p = doc.add_paragraph()
    p.add_run(
        "To prevent catastrophic data loss during automated batch operations or AI-assisted enrichment, the platform enforces "
        "an inviolable 11-rule protection policy (formalized in CATALOG_PROTECTION_POLICY.md):"
    )
    
    table_rules = doc.add_table(rows=12, cols=3)
    format_table(
        table_rules,
        [1.0, 2.0, 3.5],
        ["Rule #", "Policy Invariant", "Technical Implementation & Safeguard"],
        [
            ["Rule 1", "Master Source of Truth", "Authoritative catalog resides exclusively in local PostgreSQL; remote stores cannot override."],
            ["Rule 2", "Customer App Read-Only", "Customer API possesses zero write or mutation endpoints for services, categories, or add-ons."],
            ["Rule 3", "Authorized Admin Path", "All mutations require require_admin token dependency at /api/v1/admin/catalog/*."],
            ["Rule 4", "No Automated AI Overwrites", "AI generation scripts cannot autonomously write to active DB records without explicit admin trigger."],
            ["Rule 5", "Safe Partial Merging", "Uses req.model_fields_set; omitted fields in PUT requests remain 100% untouched."],
            ["Rule 6", "Zero Silent Data Loss", "Non-empty database blocks (faqs, steps, tools) cannot be replaced by null, '', or empty []."],
            ["Rule 7", "Add-On Immutability", "Persistent service add-ons cannot be dropped or regenerated during metadata text edits."],
            ["Rule 8", "Explicit Authorization", "Bulk category updates require interactive user parameters; no headless batch mutations."],
            ["Rule 9", "Pre-Write Backup Mandate", "Pre-write script automatically dumps JSON + XLSX backup into backend/backups/."],
            ["Rule 10", "Post-Write Read-Back", "Transactions execute immediate fresh SELECT query to verify persistence before HTTP 200."],
            ["Rule 11", "Immediate Abort on Anomaly", "Any unexpected metadata corruption or type discrepancy triggers an instant SQL ROLLBACK."]
        ]
    )

    add_h2("3.2 Dual-Engine OCR & Assistive AI Verification Framework")
    p = doc.add_paragraph()
    p.add_run(
        "Provider verification incorporates a strict Human-in-the-Loop philosophy. The AI engine is strictly assistive—it never "
        "autonomously grants verification. It analyzes image clarity (Laplacian variance), performs OCR text extraction, verifies document "
        "format validity (12-digit Aadhaar, 10-char PAN), checks cross-account duplicate documents, evaluates document expiry dates, and "
        "computes Levenshtein name similarity against the registered profile. It compiles these vectors into a bounded Risk Score (0.00 – 1.00) "
        "and routes the dossier to the Admin Verification Desk with categorical flags (LOW, MEDIUM, HIGH)."
    )

    add_h2("3.3 Finite State Machines (FSM)")
    add_h3("Booking State Machine")
    add_code_block(
        "CUSTOMER BOOKS -> [REQUESTED]\n"
        "                     |  \\\n"
        "     Provider Rejects|   \\ Provider Accepts\n"
        "      or 15m Timeout |    \\\n"
        "                     v     v\n"
        "               [REJECTED] [ACCEPTED]\n"
        "                              |\n"
        "                              | Provider clicks 'Start Job'\n"
        "                              v\n"
        "                          [STARTED]\n"
        "                              |\n"
        "                              | Customer provides 4-digit OTP\n"
        "                              v\n"
        "                         [COMPLETED]"
    )
    p = doc.add_paragraph()
    p.add_run("Invalid transitions (e.g. attempting to jump from REQUESTED to COMPLETED) are rejected by the backend state validator with HTTP 400 Bad Request.")

    add_h2("3.4 Zero-Trust RBAC & Ownership Hardening")
    p = doc.add_paragraph()
    p.add_run(
        "Following a comprehensive security audit, all endpoints enforce strict ownership boundaries. In customer.py, all booking details, "
        "cancellations, and feedback submissions enforce WHERE booking.customer_id == current_customer.id. In providers.py, schedule updates "
        "and job acceptances enforce WHERE booking.provider_id == current_provider.id. Cross-account tampering and IDOR vectors are completely eliminated."
    )

    add_h2("3.5 Dynamic Domain Anti-Contamination Matrix")
    p = doc.add_paragraph()
    p.add_run(
        "To ensure that AI content generation does not pollute catalog services with cross-domain terminology, the backend classifies services "
        "into operational domains (e.g. food, beauty, electrical, plumbing, cleaning, carpentry, pet). If an electrical service contains beauty "
        "terms (such as 'pedicure' or 'facial') or a food service contains electrical terms ('multimeter', 'voltage'), the validator halts and rejects the payload."
    )

    # -------------------------------------------------------------
    # 4. CHRONOLOGICAL CHANGES & REFACTORING HISTORY
    # -------------------------------------------------------------
    add_h1("4. Chronological Engineering Changes & Refactoring History")

    table_phases = doc.add_table(rows=8, cols=3)
    format_table(
        table_phases,
        [1.2, 2.0, 3.3],
        ["Phase", "Milestone Focus", "Key Engineering Changes Implemented"],
        [
            ["Phase 1", "Database Re-anchoring & Catalog Regeneration", "Moved from suspended Neon cloud to local PostgreSQL 16. Regenerated Categories 1 & 2 (87 services). Expanded full 14 categories (457 services). Enforced 11-rule Catalog Protection Policy."],
            ["Phase 2", "RBAC & IDOR Remediation", "Removed all mock authentication fallbacks in dependencies.py. Enforced strict JWT claims and customer/provider ownership filters. Achieved 16/16 security test pass."],
            ["Phase 3", "OCR & Intelligent Onboarding", "Built ocr_service.py with PaddleOCR + EasyOCR. Added Laplacian variance blur detection, regex checks for Aadhaar/PAN, and AI risk scoring in ai_service.py."],
            ["Phase 4", "Standalone Provider Portal", "Architected provider-frontend on port 5175 with Partner Design System. Created 6-step onboarding wizard, daily cockpit dashboard, and weekly availability scheduler."],
            ["Phase 5", "Kafka Streaming & Real-Time Sync", "Implemented aiokafka producer/consumer layer and unified /ws/stream WebSocket gateway. Verified zero-reload live synchronization across Admin, Provider, and Customer browsers."],
            ["Phase 6", "Swiggy-Style Live Order Tracking", "Built 5-step visual tracking journey, animated telemetry coordinate simulator, dynamic ETA countdown, and OTP verification gateway."],
            ["Phase 7", "Mobile App Parity & Full Audit", "Developed React Native navigation stack in mobile/, integrating live tracking, booking modal, catalog explorer, and profile management."]
        ]
    )

    # -------------------------------------------------------------
    # 5. DETAILED FEATURES IMPLEMENTED
    # -------------------------------------------------------------
    add_h1("5. Detailed Features Implemented (Deep Dive by Component)")

    add_h2("5.1 Master Service Catalog (14 Categories, 457 Services)")
    p = doc.add_paragraph()
    p.add_run("The platform features 14 fully populated sectors with 78 subcategories and 457 discrete service entities in PostgreSQL:")
    
    table_cat = doc.add_table(rows=15, cols=4)
    format_table(
        table_cat,
        [0.8, 2.8, 1.4, 1.5],
        ["Cat #", "Category Name", "Subcategories", "Verified Services"],
        [
            ["01", "Beauty, Salon & Spa", "6 Subcategories", "55 Services"],
            ["02", "Cleaning & Home Cleaning", "5 Subcategories", "32 Services"],
            ["03", "Painting, Waterproofing & Home Improvement", "4 Subcategories", "23 Services"],
            ["04", "AC, Appliance & Electronics Repair", "10 Subcategories", "46 Services"],
            ["05", "Electrician, Plumber, Carpenter & Home Repairs", "3 Subcategories", "39 Services"],
            ["06", "Smart Home & Security", "5 Subcategories", "30 Services"],
            ["07", "Domestic Help & Cooking", "5 Subcategories", "30 Services"],
            ["08", "Education, Teachers & Coaching", "5 Subcategories", "30 Services"],
            ["09", "Health, Fitness & Wellness", "5 Subcategories", "30 Services"],
            ["10", "Events, Photography & Entertainment", "5 Subcategories", "30 Services"],
            ["11", "Pet Services", "5 Subcategories", "25 Services"],
            ["12", "Technology & Digital Services", "5 Subcategories", "30 Services"],
            ["13", "Professional & Business Services", "6 Subcategories", "30 Services"],
            ["14", "Moving, Delivery & Local Assistance", "5 Subcategories", "27 Services"]
        ]
    )
    p_tot = doc.add_paragraph()
    p_tot.paragraph_format.space_before = Pt(4)
    p_tot.add_run("TOTAL PLATFORM MASTER CATALOG: 78 Subcategories · 457 Production Services Persisted").bold = True

    add_h2("5.2 Provider Portal & Onboarding Ecosystem")
    add_bullet("6-Step Registration Wizard: Captures personal bio, Aadhaar/PAN KYC uploads, NDA signing, master catalog service mapping (max 3), and category-specific trade evidence.", bold_prefix="• Onboarding: ")
    add_bullet("Partner Operational Cockpit: Displays today's jobs, pipeline metrics, and incoming requests with active countdown timer and Accept/Reject triggers.", bold_prefix="• Cockpit: ")
    add_bullet("Weekly Availability & Slot Manager: Allows providers to define custom and recurring time slots with automated overlap validation.", bold_prefix="• Calendar: ")
    add_bullet("Partner Profile & Support: Read-only verification status badge, rating overview, and dedicated ticketing desk.", bold_prefix="• Account: ")

    add_h2("5.3 Customer Web & Mobile Booking Experience")
    add_bullet("4-Level Catalog Exploration: Level 1 (Sector Grid) -> Level 2 (Subcategories) -> Level 3 (Service Cards) -> Level 4 (Full Detail View).", bold_prefix="• Discovery: ")
    add_bullet("Availability-Constrained Slot Picker: Queries live provider calendars to present only unreserved, valid future slots.", bold_prefix="• Slot Booking: ")
    add_bullet("Dual Provider Selection Modes: Option to hand-pick preferred verified provider or opt for automated fast dispatch.", bold_prefix="• Dispatch: ")
    add_bullet("Add-ons & Real-Time Price Calculation: Dynamic recalculation of total cost based on selected add-on upgrades.", bold_prefix="• Pricing: ")

    add_h2("5.4 Swiggy-Style Live Tracking & GPS Telemetry")
    add_bullet("5-Stage Visual Stepper: Order Confirmed -> Partner Assigned -> Partner En Route -> Service In Progress -> Service Completed.", bold_prefix="• Stepper: ")
    add_bullet("Animated Map Marker: Vehicle marker smoothly moves along polyline route towards customer location via WebSockets.", bold_prefix="• Telemetry: ")
    add_bullet("Dynamic ETA Calculation: Live countdown reflecting remaining travel duration.", bold_prefix="• Countdown: ")
    add_bullet("OTP Job Handshake: 4-digit verification code displayed to customer; provider must enter OTP to finish job.", bold_prefix="• Security: ")

    add_h2("5.5 Admin Control Tower & Governance")
    add_bullet("Operations KPI Dashboard: Aggregated platform metrics, revenue trends, booking distributions, and live event feed.", bold_prefix="• Dashboard: ")
    add_bullet("Provider Verification Desk: Side-by-side KYC document viewer with OCR extraction and AI Risk Analysis dossier.", bold_prefix="• Verification: ")
    add_bullet("Bookings Command Center: Real-time tabular feed of all bookings with status filtering and slot visibility.", bold_prefix="• Bookings: ")
    add_bullet("Catalog Governance Suite: Full CRUD controls governed by the 11-rule protection policy.", bold_prefix="• Catalog: ")
    add_bullet("Security Center & Audit Log: Immutable audit log tracking administrative mutations and suspicious login activity.", bold_prefix="• Security: ")

    add_h2("5.6 Real-Time Communication & Support")
    add_bullet("Customer-Provider Chat: Real-time WebSocket messaging linked to active bookings for arrival coordination.", bold_prefix="• Direct Chat: ")
    add_bullet("Support Ticket Desk: Bi-directional ticketing system for billing, service quality, and platform inquiries.", bold_prefix="• Support: ")

    # -------------------------------------------------------------
    # 6. REMAINING BACKLOG & FUTURE ROADMAP
    # -------------------------------------------------------------
    add_h1("6. Remaining Backlog & Future Product Roadmap")

    add_h2("6.1 Short-Term Operational Priorities")
    add_bullet("Oct 1st Neon Database Reconciliation: One-time SQL diff of Categories 1 & 2 against restored Neon compute.", bold_prefix="1. Neon Audit: ")
    add_bullet("End-to-End Payment Gateway Integration: Replace mock payment tokens with live Razorpay/Stripe webhooks and escrow hold.", bold_prefix="2. Payments: ")

    add_h2("6.2 Medium-Term Platform Enhancements")
    add_bullet("Production Google Maps / Mapbox SDK: Replace simulated coordinates with real mobile device GPS location streams.", bold_prefix="1. Native Maps: ")
    add_bullet("Push Notification Infrastructure: Integrate FCM (Android) and APNs (iOS) for background dispatch alerts.", bold_prefix="2. Push Alerts: ")
    add_bullet("Surge & Dynamic Pricing Engine: Algorithmic pricing adjustments based on peak hours and weather conditions.", bold_prefix="3. Surge Engine: ")

    add_h2("6.3 Long-Term Enterprise Architecture")
    add_bullet("Microservices Decomposition: Extract high-throughput tracking and chat services into standalone Go services on Kubernetes.", bold_prefix="1. Microservices: ")
    add_bullet("Machine Learning Dispatch: Ranking algorithms incorporating travel distance, provider ratings, and acceptance rates.", bold_prefix="2. ML Dispatch: ")
    add_bullet("Mobile App Store Releases: Production builds (.aab and .ipa) with native biometric authentication.", bold_prefix="3. App Stores: ")

    # -------------------------------------------------------------
    # 7. APPENDIX & TOPOLOGY MATRIX
    # -------------------------------------------------------------
    add_h1("7. Appendix & Reference Artifacts")

    add_h2("7.1 Port Allocation & Service Topology")
    table_top = doc.add_table(rows=8, cols=4)
    format_table(
        table_top,
        [1.8, 1.8, 1.2, 1.7],
        ["Service Application", "Framework / Runtime", "Port", "URL / Endpoint"],
        [
            ["Backend API & WS", "FastAPI / Uvicorn", "8000", "http://localhost:8000/docs"],
            ["Admin Portal", "React 18 / Vite", "5173", "http://localhost:5173"],
            ["Customer Portal", "React 18 / Vite", "5174/5176", "http://localhost:5174"],
            ["Provider Portal", "React 18 / Vite", "5175", "http://localhost:5175"],
            ["Landing Portal", "React 18 / Vite", "5177/3000", "http://localhost:5177"],
            ["Mobile Client", "React Native (Expo)", "8081", "Metro Bundler"],
            ["PostgreSQL Database", "PostgreSQL 16", "5432", "localhost:5432/smartserve"]
        ]
    )

    add_h2("7.2 Verification Pass & Security Audit Status")
    p_audit = doc.add_paragraph()
    p_audit.add_run(
        "• Live Concurrency Test: 19/19 Criteria Verified via multi-role browser execution (FINAL_PROVIDER_MODULE_REPORT.md)\n"
        "• RBAC Security Audit: 16/16 Test Vectors Passed with 0 IDOR vulnerabilities (test_phase12_rbac_audit.py)\n"
        "• Master Catalog Integrity: 457/457 Services verified intact, JSON/XLSX backed up, 11-rule policy enforced."
    )

    output_path = os.path.abspath("SMARTSERVE_FUNCTIONAL_SPECIFICATION_DOCUMENT.docx")
    doc.save(output_path)
    print(f"Successfully generated DOCX specification: {output_path}")

if __name__ == "__main__":
    build_docx()
