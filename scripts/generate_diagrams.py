import os
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as patches

ASSETS_DIR = r"c:\MyDrive\SEM-7\BigData\SmartServe\docs\assets"
os.makedirs(ASSETS_DIR, exist_ok=True)

# Common styling constants
C_PRIMARY = "#2F5233"     # SmartServe Forest Green
C_SECONDARY = "#C9A15A"   # SmartServe Warm Gold
C_DARK = "#1F2A1E"        # Dark Forest Slate
C_LIGHT = "#FAF7F0"       # Light Warm Ivory
C_ACCENT = "#3B82F6"      # Soft Blue
C_WARN = "#F59E0B"        # Amber
C_CARD_BG = "#FFFFFF"     # White Card
C_BORDER = "#D1D5DB"      # Border Gray
C_BG = "#F8FAFC"          # Slate 50

# ----------------------------------------------------------------------
# 1. High-Level Architecture Diagram
# ----------------------------------------------------------------------
def generate_architecture():
    fig, ax = plt.subplots(figsize=(12, 7.5), facecolor=C_BG)
    ax.set_facecolor(C_BG)
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    # Header
    ax.text(50, 96, "SmartServe System Architecture (Mid-Semester Milestone State)", 
            ha='center', va='center', fontsize=15, fontweight='bold', color=C_DARK)
    ax.text(50, 93, "Multi-Tier Modular Architecture with Cloud Persistence & Future Event Bus", 
            ha='center', va='center', fontsize=10, color="#64748B")

    # Tier 1: Presentation Layer
    ax.add_patch(patches.FancyBboxPatch((4, 73), 92, 17, boxstyle="round,pad=1", fc="#EFF6FF", ec="#93C5FD", lw=1.5))
    ax.text(8, 87.5, "TIER 1: PRESENTATION LAYER (React 19 + Vite SPAs on Vercel)", fontsize=11, fontweight='bold', color="#1E40AF")
    
    portals = [
        ("Landing Gateway\n(Role Selector & Showcase)", 6, 75, 20),
        ("Customer Portal\n(Catalog, Bookings, Support)", 29, 75, 20),
        ("Provider Portal\n(Workspace & KYC Onboarding)", 52, 75, 20),
        ("Admin Control Tower\n(Governance & Verifications)", 75, 75, 20),
    ]
    for title, x, y, w in portals:
        ax.add_patch(patches.FancyBboxPatch((x, y), w, 10, boxstyle="round,pad=0.5", fc=C_CARD_BG, ec=C_PRIMARY, lw=1.2))
        ax.text(x + w/2, y + 5, title, ha='center', va='center', fontsize=8.5, fontweight='bold', color=C_DARK)

    # Connecting Arrows
    for x in [16, 39, 62, 85]:
        ax.annotate('', xy=(x, 57), xytext=(x, 74), arrowprops=dict(arrowstyle="->", color="#64748B", lw=1.5))

    # Tier 2: API Gateway & Application Layer
    ax.add_patch(patches.FancyBboxPatch((4, 38), 92, 18, boxstyle="round,pad=1", fc="#F0FDF4", ec="#86EFAC", lw=1.5))
    ax.text(8, 53.5, "TIER 2: API GATEWAY & BUSINESS DOMAINS (FastAPI on Render Cloud)", fontsize=11, fontweight='bold', color=C_PRIMARY)
    
    modules = [
        ("Auth & Security\n(JWT, Salted Hashing)", 6, 40, 16),
        ("Master Catalog\n(14 Cats, 457 Services)", 24, 40, 16),
        ("Booking State Engine\n(Atomic 5-Stage FSM)", 42, 40, 16),
        ("Dual-Engine IDP\n(PaddleOCR + EasyOCR)", 60, 40, 16),
        ("RBAC & IDOR Guard\n(Zero-Trust Policy)", 78, 40, 16),
    ]
    for title, x, y, w in modules:
        ax.add_patch(patches.FancyBboxPatch((x, y), w, 10.5, boxstyle="round,pad=0.5", fc=C_CARD_BG, ec=C_SECONDARY, lw=1.2))
        ax.text(x + w/2, y + 5.25, title, ha='center', va='center', fontsize=8, fontweight='bold', color=C_DARK)

    # Connecting Arrows to Tier 3
    ax.annotate('', xy=(28, 24), xytext=(28, 38), arrowprops=dict(arrowstyle="->", color=C_PRIMARY, lw=2))
    ax.annotate('', xy=(72, 24), xytext=(72, 38), arrowprops=dict(arrowstyle="->", color=C_WARN, lw=2, linestyle="dashed"))

    # Tier 3A: Persistence Layer (Implemented)
    ax.add_patch(patches.FancyBboxPatch((4, 4), 44, 19, boxstyle="round,pad=1", fc=C_CARD_BG, ec=C_PRIMARY, lw=2))
    ax.text(26, 20.5, "TIER 3A: PERSISTENCE STORE (IMPLEMENTED)", ha='center', fontsize=9.5, fontweight='bold', color=C_PRIMARY)
    ax.text(26, 17, "Supabase Managed PostgreSQL 16 (aws-ap-southeast-2)", ha='center', fontsize=8.5, color="#475569")
    tables_txt = "Normalized Relational Schemas: users, customers, providers,\nservice_categories, services, bookings, booking_status_history,\nprovider_documents, support_tickets (50+ Seeded Records)"
    ax.text(26, 10, tables_txt, ha='center', va='center', fontsize=7.5, color=C_DARK)

    # Tier 3B: Event-Driven Bus (Planned for End-Sem)
    ax.add_patch(patches.FancyBboxPatch((52, 4), 44, 19, boxstyle="round,pad=1", fc="#FFFBEB", ec=C_WARN, lw=2, linestyle="dashed"))
    ax.text(74, 20.5, "TIER 3B: DISTRIBUTED EVENT BUS (IN PROGRESS / END-SEM)", ha='center', fontsize=9.5, fontweight='bold', color="#B45309")
    ax.text(74, 17, "Apache Kafka / Redpanda Cloud Serverless Backbone", ha='center', fontsize=8.5, color="#78350F")
    kafka_txt = "Canonical Topics (Designed): booking.created, booking.accepted,\nbooking.rejected, booking.started, booking.completed,\nprovider.location.updated, support.message\n[Real-time Driver Telemetry & Consumer Sync Pending]"
    ax.text(74, 10, kafka_txt, ha='center', va='center', fontsize=7.5, color="#92400E")

    plt.tight_layout()
    plt.savefig(os.path.join(ASSETS_DIR, "architecture_diagram.png"), dpi=300)
    plt.close()
    print("Saved architecture_diagram.png")

# ----------------------------------------------------------------------
# 2. UML Class Diagram
# ----------------------------------------------------------------------
def generate_class_diagram():
    fig, ax = plt.subplots(figsize=(12, 8), facecolor=C_BG)
    ax.set_facecolor(C_BG)
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    ax.text(50, 96, "SmartServe Core Domain Entity Class Diagram (UML)", 
            ha='center', va='center', fontsize=15, fontweight='bold', color=C_DARK)

    classes = [
        ("User", 5, 55, 26, 34, [
            "+ id: UUID",
            "+ email: String",
            "+ password_hash: String",
            "+ role: UserRole (enum)",
            "+ is_active: Boolean",
            "+ created_at: DateTime"
        ], [
            "+ verify_password(pw): bool",
            "+ generate_jwt_token(): str"
        ]),
        ("Customer", 5, 10, 26, 36, [
            "+ id: UUID",
            "+ user_id: UUID (FK)",
            "+ full_name: String",
            "+ phone_number: String",
            "+ address_line1: String",
            "+ city: String, pincode: String"
        ], [
            "+ get_active_bookings(): list",
            "+ create_booking(svc_id): Booking",
            "+ cancel_booking(b_id): void"
        ]),
        ("Provider", 37, 55, 27, 34, [
            "+ id: UUID",
            "+ user_id: UUID (FK)",
            "+ business_name: String",
            "+ rating: Float (avg)",
            "+ is_verified: Boolean",
            "+ kyc_status: KYCStatus (enum)"
        ], [
            "+ update_availability(slots): void",
            "+ accept_booking(b_id): void",
            "+ complete_with_otp(otp): bool"
        ]),
        ("Service", 70, 55, 26, 34, [
            "+ id: UUID",
            "+ category_id: UUID (FK)",
            "+ title: String",
            "+ base_price: Decimal",
            "+ duration_minutes: Integer",
            "+ is_active: Boolean"
        ], [
            "+ calculate_final_price(): Decimal",
            "+ get_inclusions(): list"
        ]),
        ("Booking", 37, 10, 27, 36, [
            "+ id: UUID",
            "+ customer_id: UUID (FK)",
            "+ provider_id: UUID (FK)",
            "+ service_id: UUID (FK)",
            "+ status: BookingStatus (enum)",
            "+ scheduled_time: DateTime",
            "+ total_amount: Decimal",
            "+ completion_otp: String"
        ], [
            "+ transition_to(new_state): bool",
            "+ verify_completion_otp(otp): bool",
            "+ append_audit_trail(): void"
        ]),
        ("DocumentVerification", 70, 10, 26, 36, [
            "+ id: UUID",
            "+ provider_id: UUID (FK)",
            "+ document_type: DocType",
            "+ file_url: String",
            "+ ocr_extracted_text: Text",
            "+ confidence_score: Float",
            "+ status: VerificationStatus"
        ], [
            "+ process_dual_ocr(): dict",
            "+ calculate_risk_score(): float"
        ]),
    ]

    for name, x, y, w, h, attrs, methods in classes:
        # Box background
        ax.add_patch(patches.FancyBboxPatch((x, y), w, h, boxstyle="square,pad=0", fc=C_CARD_BG, ec=C_PRIMARY, lw=1.5))
        # Header box
        ax.add_patch(patches.Rectangle((x, y + h - 5.5), w, 5.5, fc=C_PRIMARY, ec=C_PRIMARY))
        ax.text(x + w/2, y + h - 2.8, name, ha='center', va='center', fontsize=9.5, fontweight='bold', color=C_LIGHT)
        
        # Attributes
        curr_y = y + h - 8
        for attr in attrs:
            ax.text(x + 1.2, curr_y, attr, fontsize=7.2, color="#334155")
            curr_y -= 2.8
        
        # Divider line
        ax.plot([x, x + w], [curr_y + 1, curr_y + 1], color=C_BORDER, lw=1)
        curr_y -= 1.5

        # Methods
        for method in methods:
            ax.text(x + 1.2, curr_y, method, fontsize=7.2, color="#047857", fontstyle="italic")
            curr_y -= 2.8

    # Relationships Lines & Text
    # User -> Customer (1 to 1)
    ax.annotate('', xy=(18, 46), xytext=(18, 55), arrowprops=dict(arrowstyle="->", color=C_DARK, lw=1.2))
    ax.text(19, 50, "1 : 1", fontsize=7.5, fontweight='bold', color="#475569")

    # User -> Provider (1 to 1)
    ax.annotate('', xy=(37, 72), xytext=(31, 72), arrowprops=dict(arrowstyle="->", color=C_DARK, lw=1.2))
    ax.text(33, 73.5, "1 : 1", fontsize=7.5, fontweight='bold', color="#475569")

    # Customer -> Booking (1 to Many)
    ax.annotate('', xy=(37, 28), xytext=(31, 28), arrowprops=dict(arrowstyle="->", color=C_DARK, lw=1.2))
    ax.text(33, 29.5, "1 : N", fontsize=7.5, fontweight='bold', color="#475569")

    # Provider -> Booking (1 to Many)
    ax.annotate('', xy=(50, 46), xytext=(50, 55), arrowprops=dict(arrowstyle="->", color=C_DARK, lw=1.2))
    ax.text(51, 50, "1 : N", fontsize=7.5, fontweight='bold', color="#475569")

    # Provider -> DocumentVerification (1 to Many)
    ax.annotate('', xy=(70, 28), xytext=(64, 28), arrowprops=dict(arrowstyle="->", color=C_DARK, lw=1.2))
    ax.text(66, 29.5, "1 : N", fontsize=7.5, fontweight='bold', color="#475569")

    # Service -> Booking (1 to Many)
    ax.annotate('', xy=(64, 38), xytext=(70, 58), arrowprops=dict(arrowstyle="->", color=C_DARK, lw=1.2))
    ax.text(67, 49, "1 : N", fontsize=7.5, fontweight='bold', color="#475569")

    plt.tight_layout()
    plt.savefig(os.path.join(ASSETS_DIR, "class_diagram.png"), dpi=300)
    plt.close()
    print("Saved class_diagram.png")

# ----------------------------------------------------------------------
# 3. Swimlane / Sequence Diagram
# ----------------------------------------------------------------------
def generate_sequence_diagram():
    fig, ax = plt.subplots(figsize=(12, 8), facecolor=C_BG)
    ax.set_facecolor(C_BG)
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    ax.text(50, 96, "SmartServe Booking & Verification Swimlane Sequence Diagram", 
            ha='center', va='center', fontsize=14, fontweight='bold', color=C_DARK)

    lanes = [
        ("Customer Portal", 12),
        ("FastAPI Gateway", 37),
        ("PostgreSQL Store", 62),
        ("Service Partner", 87),
    ]

    for name, x in lanes:
        # Lane box
        ax.add_patch(patches.FancyBboxPatch((x - 10, 88), 20, 5.5, boxstyle="round,pad=0.3", fc=C_PRIMARY, ec=C_PRIMARY))
        ax.text(x, 90.75, name, ha='center', va='center', fontsize=9, fontweight='bold', color=C_LIGHT)
        # Lifeline
        ax.plot([x, x], [88, 6], color="#CBD5E1", lw=1.5, linestyle="--")

    steps = [
        (82, 12, 37, "1. POST /auth/login (Customer credentials)", True),
        (76, 37, 62, "2. Query User & Verify password hash", True),
        (70, 62, 37, "3. Return Customer profile & Bearer JWT", False),
        (64, 37, 12, "4. 200 OK: Set session token in LocalStorage", False),
        (58, 12, 37, "5. POST /customer/bookings (service_id, slot)", True),
        (52, 37, 62, "6. Insert Booking (Status: REQUESTED, gen OTP)", True),
        (46, 37, 87, "7. Dispatch notification: New service request", True),
        (40, 87, 37, "8. POST /provider/bookings/{id}/accept", True),
        (34, 37, 62, "9. Update status -> ACCEPTED (atomic lock)", True),
        (28, 87, 37, "10. POST /provider/bookings/{id}/start", True),
        (22, 37, 62, "11. Update status -> STARTED", True),
        (16, 87, 37, "12. POST /provider/bookings/{id}/complete (Verify OTP)", True),
        (10, 37, 62, "13. State -> COMPLETED (Write audit trail)", True),
    ]

    for y, x1, x2, msg, is_fwd in steps:
        color = C_PRIMARY if is_fwd else "#2563EB"
        ax.annotate('', xy=(x2, y), xytext=(x1, y), 
                    arrowprops=dict(arrowstyle="->", color=color, lw=1.4))
        mid_x = (x1 + x2) / 2
        ax.text(mid_x, y + 1.6, msg, ha='center', va='bottom', fontsize=7.2, fontweight='bold', color=C_DARK,
                bbox=dict(boxstyle="round,pad=0.2", fc=C_CARD_BG, ec="none", alpha=0.9))

    plt.tight_layout()
    plt.savefig(os.path.join(ASSETS_DIR, "sequence_swimlane.png"), dpi=300)
    plt.close()
    print("Saved sequence_swimlane.png")

# ----------------------------------------------------------------------
# 4. Booking Finite State Machine Diagram
# ----------------------------------------------------------------------
def generate_fsm_diagram():
    fig, ax = plt.subplots(figsize=(11, 7), facecolor=C_BG)
    ax.set_facecolor(C_BG)
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    ax.text(50, 95, "Booking Lifecycle Finite State Machine (FSM) Transition Model", 
            ha='center', va='center', fontsize=14, fontweight='bold', color=C_DARK)

    # Initial state
    ax.add_patch(patches.Circle((8, 65), 2.2, fc=C_DARK, ec=C_DARK))
    ax.annotate('', xy=(18, 65), xytext=(10.5, 65), arrowprops=dict(arrowstyle="->", color=C_DARK, lw=1.5))
    ax.text(14, 67, "Customer\nCheckout", fontsize=7.5, ha='center', color="#475569")

    # Main States
    states = [
        ("REQUESTED\n(Awaiting Provider)", 18, 59, 18, 12, "#E0F2FE", "#0284C7"),
        ("ACCEPTED\n(Provider Assigned)", 44, 59, 18, 12, "#FEF3C7", "#D97706"),
        ("STARTED\n(Work In-Progress)", 70, 59, 18, 12, "#EDE9FE", "#7C3AED"),
        ("COMPLETED\n(OTP Verified / Closed)", 70, 20, 18, 12, "#DCFCE7", "#16A34A"),
        ("REJECTED\n(Partner Unavailable)", 44, 20, 18, 12, "#FEE2E2", "#DC2626"),
        ("CANCELLED\n(Customer Aborted)", 18, 20, 18, 12, "#F3F4F6", "#4B5563"),
    ]

    for title, x, y, w, h, bg, border in states:
        ax.add_patch(patches.FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.8", fc=bg, ec=border, lw=2))
        ax.text(x + w/2, y + h/2, title, ha='center', va='center', fontsize=8.5, fontweight='bold', color=C_DARK)

    # Main forward transitions
    ax.annotate('', xy=(44, 65), xytext=(36, 65), arrowprops=dict(arrowstyle="->", color=C_PRIMARY, lw=1.8))
    ax.text(40, 67.5, "Provider\nAccepts", ha='center', fontsize=7.2, fontweight='bold', color=C_PRIMARY)

    ax.annotate('', xy=(70, 65), xytext=(62, 65), arrowprops=dict(arrowstyle="->", color=C_PRIMARY, lw=1.8))
    ax.text(66, 67.5, "Partner\nArrives / Starts", ha='center', fontsize=7.2, fontweight='bold', color=C_PRIMARY)

    ax.annotate('', xy=(79, 32), xytext=(79, 59), arrowprops=dict(arrowstyle="->", color="#16A34A", lw=2))
    ax.text(85, 45.5, "Valid 4-Digit\nCustomer OTP", ha='center', fontsize=7.2, fontweight='bold', color="#16A34A")

    # Terminal state double border on COMPLETED
    ax.add_patch(patches.FancyBboxPatch((69, 19), 20, 14, boxstyle="round,pad=0.8", fc="none", ec="#16A34A", lw=1.2, linestyle="--"))

    # Cancellation / Rejection branches
    # Requested -> Cancelled
    ax.annotate('', xy=(27, 32), xytext=(27, 59), arrowprops=dict(arrowstyle="->", color="#DC2626", lw=1.5))
    ax.text(23, 45.5, "Customer\nCancels", ha='center', fontsize=7.2, color="#DC2626")

    # Accepted -> Cancelled
    ax.annotate('', xy=(34, 30), xytext=(46, 59), arrowprops=dict(arrowstyle="->", color="#DC2626", lw=1.2, linestyle="dotted"))
    ax.text(38, 44, "Penalty\nCancel", ha='center', fontsize=6.8, color="#DC2626")

    # Requested -> Rejected
    ax.annotate('', xy=(48, 32), xytext=(33, 59), arrowprops=dict(arrowstyle="->", color="#D97706", lw=1.2))
    ax.text(42, 49, "Timeout /\nDecline", ha='center', fontsize=7, color="#D97706")

    plt.tight_layout()
    plt.savefig(os.path.join(ASSETS_DIR, "fsm_state_diagram.png"), dpi=300)
    plt.close()
    print("Saved fsm_state_diagram.png")

# ----------------------------------------------------------------------
# 5. Data Flow Diagram (DFD Level 0 - Context Diagram)
# ----------------------------------------------------------------------
def generate_dfd_level_0():
    fig, ax = plt.subplots(figsize=(11, 7), facecolor=C_BG)
    ax.set_facecolor(C_BG)
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    ax.text(50, 95, "Data Flow Diagram — Level 0 (Context Diagram)", 
            ha='center', va='center', fontsize=15, fontweight='bold', color=C_DARK)
    ax.text(50, 91, "High-Level Boundary & External Entity Interactions", 
            ha='center', va='center', fontsize=10, color="#64748B")

    # Central System Process
    ax.add_patch(patches.Circle((50, 50), 16, fc="#EFF6FF", ec=C_PRIMARY, lw=2.5))
    ax.text(50, 52, "0.0\nSmartServe\nCore System", ha='center', va='center', fontsize=12, fontweight='bold', color=C_PRIMARY)
    ax.text(50, 42, "[FastAPI / PostgreSQL Engine]", ha='center', va='center', fontsize=7.5, color="#475569")

    # External Entity 1: Customer
    ax.add_patch(patches.Rectangle((4, 60), 22, 14, fc=C_CARD_BG, ec=C_DARK, lw=2))
    ax.text(15, 67, "Customer\n(Consumer)", ha='center', va='center', fontsize=10, fontweight='bold', color=C_DARK)

    # External Entity 2: Provider
    ax.add_patch(patches.Rectangle((74, 60), 22, 14, fc=C_CARD_BG, ec=C_DARK, lw=2))
    ax.text(85, 67, "Service Partner\n(Provider)", ha='center', va='center', fontsize=10, fontweight='bold', color=C_DARK)

    # External Entity 3: Administrator
    ax.add_patch(patches.Rectangle((39, 6), 22, 14, fc=C_CARD_BG, ec=C_DARK, lw=2))
    ax.text(50, 13, "Platform Admin\n(Dispatcher / Ops)", ha='center', va='center', fontsize=10, fontweight='bold', color=C_DARK)

    # Customer Flows
    ax.annotate('', xy=(38, 57), xytext=(26, 68), arrowprops=dict(arrowstyle="->", color=C_PRIMARY, lw=1.5))
    ax.text(28, 64, "Service Booking, OTP,\nRatings & Reviews", fontsize=7.2, color=C_DARK)

    ax.annotate('', xy=(26, 63), xytext=(36, 52), arrowprops=dict(arrowstyle="->", color="#2563EB", lw=1.5))
    ax.text(26, 54, "Catalog, Inclusions,\nOrder Status", fontsize=7.2, color="#2563EB")

    # Provider Flows
    ax.annotate('', xy=(62, 57), xytext=(74, 68), arrowprops=dict(arrowstyle="->", color=C_PRIMARY, lw=1.5))
    ax.text(62, 65, "KYC Docs, Availability,\nJob Acceptance, OTP", fontsize=7.2, color=C_DARK)

    ax.annotate('', xy=(74, 63), xytext=(64, 52), arrowprops=dict(arrowstyle="->", color="#2563EB", lw=1.5))
    ax.text(65, 54, "Assigned Bookings,\nOCR Status, Earnings", fontsize=7.2, color="#2563EB")

    # Admin Flows
    ax.annotate('', xy=(46, 34), xytext=(46, 20), arrowprops=dict(arrowstyle="->", color=C_PRIMARY, lw=1.5))
    ax.text(37, 26, "KYC Approval,\nCatalog Edit", fontsize=7.2, ha='right', color=C_DARK)

    ax.annotate('', xy=(54, 20), xytext=(54, 34), arrowprops=dict(arrowstyle="->", color="#2563EB", lw=1.5))
    ax.text(55, 26, "Operational Metrics,\nAudit Logs", fontsize=7.2, ha='left', color="#2563EB")

    plt.tight_layout()
    plt.savefig(os.path.join(ASSETS_DIR, "dfd_level_0.png"), dpi=300)
    plt.close()
    print("Saved dfd_level_0.png")

# ----------------------------------------------------------------------
# 6. Data Flow Diagram (DFD Level 1 - Decomposition)
# ----------------------------------------------------------------------
def generate_dfd_level_1():
    fig, ax = plt.subplots(figsize=(12, 8), facecolor=C_BG)
    ax.set_facecolor(C_BG)
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    ax.text(50, 96, "Data Flow Diagram — Level 1 (Functional Decomposition)", 
            ha='center', va='center', fontsize=14, fontweight='bold', color=C_DARK)

    # 4 Core Processes
    procs = [
        ("1.0\nUser Auth & Identity\n(JWT & RBAC)", 15, 65),
        ("2.0\nMaster Catalog &\nPricing Engine", 50, 65),
        ("3.0\nBooking FSM &\nDispatch Pipeline", 85, 65),
        ("4.0\nDual-Engine IDP &\nDocument KYC", 50, 22),
    ]

    for title, x, y in procs:
        ax.add_patch(patches.Circle((x, y), 10, fc="#F0FDF4", ec=C_PRIMARY, lw=1.8))
        ax.text(x, y, title, ha='center', va='center', fontsize=8, fontweight='bold', color=C_DARK)

    # Data Stores
    stores = [
        ("D1: Users & Credentials", 15, 42),
        ("D2: Service Catalog (457 Items)", 50, 44),
        ("D3: Bookings & FSM History", 85, 42),
        ("D4: Provider KYC Artifacts", 15, 22),
    ]

    for title, x, y in stores:
        ax.plot([x - 11, x + 11], [y + 3, y + 3], color=C_SECONDARY, lw=2)
        ax.plot([x - 11, x + 11], [y - 3, y - 3], color=C_SECONDARY, lw=2)
        ax.text(x, y, title, ha='center', va='center', fontsize=8, fontweight='bold', color=C_DARK)

    # Connecting data lines
    # 1.0 <-> D1
    ax.annotate('', xy=(15, 46), xytext=(15, 55), arrowprops=dict(arrowstyle="<->", color=C_PRIMARY, lw=1.4))
    # 2.0 <-> D2
    ax.annotate('', xy=(50, 48), xytext=(50, 55), arrowprops=dict(arrowstyle="<->", color=C_PRIMARY, lw=1.4))
    # 3.0 <-> D3
    ax.annotate('', xy=(85, 46), xytext=(85, 55), arrowprops=dict(arrowstyle="<->", color=C_PRIMARY, lw=1.4))
    # 4.0 <-> D4
    ax.annotate('', xy=(27, 22), xytext=(40, 22), arrowprops=dict(arrowstyle="<->", color=C_PRIMARY, lw=1.4))

    # Cross connections
    ax.annotate('', xy=(39, 65), xytext=(26, 65), arrowprops=dict(arrowstyle="->", color="#64748B", lw=1.2))
    ax.text(32.5, 68, "Auth Token", fontsize=7, ha='center')

    ax.annotate('', xy=(74, 65), xytext=(61, 65), arrowprops=dict(arrowstyle="->", color="#64748B", lw=1.2))
    ax.text(67.5, 68, "Validated Svc", fontsize=7, ha='center')

    ax.annotate('', xy=(44, 28), xytext=(22, 60), arrowprops=dict(arrowstyle="->", color="#64748B", lw=1.2))
    ax.text(30, 40, "Provider KYC Files", fontsize=7, rotation=-45)

    plt.tight_layout()
    plt.savefig(os.path.join(ASSETS_DIR, "dfd_level_1.png"), dpi=300)
    plt.close()
    print("Saved dfd_level_1.png")

# ----------------------------------------------------------------------
# 7. System End-to-End Workflow Flowchart
# ----------------------------------------------------------------------
def generate_flowchart():
    fig, ax = plt.subplots(figsize=(11, 8.5), facecolor=C_BG)
    ax.set_facecolor(C_BG)
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    ax.text(50, 97, "SmartServe End-to-End Operational Workflow Flowchart", 
            ha='center', va='center', fontsize=14, fontweight='bold', color=C_DARK)

    boxes = [
        ("Start: Customer Opens Portal", 50, 90, "round"),
        ("Select Category & Browse Validated Services", 50, 80, "rect"),
        ("Choose Time Slot & Enter Location", 50, 70, "rect"),
        ("Authenticate Session (JWT Verified?)", 50, 59, "diamond"),
        ("Redirect to Login / Signup", 82, 59, "rect"),
        ("Create Booking in Database (Status: REQUESTED)", 50, 47, "rect"),
        ("Dispatch Notification to Available Verified Partner", 50, 37, "rect"),
        ("Partner Accepts Booking within Timeout?", 50, 26, "diamond"),
        ("Auto-Reassign to Next Available Partner", 82, 26, "rect"),
        ("Service Execution with Customer OTP Verification", 50, 14, "rect"),
        ("Job Completed & Customer Review Recorded", 50, 4, "round"),
    ]

    for text, x, y, btype in boxes:
        if btype == "round":
            ax.add_patch(patches.FancyBboxPatch((x - 18, y - 2.5), 36, 5.5, boxstyle="round,pad=0.5", fc=C_PRIMARY, ec=C_PRIMARY))
            ax.text(x, y, text, ha='center', va='center', fontsize=8.5, fontweight='bold', color=C_LIGHT)
        elif btype == "rect":
            ax.add_patch(patches.FancyBboxPatch((x - 17, y - 2.5), 34, 5.2, boxstyle="square,pad=0.4", fc=C_CARD_BG, ec=C_PRIMARY, lw=1.2))
            ax.text(x, y, text, ha='center', va='center', fontsize=8, color=C_DARK)
        elif btype == "diamond":
            diamond = patches.Polygon([[x, y + 4.2], [x + 19, y], [x, y - 4.2], [x - 19, y]], 
                                      closed=True, fc="#FEF3C7", ec=C_WARN, lw=1.5)
            ax.add_patch(diamond)
            ax.text(x, y, text, ha='center', va='center', fontsize=7.8, fontweight='bold', color=C_DARK)

    # Connectors
    arrows = [
        (50, 87.5, 50, 82.5, ""),
        (50, 77.5, 50, 72.5, ""),
        (50, 67.5, 50, 63.2, ""),
        (50, 54.8, 50, 49.5, "Yes"),
        (69, 59, 74, 59, "No"),
        (82, 61.5, 82, 80, ""),  # loop back from login to browse
        (50, 44.5, 50, 39.5, ""),
        (50, 34.5, 50, 30.2, ""),
        (50, 21.8, 50, 16.5, "Yes"),
        (69, 26, 74, 26, "No"),
        (82, 28.5, 82, 37, ""),  # loop back to dispatch
        (50, 11.5, 50, 6.8, ""),
    ]

    for x1, y1, x2, y2, label in arrows:
        ax.annotate('', xy=(x2, y2), xytext=(x1, y1), arrowprops=dict(arrowstyle="->", color=C_PRIMARY, lw=1.3))
        if label:
            ax.text((x1+x2)/2 + 2, (y1+y2)/2, label, fontsize=7.2, fontweight='bold', color=C_PRIMARY)

    plt.tight_layout()
    plt.savefig(os.path.join(ASSETS_DIR, "system_flowchart.png"), dpi=300)
    plt.close()
    print("Saved system_flowchart.png")

if __name__ == "__main__":
    generate_architecture()
    generate_class_diagram()
    generate_sequence_diagram()
    generate_fsm_diagram()
    generate_dfd_level_0()
    generate_dfd_level_1()
    generate_flowchart()
    print("All 7 diagrams generated successfully!")
