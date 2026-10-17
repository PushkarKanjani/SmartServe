import os
import pptx
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

DOCS_DIR = r"c:\MyDrive\SEM-7\BigData\SmartServe\docs"
ASSETS_DIR = os.path.join(DOCS_DIR, "assets")
OUTPUT_PPTX = os.path.join(DOCS_DIR, "SMARTSERVE_MID_SEM_PRESENTATION.pptx")
PDEU_LOGO_PATH = os.path.join(ASSETS_DIR, "pdeu_logo.png")

# Color Palette Constants
C_PRIMARY = RGBColor(47, 82, 51)      # #2F5233 SmartServe Forest Green
C_SECONDARY = RGBColor(201, 161, 90)  # #C9A15A Accent Gold
C_DARK = RGBColor(31, 42, 30)         # #1F2A1E Dark Charcoal / Slate
C_LIGHT_BG = RGBColor(250, 247, 240)  # #FAF7F0 Warm Ivory
C_CARD_BG = RGBColor(255, 255, 255)   # #FFFFFF Clean White Card
C_BORDER = RGBColor(226, 232, 240)    # #E2E8F0 Subtle Border Gray
C_MUTED = RGBColor(100, 116, 139)     # #64748B Slate Muted Text
C_ACCENT_BLUE = RGBColor(37, 99, 235) # #2563EB Blue
C_WARN_AMBER = RGBColor(217, 119, 6)  # #D97706 Amber
C_GREEN_LIVE = RGBColor(22, 163, 74)  # #16A34A Emerald Green

FONT_HEADING = "Segoe UI"
FONT_BODY = "Segoe UI"

def set_slide_background(slide, color=C_LIGHT_BG):
    background = slide.background
    fill = background.fill
    fill.solid()
    fill.fore_color.rgb = color

def add_header(slide, title_text, category_text, slide_num):
    # Optional small PDEU logo in top right if needed
    if os.path.exists(PDEU_LOGO_PATH):
        try:
            slide.shapes.add_picture(PDEU_LOGO_PATH, Inches(10.6), Inches(0.25), Inches(2.0), Inches(0.54))
        except Exception:
            pass

    header_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.28), Inches(9.6), Inches(1.05))
    tf = header_box.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
    
    # Category tag
    p_cat = tf.paragraphs[0]
    r_cat = p_cat.add_run()
    r_cat.text = f"{category_text.upper()}  |  SLIDE {slide_num} OF 12  •  PDEU ICT"
    r_cat.font.name = FONT_BODY
    r_cat.font.size = Pt(11.5)
    r_cat.font.bold = True
    r_cat.font.color.rgb = C_DARK
    
    # Main title
    p_title = tf.add_paragraph()
    r_title = p_title.add_run()
    r_title.text = title_text
    r_title.font.name = FONT_HEADING
    r_title.font.size = Pt(22)
    r_title.font.bold = True
    r_title.font.color.rgb = C_PRIMARY

def add_card(slide, left, top, width, height, bg_color=C_CARD_BG, border_color=C_BORDER):
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = bg_color
    shape.line.color.rgb = border_color
    shape.line.width = Pt(1.4)
    return shape

def add_notes(slide, notes_text):
    notes_slide = slide.notes_slide
    text_frame = notes_slide.notes_text_frame
    text_frame.text = notes_text

def build_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # ==================================================================
    # SLIDE 1: TITLE SLIDE (WITH PDEU LOGO, MENTOR, & ROLL NUMBERS)
    # ==================================================================
    s1 = prs.slides.add_slide(blank_layout)
    set_slide_background(s1, C_PRIMARY)

    # Hero card in center
    add_card(s1, Inches(0.9), Inches(0.55), Inches(11.533), Inches(6.4), bg_color=C_CARD_BG, border_color=C_SECONDARY)

    # Add PDEU Logo at top center of hero card
    if os.path.exists(PDEU_LOGO_PATH):
        try:
            s1.shapes.add_picture(PDEU_LOGO_PATH, Inches(1.3), Inches(0.75), Inches(3.2), Inches(0.86))
        except Exception:
            pass

    # University header text next to logo
    tb_univ = s1.shapes.add_textbox(Inches(4.7), Inches(0.75), Inches(7.3), Inches(0.86))
    tf_u = tb_univ.text_frame
    tf_u.word_wrap = True
    p_u1 = tf_u.paragraphs[0]
    r_u1 = p_u1.add_run()
    r_u1.text = "PANDIT DEENDAYAL ENERGY UNIVERSITY (PDEU)"
    r_u1.font.bold = True
    r_u1.font.size = Pt(16)
    r_u1.font.color.rgb = C_DARK
    
    p_u2 = tf_u.add_paragraph()
    p_u2.space_before = Pt(2)
    r_u2 = p_u2.add_run()
    r_u2.text = "DEPARTMENT OF INFORMATION AND COMMUNICATION TECHNOLOGY (ICT)\nMINOR PROJECT MID-SEMESTER EVALUATION  •  SEMESTER 7 (2026-2027)"
    r_u2.font.bold = True
    r_u2.font.size = Pt(11.5)
    r_u2.font.color.rgb = C_DARK

    # Title & Subtitle box
    t_box = s1.shapes.add_textbox(Inches(1.3), Inches(1.75), Inches(10.733), Inches(1.7))
    tf1 = t_box.text_frame
    tf1.word_wrap = True
    
    p1 = tf1.paragraphs[0]
    r1 = p1.add_run()
    r1.text = "SMARTSERVE: Intelligent Multi-Service\nOn-Demand Marketplace & Operations Platform"
    r1.font.name = FONT_HEADING
    r1.font.size = Pt(27)
    r1.font.bold = True
    r1.font.color.rgb = C_PRIMARY
    
    p2 = tf1.add_paragraph()
    p2.space_before = Pt(6)
    r2 = p2.add_run()
    r2.text = "A Multi-Tenant Cloud Architecture with Dual-Engine OCR KYC, 457-Service Master Catalog, and Atomic Booking FSM"
    r2.font.name = FONT_BODY
    r2.font.size = Pt(13)
    r2.font.color.rgb = C_MUTED

    # Two Student Profile Cards (Side-by-Side with 14 pt Roll Numbers)
    # Pushkar Card
    add_card(s1, Inches(1.3), Inches(3.6), Inches(3.6), Inches(1.7), bg_color=RGBColor(248, 250, 252), border_color=C_PRIMARY)
    tb_p = s1.shapes.add_textbox(Inches(1.42), Inches(3.7), Inches(3.36), Inches(1.5))
    tf_p = tb_p.text_frame
    tf_p.word_wrap = True
    p_p1 = tf_p.paragraphs[0]
    r_p1 = p_p1.add_run()
    r_p1.text = "PUSHKAR KANJANI"
    r_p1.font.bold = True
    r_p1.font.size = Pt(14)
    r_p1.font.color.rgb = C_PRIMARY
    
    p_p2 = tf_p.add_paragraph()
    p_p2.space_before = Pt(3)
    r_p2 = p_p2.add_run()
    r_p2.text = "Roll Number: "
    r_p2.font.bold = True
    r_p2.font.size = Pt(13)
    r_p2.font.color.rgb = C_DARK
    r_p2_val = p_p2.add_run()
    r_p2_val.text = "23BIT153"
    r_p2_val.font.bold = True
    r_p2_val.font.size = Pt(13.5)
    r_p2_val.font.color.rgb = C_WARN_AMBER
    
    p_p3 = tf_p.add_paragraph()
    p_p3.space_before = Pt(2)
    p_p3.add_run().text = "B.Tech in ICT, PDEU (7th Sem)"
    p_p3.runs[0].font.size = Pt(11.5)
    p_p3.runs[0].font.color.rgb = C_MUTED

    # Aastha Card
    add_card(s1, Inches(5.1), Inches(3.6), Inches(3.6), Inches(1.7), bg_color=RGBColor(248, 250, 252), border_color=C_PRIMARY)
    tb_a = s1.shapes.add_textbox(Inches(5.22), Inches(3.7), Inches(3.36), Inches(1.5))
    tf_a = tb_a.text_frame
    tf_a.word_wrap = True
    p_a1 = tf_a.paragraphs[0]
    r_a1 = p_a1.add_run()
    r_a1.text = "AASTHA"
    r_a1.font.bold = True
    r_a1.font.size = Pt(14)
    r_a1.font.color.rgb = C_PRIMARY
    
    p_a2 = tf_a.add_paragraph()
    p_a2.space_before = Pt(3)
    r_a2 = p_a2.add_run()
    r_a2.text = "Roll Number: "
    r_a2.font.bold = True
    r_a2.font.size = Pt(13)
    r_a2.font.color.rgb = C_DARK
    r_a2_val = p_a2.add_run()
    r_a2_val.text = "23BIT095"
    r_a2_val.font.bold = True
    r_a2_val.font.size = Pt(13.5)
    r_a2_val.font.color.rgb = C_WARN_AMBER
    
    p_a3 = tf_a.add_paragraph()
    p_a3.space_before = Pt(2)
    p_a3.add_run().text = "B.Tech in ICT, PDEU (7th Sem)"
    p_a3.runs[0].font.size = Pt(11.5)
    p_a3.runs[0].font.color.rgb = C_MUTED

    # Mentor Card (Right side)
    add_card(s1, Inches(8.9), Inches(3.6), Inches(3.3), Inches(1.7), bg_color=RGBColor(254, 252, 232), border_color=C_SECONDARY)
    tb_men = s1.shapes.add_textbox(Inches(9.02), Inches(3.7), Inches(3.06), Inches(1.5))
    tf_men = tb_men.text_frame
    tf_men.word_wrap = True
    p_mh = tf_men.paragraphs[0]
    r_mh = p_mh.add_run()
    r_mh.text = "PROJECT MENTOR:"
    r_mh.font.bold = True
    r_mh.font.size = Pt(11)
    r_mh.font.color.rgb = C_SECONDARY
    
    p_mn = tf_men.add_paragraph()
    p_mn.space_before = Pt(3)
    r_mn = p_mn.add_run()
    r_mn.text = "Dr. Deepak Kumar Sharma"
    r_mn.font.bold = True
    r_mn.font.size = Pt(13.5)
    r_mn.font.color.rgb = C_PRIMARY
    
    p_md = tf_men.add_paragraph()
    p_md.space_before = Pt(2)
    p_md.add_run().text = "Asst. Professor\nDepartment of ICT, SoT, PDEU"
    p_md.runs[0].font.size = Pt(11.5)
    p_md.runs[0].font.color.rgb = C_DARK

    # Milestone Banner at Bottom
    add_card(s1, Inches(1.3), Inches(5.45), Inches(10.9), Inches(1.15), bg_color=RGBColor(240, 253, 244), border_color=C_GREEN_LIVE)
    tb_m = s1.shapes.add_textbox(Inches(1.5), Inches(5.5), Inches(10.5), Inches(1.05))
    tf_m = tb_m.text_frame
    tf_m.word_wrap = True
    p_m = tf_m.paragraphs[0]
    r_mt = p_m.add_run()
    r_mt.text = "MID-SEMESTER MILESTONE STATUS: "
    r_mt.font.bold = True
    r_mt.font.size = Pt(13)
    r_mt.font.color.rgb = C_GREEN_LIVE
    r_mb = p_m.add_run()
    r_mb.text = "Phase 1 Complete (~55% Progress)  •  Core Backend API, Supabase Cloud DB, Multi-Portal SPAs & Dual OCR Live  •  Apache Kafka Event Streaming & Live GPS Telemetry in active Phase 2 development."
    r_mb.font.size = Pt(12)
    r_mb.font.color.rgb = C_DARK

    add_notes(s1, 
        "Presenter Cue: Greet the respected evaluation committee and our project mentor Deepak Sharma Sir. "
        "Introduce yourself: Pushkar Kanjani (23BIT153) and Aastha (23BIT095), B.Tech in ICT, Pandit Deendayal Energy University (PDEU). "
        "State clearly that this presentation represents the Mid-Semester Evaluation of SmartServe, covering ~55% of the overall scope. "
        "Highlight that all foundational modules—FastAPI backend on Render, PostgreSQL on Supabase, Dual OCR, and 4 Vercel SPAs—are fully functional and live.")

    # ==================================================================
    # SLIDE 2: INTRODUCTION & PROBLEM MOTIVATION
    # ==================================================================
    s2 = prs.slides.add_slide(blank_layout)
    set_slide_background(s2)
    add_header(s2, "Introduction & Real-World Problem Motivation", "Context & Market Challenges", 2)

    problems = [
        ("Slow & Fraudulent KYC Onboarding",
         "• Manual paper review takes 3 to 7 days, delaying provider onboarding.\n"
         "• Forged trade licenses and fake identity cards slip through undetected, threatening customer safety.\n"
         "• Zero automated cross-verification of Aadhaar, PAN, and credentials."),
        ("Catalog Contamination & Price Gouging",
         "• Existing platforms suffer from dirty catalog data with nonsensical inclusions.\n"
         "• Real Example: Automotive repair tools listed inside salon facials.\n"
         "• Arbitrary surge pricing without transparent rate cards causes customer churn."),
        ("Double-Bookings & Lost Status",
         "• Concurrency race conditions cause two providers to get the same booking.\n"
         "• Lack of atomic state machines leads to orphaned requested states and lost fees.\n"
         "• Customers and providers lack unified real-time operational transparency.")
    ]

    for idx, (title, body) in enumerate(problems):
        x = Inches(0.8 + idx * 3.97)
        add_card(s2, x, Inches(1.45), Inches(3.8), Inches(4.35))
        
        card_h = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(1.45), Inches(3.8), Inches(0.85))
        card_h.fill.solid()
        card_h.fill.fore_color.rgb = C_PRIMARY if idx == 0 else (C_WARN_AMBER if idx == 1 else C_ACCENT_BLUE)
        card_h.line.fill.background()
        p = card_h.text_frame.paragraphs[0]
        p.alignment = PP_ALIGN.CENTER
        r = p.add_run()
        r.text = f"PROBLEM {idx+1}"
        r.font.bold = True
        r.font.size = Pt(14)
        r.font.color.rgb = RGBColor(255, 255, 255)

        tb = s2.shapes.add_textbox(x + Inches(0.18), Inches(2.4), Inches(3.44), Inches(3.2))
        tf = tb.text_frame
        tf.word_wrap = True
        p_t = tf.paragraphs[0]
        p_t.add_run().text = title
        p_t.runs[0].font.bold = True
        p_t.runs[0].font.size = Pt(13.5)
        p_t.runs[0].font.color.rgb = C_DARK
        
        p_b = tf.add_paragraph()
        p_b.space_before = Pt(8)
        p_b.add_run().text = body
        p_b.runs[0].font.size = Pt(12)
        p_b.runs[0].font.color.rgb = C_DARK

    add_card(s2, Inches(0.8), Inches(5.95), Inches(11.733), Inches(1.15), bg_color=C_CARD_BG, border_color=C_PRIMARY)
    tb_bot = s2.shapes.add_textbox(Inches(1.0), Inches(6.0), Inches(11.3), Inches(1.05))
    tf_bot = tb_bot.text_frame
    tf_bot.word_wrap = True
    p_bot = tf_bot.paragraphs[0]
    p_bot.add_run().text = "SMARTSERVE CORE VALUE PROPOSITION: "
    p_bot.runs[0].font.bold = True
    p_bot.runs[0].font.size = Pt(13)
    p_bot.runs[0].font.color.rgb = C_PRIMARY
    p_bot.add_run().text = "Replaces manual bottlenecks with an automated Dual-Engine OCR KYC pipeline (<2.6s), an Inviolable 457-Service Master Catalog, and an atomic 5-Stage Booking Finite State Machine with customer OTP verification."
    p_bot.runs[1].font.size = Pt(12)
    p_bot.runs[1].font.color.rgb = C_DARK

    add_notes(s2, 
        "Presenter Cue: Explain the $20B on-demand home service market problem in India. "
        "Point out that dominant platforms like Urban Company rely on manual document verification taking 3-7 days. "
        "Highlight catalog contamination where random items get mixed in service steps, and lack of mathematical state machines leading to booking disputes.")

    # ==================================================================
    # SLIDE 3: OBJECTIVES (MID-SEM ACHIEVED VS END-SEM SCOPE)
    # ==================================================================
    s3 = prs.slides.add_slide(blank_layout)
    set_slide_background(s3)
    add_header(s3, "Project Objectives: Mid-Sem vs. End-Sem Roadmap", "Scope & Deliverables", 3)

    # Left: Completed Mid-Sem Scope (~55%)
    add_card(s3, Inches(0.8), Inches(1.45), Inches(5.7), Inches(5.65), bg_color=C_CARD_BG, border_color=C_GREEN_LIVE)
    
    lb = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.45), Inches(5.7), Inches(0.8))
    lb.fill.solid()
    lb.fill.fore_color.rgb = C_PRIMARY
    lb.line.fill.background()
    p = lb.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "PHASE 1: MID-SEM DELIVERABLES (COMPLETED ~55%)"
    r.font.bold = True
    r.font.size = Pt(13)
    r.font.color.rgb = RGBColor(255, 255, 255)

    tb_left = s3.shapes.add_textbox(Inches(0.95), Inches(2.35), Inches(5.4), Inches(4.6))
    tf_l = tb_left.text_frame
    tf_l.word_wrap = True
    
    completed_pts = [
        ("Master Service Catalog: ", "14 Categories, 78 Subcategories, 457 Services with fixed inclusions, pricing, and duration SLAs."),
        ("Modular FastAPI Backend: ", "RESTful core with Pydantic V2 schemas, async pooling, and Docker deployment on Render Cloud."),
        ("Relational Cloud Store: ", "15+ Normalized PostgreSQL tables on Supabase with strict constraints and foreign keys."),
        ("Dual-Engine OCR Verification: ", "PaddleOCR + EasyOCR pipeline with regex heuristic risk parser for Aadhaar/PAN (<2.6s latency)."),
        ("Booking State Machine: ", "Atomic 5-stage FSM (Requested -> Accepted -> Started -> Completed via Customer OTP)."),
        ("Multi-Portal Frontends: ", "Customer, Partner, Admin, and Landing SPAs deployed on Vercel with active client routing.")
    ]
    for idx, (b_title, b_desc) in enumerate(completed_pts):
        p_pt = tf_l.paragraphs[0] if idx == 0 else tf_l.add_paragraph()
        p_pt.space_before = Pt(5) if idx > 0 else Pt(0)
        p_pt.add_run().text = f"✔ {b_title}"
        p_pt.runs[0].font.bold = True
        p_pt.runs[0].font.size = Pt(12)
        p_pt.runs[0].font.color.rgb = C_PRIMARY
        p_pt.add_run().text = b_desc
        p_pt.runs[1].font.size = Pt(11.5)
        p_pt.runs[1].font.color.rgb = C_DARK

    # Right: In-Progress / End-Sem Scope
    add_card(s3, Inches(6.8), Inches(1.45), Inches(5.7), Inches(5.65), bg_color=C_CARD_BG, border_color=C_WARN_AMBER)
    
    rb = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.45), Inches(5.7), Inches(0.8))
    rb.fill.solid()
    rb.fill.fore_color.rgb = C_WARN_AMBER
    rb.line.fill.background()
    p = rb.text_frame.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "PHASE 2: END-SEM ROADMAP (IN PROGRESS ~45%)"
    r.font.bold = True
    r.font.size = Pt(13)
    r.font.color.rgb = RGBColor(255, 255, 255)

    tb_right = s3.shapes.add_textbox(Inches(6.95), Inches(2.35), Inches(5.4), Inches(4.6))
    tf_r = tb_right.text_frame
    tf_r.word_wrap = True
    
    planned_pts = [
        ("Distributed Kafka Event Bus: ", "Deploy Redpanda/Kafka broker orchestration across 7 canonical event topics to decouple peak order dispatch."),
        ("Live GPS Driver Telemetry: ", "Integrate real-time WebSocket coordinate streaming, dynamic Leaflet route geometries, and live driver ETA updates."),
        ("Payment Gateway & Escrow: ", "Integrate Razorpay / Stripe webhooks with automated escrow holds and instant payout upon verified customer OTP closure."),
        ("AI Support & Anomaly Engine: ", "Deploy conversational RAG support agent with anomaly flagging for fraudulent dispute resolution."),
        ("Production Load Testing: ", "Simulate 1,000+ concurrent user booking requests with Locust to measure broker throughput and database lock latency.")
    ]
    for idx, (b_title, b_desc) in enumerate(planned_pts):
        p_pt = tf_r.paragraphs[0] if idx == 0 else tf_r.add_paragraph()
        p_pt.space_before = Pt(7) if idx > 0 else Pt(0)
        p_pt.add_run().text = f"⏳ {b_title}"
        p_pt.runs[0].font.bold = True
        p_pt.runs[0].font.size = Pt(12)
        p_pt.runs[0].font.color.rgb = C_WARN_AMBER
        p_pt.add_run().text = b_desc
        p_pt.runs[1].font.size = Pt(11.5)
        p_pt.runs[1].font.color.rgb = C_DARK

    add_notes(s3, 
        "Presenter Cue: Emphasize the halfway boundary. State clearly to Deepak Sharma Sir and the panel: 'We are presenting a solid ~55% milestone today. "
        "Our foundational architecture, cloud database, dual OCR, and multi-portal SPAs are functional and live on Vercel and Render. "
        "Distributed Kafka streaming, live GPS map telemetry, and escrow payments form the planned deliverables for our final semester evaluation.'")

    # ==================================================================
    # SLIDE 4: LITERATURE SURVEY & COMPARATIVE ANALYSIS
    # ==================================================================
    s4 = prs.slides.add_slide(blank_layout)
    set_slide_background(s4)
    add_header(s4, "Literature Survey & Industry Benchmark Matrix", "State of the Art Comparison", 4)

    rows = 6
    cols = 5
    table_shape = s4.shapes.add_table(rows, cols, Inches(0.8), Inches(1.45), Inches(11.733), Inches(4.5))
    table = table_shape.table

    table.columns[0].width = Inches(2.2)
    table.columns[1].width = Inches(2.3)
    table.columns[2].width = Inches(2.4)
    table.columns[3].width = Inches(2.4)
    table.columns[4].width = Inches(2.433)

    table_data = [
        ["Evaluation Dimension", "Urban Company", "TaskRabbit / Handy", "Uber / Swiggy Logistics", "SmartServe (Proposed)"],
        ["Architecture Pattern", "Centralized Monolith", "Peer-to-Peer Web", "Event-Driven Microservices", "Modular Multi-Portal (FastAPI)"],
        ["KYC Verification", "Manual Review (3-7 days)", "Third-party Check", "Document Upload Only", "Automated Dual OCR (<2.6s)"],
        ["Catalog Integrity", "Curated but Closed", "Unstructured User Posts", "Point-to-Point Transit", "Inviolable 457 Catalog"],
        ["State Transition", "Proprietary Linear", "Loosely Coupled", "Rigid Real-Time Dispatch", "Atomic 5-Stage FSM with OTP"],
        ["Partner Commission", "High (25% – 35%)", "15% – 20% Fee", "20% – 30% Per Ride", "Low Fair Tier (Direct Escrow)"]
    ]

    for r_idx, row_items in enumerate(table_data):
        for c_idx, val in enumerate(row_items):
            cell = table.cell(r_idx, c_idx)
            cell.text = val
            cell.vertical_anchor = MSO_ANCHOR.MIDDLE
            p = cell.text_frame.paragraphs[0]
            p.alignment = PP_ALIGN.CENTER if c_idx > 0 else PP_ALIGN.LEFT
            for r in p.runs:
                r.font.name = FONT_BODY
                if r_idx == 0:
                    r.font.bold = True
                    r.font.size = Pt(12.5)
                    r.font.color.rgb = RGBColor(255, 255, 255)
                    cell.fill.solid()
                    cell.fill.fore_color.rgb = C_PRIMARY
                else:
                    r.font.size = Pt(11.5)
                    if c_idx == 4:
                        r.font.bold = True
                        r.font.color.rgb = C_PRIMARY
                    else:
                        r.font.color.rgb = C_DARK
                    cell.fill.solid()
                    cell.fill.fore_color.rgb = RGBColor(241, 245, 249) if r_idx % 2 == 1 else RGBColor(255, 255, 255)

    add_card(s4, Inches(0.8), Inches(6.1), Inches(11.733), Inches(1.0), bg_color=C_CARD_BG, border_color=C_SECONDARY)
    tb_lit = s4.shapes.add_textbox(Inches(1.0), Inches(6.15), Inches(11.3), Inches(0.9))
    tf_l = tb_lit.text_frame
    tf_l.word_wrap = True
    p_l = tf_l.paragraphs[0]
    p_l.add_run().text = "LITERATURE SURVEY CONCLUSION: "
    p_l.runs[0].font.bold = True
    p_l.runs[0].font.size = Pt(12)
    p_l.runs[0].font.color.rgb = C_SECONDARY
    p_l.add_run().text = "Existing platforms either sacrifice verification speed for manual control (Urban Company) or sacrifice service consistency for open listings (TaskRabbit). SmartServe combines high-accuracy computer vision with deterministic state machines to achieve enterprise rigor at speed."
    p_l.runs[1].font.size = Pt(11.5)
    p_l.runs[1].font.color.rgb = C_DARK

    add_notes(s4, 
        "Presenter Cue: Walk through the comparative table. "
        "Highlight that while Urban Company has a curated catalog, their KYC takes 3 to 7 days of manual paperwork. "
        "TaskRabbit allows random unvetted services. SmartServe uniquely solves both with Automated Dual-Engine OCR and an Inviolable 457 Catalog.")

    # ==================================================================
    # SLIDE 5: RESEARCH GAPS & TECHNICAL REMEDIATION
    # ==================================================================
    s5 = prs.slides.add_slide(blank_layout)
    set_slide_background(s5)
    add_header(s5, "Research Gaps Identified & Technical Remediation", "Engineering Innovation", 5)

    gaps = [
        ("GAP 1: Manual KYC Delays (72-120 Hours)", 
         "Current Issue: Providers wait 3–5 days for human verification; fraudulent trade licenses slip past unnoticed.\n"
         "SmartServe Solution: Automated Dual-Engine OCR (PaddleOCR + EasyOCR) extracting identity data and validating trade authenticity in <2.6s."),
        ("GAP 2: Catalog Data Contamination", 
         "Current Issue: Listings contain nonsensical steps, missing tools, and misleading inclusions (e.g., auto tools in salon).\n"
         "SmartServe Solution: 11 Inviolable Master Catalog Protection Rules with 457 curated services, fixed durations, and standardized tools."),
        ("GAP 3: Concurrent Double-Bookings", 
         "Current Issue: Concurrency race conditions cause two providers to get the same booking or orphaned status.\n"
         "SmartServe Solution: Deterministic 5-stage Finite State Machine with atomic locks and mandatory 4-digit customer OTP closure."),
        ("GAP 4: Broken Access Controls & IDOR Flaws", 
         "Current Issue: Insecure object references expose private customer addresses and provider bank accounts.\n"
         "SmartServe Solution: Zero-Trust RBAC with customer/provider token isolation and database-level data minimization filtering.")
    ]

    for idx, (title, desc) in enumerate(gaps):
        col = idx % 2
        row = idx // 2
        x = Inches(0.8 + col * 5.97)
        y = Inches(1.45 + row * 2.8)
        
        add_card(s5, x, y, Inches(5.7), Inches(2.65))
        
        tb = s5.shapes.add_textbox(x + Inches(0.2), y + Inches(0.15), Inches(5.3), Inches(2.35))
        tf = tb.text_frame
        tf.word_wrap = True
        
        p = tf.paragraphs[0]
        p.add_run().text = title
        p.runs[0].font.bold = True
        p.runs[0].font.size = Pt(13)
        p.runs[0].font.color.rgb = C_PRIMARY
        
        parts = desc.split("SmartServe Solution: ")
        p_iss = tf.add_paragraph()
        p_iss.space_before = Pt(4)
        p_iss.add_run().text = parts[0]
        p_iss.runs[0].font.size = Pt(11.5)
        p_iss.runs[0].font.color.rgb = C_DARK
        
        p_rem = tf.add_paragraph()
        p_rem.space_before = Pt(4)
        p_rem.add_run().text = "SmartServe Solution: "
        p_rem.runs[0].font.bold = True
        p_rem.runs[0].font.size = Pt(12)
        p_rem.runs[0].font.color.rgb = C_GREEN_LIVE
        p_rem.add_run().text = parts[1]
        p_rem.runs[1].font.size = Pt(11.5)
        p_rem.runs[1].font.color.rgb = C_DARK

    add_notes(s5, 
        "Presenter Cue: Explain the 4 specific research gaps. "
        "Show how each gap is not just an abstract idea, but directly solved by our code: "
        "PaddleOCR for Gap 1, Catalog Engine for Gap 2, FSM for Gap 3, and Zero-Trust RBAC for Gap 4.")

    # ==================================================================
    # SLIDE 6: PROPOSED METHODOLOGY & SYSTEM ARCHITECTURE (WITH CLEAR TECH STACK)
    # ==================================================================
    s6 = prs.slides.add_slide(blank_layout)
    set_slide_background(s6)
    add_header(s6, "Proposed Methodology & System Architecture", "System Design & Tech Stack", 6)

    # Left: High-res Diagram
    arch_img = os.path.join(ASSETS_DIR, "architecture_diagram.png")
    if os.path.exists(arch_img):
        s6.shapes.add_picture(arch_img, Inches(0.8), Inches(1.45), Inches(7.3), Inches(5.6))

    # Right: Explicit Tech Stack & Plain Meaning Viva Box
    add_card(s6, Inches(8.3), Inches(1.45), Inches(4.233), Inches(5.6))
    tb_arch = s6.shapes.add_textbox(Inches(8.45), Inches(1.55), Inches(3.933), Inches(5.4))
    tf_a = tb_arch.text_frame
    tf_a.word_wrap = True

    p_a0 = tf_a.paragraphs[0]
    p_a0.add_run().text = "CORE TECH STACK & WHY WE CHOSE IT"
    p_a0.runs[0].font.bold = True
    p_a0.runs[0].font.size = Pt(13)
    p_a0.runs[0].font.color.rgb = C_PRIMARY

    tech_stack = [
        ("Frontend (Vercel)", "React 19 + TypeScript + Vite",
         "Fast load times (<1s); component-based modular portals for Customer, Partner, and Admin."),
        ("Backend API (Render Cloud)", "Python 3.11 + FastAPI",
         "Asynchronous high throughput; auto-generates live Swagger docs (/docs); Pydantic data validation."),
        ("Database (Supabase Cloud)", "PostgreSQL 16 (Relational)",
         "ACID transactions with foreign keys prevent double-bookings and corrupted records."),
        ("KYC AI Engine (Python)", "PaddleOCR + EasyOCR",
         "Dual-engine reads noisy Indian IDs (Aadhaar & PAN) in 2.6s; automatic fallback if one fails."),
        ("Event Bus (Phase 2)", "Apache Kafka / Redpanda Cloud",
         "Decouples driver GPS telemetry and peak order spikes so database never locks up.")
    ]

    for layer, tech, why in tech_stack:
        p_t = tf_a.add_paragraph()
        p_t.space_before = Pt(5)
        r_l = p_t.add_run()
        r_l.text = f"• {layer}: "
        r_l.font.bold = True
        r_l.font.size = Pt(12)
        r_l.font.color.rgb = C_DARK
        
        r_tc = p_t.add_run()
        r_tc.text = f"{tech}\n"
        r_tc.font.bold = True
        r_tc.font.size = Pt(11.5)
        r_tc.font.color.rgb = C_PRIMARY
        
        r_w = p_t.add_run()
        r_w.text = f"   Why: {why}"
        r_w.font.size = Pt(11)
        r_w.font.color.rgb = C_MUTED

    add_notes(s6, 
        "Presenter Cue: Refer to the architecture diagram on the slide. "
        "Point to the right-hand card for the Tech Stack: React 19 on Vercel, FastAPI on Render, Supabase PostgreSQL, and PaddleOCR. "
        "Explain to the panel why each technology was selected over alternatives in simple terms: FastAPI for async speed and Swagger docs, PostgreSQL for ACID double-booking prevention.")

    # ==================================================================
    # SLIDE 7: SYSTEM MODELING (DFD LEVEL 0 & UML ENTITY CLASS DIAGRAM)
    # ==================================================================
    s7 = prs.slides.add_slide(blank_layout)
    set_slide_background(s7)
    add_header(s7, "System Modeling: DFD Level 0 Context & UML Entity Class Diagram", "Formal Software Engineering", 7)

    # Left: DFD Level 0 Card
    add_card(s7, Inches(0.8), Inches(1.45), Inches(5.7), Inches(5.65))
    dfd_img = os.path.join(ASSETS_DIR, "dfd_level_0.png")
    if os.path.exists(dfd_img):
        s7.shapes.add_picture(dfd_img, Inches(0.95), Inches(1.55), Inches(5.4), Inches(3.2))
    
    tb_dfd = s7.shapes.add_textbox(Inches(0.95), Inches(4.85), Inches(5.4), Inches(2.1))
    tf_dfd = tb_dfd.text_frame
    tf_dfd.word_wrap = True
    
    p = tf_dfd.paragraphs[0]
    p.add_run().text = "DATA FLOW DIAGRAM (LEVEL 0 CONTEXT)"
    p.runs[0].font.bold = True
    p.runs[0].font.size = Pt(13)
    p.runs[0].font.color.rgb = C_PRIMARY
    
    dfd_pts = [
        ("• Three Clear Actors: ", "Customer, Service Partner, and Platform Admin."),
        ("• Role Isolation: ", "Each actor interacts exclusively via authenticated, role-specific REST routes."),
        ("• Input Validation: ", "FastAPI validates all incoming payloads with Pydantic schemas before DB writes.")
    ]
    for tag, desc in dfd_pts:
        p_pt = tf_dfd.add_paragraph()
        p_pt.space_before = Pt(3)
        r_t = p_pt.add_run()
        r_t.text = tag
        r_t.font.bold = True
        r_t.font.size = Pt(12)
        r_t.font.color.rgb = C_DARK
        r_d = p_pt.add_run()
        r_d.text = desc
        r_d.font.size = Pt(11.5)
        r_d.font.color.rgb = C_DARK

    # Right: UML Class Diagram Card
    add_card(s7, Inches(6.8), Inches(1.45), Inches(5.7), Inches(5.65))
    class_img = os.path.join(ASSETS_DIR, "class_diagram.png")
    if os.path.exists(class_img):
        s7.shapes.add_picture(class_img, Inches(6.95), Inches(1.55), Inches(5.4), Inches(3.2))

    tb_cls = s7.shapes.add_textbox(Inches(6.95), Inches(4.85), Inches(5.4), Inches(2.1))
    tf_cls = tb_cls.text_frame
    tf_cls.word_wrap = True
    
    p = tf_cls.paragraphs[0]
    p.add_run().text = "UML CORE DOMAIN ENTITY MODEL"
    p.runs[0].font.bold = True
    p.runs[0].font.size = Pt(13)
    p.runs[0].font.color.rgb = C_PRIMARY

    cls_pts = [
        ("• 1:1 Polymorphic Profiles: ", "Core 'users' table links 1:1 to CustomerProfile and ProviderProfile."),
        ("• Relational Integrity: ", "Foreign keys connect Bookings, Services, and Verification records without data loss."),
        ("• Complete Audit Trail: ", "Tracks timestamps for requested, started, and OTP-completed transitions.")
    ]
    for tag, desc in cls_pts:
        p_pt = tf_cls.add_paragraph()
        p_pt.space_before = Pt(3)
        r_t = p_pt.add_run()
        r_t.text = tag
        r_t.font.bold = True
        r_t.font.size = Pt(12)
        r_t.font.color.rgb = C_DARK
        r_d = p_pt.add_run()
        r_d.text = desc
        r_d.font.size = Pt(11.5)
        r_d.font.color.rgb = C_DARK

    add_notes(s7, 
        "Presenter Cue: Explain the system modeling clearly to Deepak Sharma Sir and the panel. "
        "The DFD Level 0 clearly bounds the 3 actor roles: Customer, Partner, Admin. "
        "The UML Class diagram demonstrates clean relational normalization, with separate profiles, strict foreign keys, and audit logs.")

    # ==================================================================
    # SLIDE 8: BOOKING STATE MACHINE & DUAL OCR KYC PIPELINE
    # ==================================================================
    s8 = prs.slides.add_slide(blank_layout)
    set_slide_background(s8)
    add_header(s8, "Booking State Machine (FSM) & Dual-Engine OCR KYC", "Core Algorithms & Lifecycles", 8)

    # Left: FSM Diagram Card
    add_card(s8, Inches(0.8), Inches(1.45), Inches(5.7), Inches(5.65))
    fsm_img = os.path.join(ASSETS_DIR, "fsm_state_diagram.png")
    if os.path.exists(fsm_img):
        s8.shapes.add_picture(fsm_img, Inches(0.95), Inches(1.55), Inches(5.4), Inches(3.2))
    
    tb_fsm = s8.shapes.add_textbox(Inches(0.95), Inches(4.85), Inches(5.4), Inches(2.1))
    tf_fsm = tb_fsm.text_frame
    tf_fsm.word_wrap = True
    
    p = tf_fsm.paragraphs[0]
    p.add_run().text = "ATOMIC 5-STAGE BOOKING FINITE STATE MACHINE"
    p.runs[0].font.bold = True
    p.runs[0].font.size = Pt(13)
    p.runs[0].font.color.rgb = C_PRIMARY

    fsm_pts = [
        ("• Strict Lifecycle: ", "REQUESTED → ACCEPTED → STARTED → COMPLETED."),
        ("• Zero Double-Booking: ", "A provider cannot accept overlapping active jobs."),
        ("• Customer OTP Security: ", "Job CANNOT be marked complete without the customer's secret 4-digit OTP.")
    ]
    for tag, desc in fsm_pts:
        p_pt = tf_fsm.add_paragraph()
        p_pt.space_before = Pt(3)
        r_t = p_pt.add_run()
        r_t.text = tag
        r_t.font.bold = True
        r_t.font.size = Pt(12)
        r_t.font.color.rgb = C_DARK
        r_d = p_pt.add_run()
        r_d.text = desc
        r_d.font.size = Pt(11.5)
        r_d.font.color.rgb = C_DARK

    # Right: Swimlane Lifecycle Card
    add_card(s8, Inches(6.8), Inches(1.45), Inches(5.7), Inches(5.65))
    seq_img = os.path.join(ASSETS_DIR, "sequence_swimlane.png")
    if os.path.exists(seq_img):
        s8.shapes.add_picture(seq_img, Inches(6.95), Inches(1.55), Inches(5.4), Inches(3.2))

    tb_seq = s8.shapes.add_textbox(Inches(6.95), Inches(4.85), Inches(5.4), Inches(2.1))
    tf_seq = tb_seq.text_frame
    tf_seq.word_wrap = True
    
    p = tf_seq.paragraphs[0]
    p.add_run().text = "DUAL-ENGINE OCR KYC & OPERATIONAL SWIMLANE"
    p.runs[0].font.bold = True
    p.runs[0].font.size = Pt(13)
    p.runs[0].font.color.rgb = C_PRIMARY

    seq_pts = [
        ("• Dual-Engine Speed: ", "PaddleOCR (primary) + EasyOCR (fallback) extracts identity data in <2.6s."),
        ("• Automated Risk Parser: ", "Regex heuristic validates 12-digit Aadhaar & 10-digit PAN format."),
        ("• End-to-End Sequence: ", "Swimlane maps the complete interaction between Customer, Gateway, DB, and Partner.")
    ]
    for tag, desc in seq_pts:
        p_pt = tf_seq.add_paragraph()
        p_pt.space_before = Pt(3)
        r_t = p_pt.add_run()
        r_t.text = tag
        r_t.font.bold = True
        r_t.font.size = Pt(12)
        r_t.font.color.rgb = C_DARK
        r_d = p_pt.add_run()
        r_d.text = desc
        r_d.font.size = Pt(11.5)
        r_d.font.color.rgb = C_DARK

    add_notes(s8, 
        "Presenter Cue: This is a core technical evaluation slide. "
        "Show the FSM diagram: explain that a booking cannot jump straight to Completed. "
        "The customer holds a 4-digit completion OTP that the provider must enter on-site, ensuring jobs are actually completed. "
        "Explain how Dual OCR processes Aadhaar and trade certificates in under 2.6 seconds.")

    # ==================================================================
    # SLIDE 9: WORK DONE — MID-SEMESTER IMPLEMENTATION MILESTONES
    # ==================================================================
    s9 = prs.slides.add_slide(blank_layout)
    set_slide_background(s9)
    add_header(s9, "Work Done: Mid-Semester Implementation Status (~55%)", "Completed Engineering Deliverables", 9)

    modules = [
        ("Master Service Catalog Engine", "100% COMPLETE", C_GREEN_LIVE,
         "• 14 Macro-Categories, 78 Subcategories, 457 Services.\n"
         "• Seeded in PostgreSQL with fixed durations, inclusions, and transparent rates.\n"
         "• Protected by 11 Inviolable Catalog Rules (zero data contamination)."),
        
        ("Modular FastAPI Backend on Render", "100% COMPLETE", C_GREEN_LIVE,
         "• Asynchronous REST API running live on Render Cloud.\n"
         "• Pydantic V2 request validation and database pooling on Supabase PostgreSQL.\n"
         "• Interactive OpenAPI documentation available at `/docs` with <50ms response."),

        ("Multi-Portal Frontends on Vercel", "100% COMPLETE", C_GREEN_LIVE,
         "• 4 Independent React 19 + Vite SPAs deployed on Vercel.\n"
         "• Single Page App (SPA) route rewrites configured via vercel.json.\n"
         "• Live Portals: Landing Gateway, Customer Portal, Partner Workspace, Admin Console."),

        ("Event Streaming & GPS Telemetry", "IN PROGRESS (~40%)", C_WARN_AMBER,
         "• 7 Canonical Kafka event topic schemas designed & verified in connection tests.\n"
         "• Leaflet map route geometries implemented on client interfaces.\n"
         "• Full broker orchestration & WebSocket live driver tracking scheduled for End-Sem.")
    ]

    for idx, (title, status, status_color, body) in enumerate(modules):
        col = idx % 2
        row = idx // 2
        x = Inches(0.8 + col * 5.97)
        y = Inches(1.45 + row * 2.8)
        
        add_card(s9, x, y, Inches(5.7), Inches(2.65))
        
        tb = s9.shapes.add_textbox(x + Inches(0.2), y + Inches(0.15), Inches(5.3), Inches(2.35))
        tf = tb.text_frame
        tf.word_wrap = True
        
        p = tf.paragraphs[0]
        p.add_run().text = title
        p.runs[0].font.bold = True
        p.runs[0].font.size = Pt(13.5)
        p.runs[0].font.color.rgb = C_DARK

        p_st = tf.add_paragraph()
        p_st.space_before = Pt(3)
        p_st.add_run().text = f"Status: {status}"
        p_st.runs[0].font.bold = True
        p_st.runs[0].font.size = Pt(12)
        p_st.runs[0].font.color.rgb = status_color

        p_b = tf.add_paragraph()
        p_b.space_before = Pt(4)
        p_b.add_run().text = body
        p_b.runs[0].font.size = Pt(11.5)
        p_b.runs[0].font.color.rgb = C_DARK

    add_notes(s9, 
        "Presenter Cue: Walk through the 4 engineering modules. "
        "Point out that the Master Catalog, Backend Core, and Web Portals are 100% implemented and deployed live. "
        "Acknowledge transparently that Event Streaming (Kafka) and Live GPS Telemetry are at ~40% progress, forming our active Phase 2 sprint.")

    # ==================================================================
    # SLIDE 10: RESULTS OBTAINED — LIVE SYSTEM WALKTHROUGH
    # ==================================================================
    s10 = prs.slides.add_slide(blank_layout)
    set_slide_background(s10)
    add_header(s10, "Results Obtained: Live Deployed System & UI Verification", "Live Cloud Proof", 10)

    ss_configs = [
        ("Customer Live Dashboard", os.path.join(ASSETS_DIR, "screenshot_2.png"), "Live Bookings & 8 Categories from Supabase DB"),
        ("Service Pricing & SLA", os.path.join(ASSETS_DIR, "screenshot_1.png"), "Full Home Deep Cleaning (₹5,089 / 180 Mins)"),
        ("Landing Role Selector", os.path.join(ASSETS_DIR, "screenshot_7.png"), "Public Showcase Gate linking Customer & Partner")
    ]

    for idx, (title, img_path, desc) in enumerate(ss_configs):
        x = Inches(0.8 + idx * 3.97)
        add_card(s10, x, Inches(1.45), Inches(3.8), Inches(4.35))
        
        bh = s10.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(1.45), Inches(3.8), Inches(0.65))
        bh.fill.solid()
        bh.fill.fore_color.rgb = C_PRIMARY
        bh.line.fill.background()
        p = bh.text_frame.paragraphs[0]
        p.alignment = PP_ALIGN.CENTER
        r = p.add_run()
        r.text = title
        r.font.bold = True
        r.font.size = Pt(12)
        r.font.color.rgb = RGBColor(255, 255, 255)

        if os.path.exists(img_path):
            s10.shapes.add_picture(img_path, x + Inches(0.1), Inches(2.2), Inches(3.6), Inches(2.7))

        tb_c = s10.shapes.add_textbox(x + Inches(0.1), Inches(4.95), Inches(3.6), Inches(0.8))
        tf_c = tb_c.text_frame
        tf_c.word_wrap = True
        p_c = tf_c.paragraphs[0]
        p_c.alignment = PP_ALIGN.CENTER
        r_c = p_c.add_run()
        r_c.text = desc
        r_c.font.size = Pt(11)
        r_c.font.color.rgb = C_MUTED

    add_card(s10, Inches(0.8), Inches(5.95), Inches(11.733), Inches(1.15), bg_color=C_CARD_BG, border_color=C_GREEN_LIVE)
    tb_bn = s10.shapes.add_textbox(Inches(1.0), Inches(6.0), Inches(11.3), Inches(1.05))
    tf_bn = tb_bn.text_frame
    tf_bn.word_wrap = True
    p_bn = tf_bn.paragraphs[0]
    p_bn.add_run().text = "VERIFIED PERFORMANCE BENCHMARKS:  "
    p_bn.runs[0].font.bold = True
    p_bn.runs[0].font.size = Pt(12.5)
    p_bn.runs[0].font.color.rgb = C_GREEN_LIVE
    p_bn.add_run().text = "Dual-Engine OCR Latency: 2.64s  •  API Health Latency: 48ms  •  Database Query Latency: 14–38ms  •  Integration Test Suite: 24/24 Passed (0 Failures)  •  IDOR Security Flaws: 0 Detected"
    p_bn.runs[1].font.size = Pt(11.5)
    p_bn.runs[1].font.color.rgb = C_DARK

    add_notes(s10, 
        "Presenter Cue: Point to the live screenshots on the slide. "
        "Show the Customer Portal with real active bookings ('Bridal Makeup ₹499' and 'Hair Spa ₹879') loaded from Supabase PostgreSQL. "
        "Point to the Service Detail screen showing 'Full Home Deep Cleaning ₹5,089' with rating 4.8 and 180 min duration. "
        "Mention the performance benchmark: OCR finishes in 2.64 seconds, and 24/24 integration tests passed.")

    # ==================================================================
    # SLIDE 11: CONCLUSION & FUTURE WORK (END-SEM ROADMAP)
    # ==================================================================
    s11 = prs.slides.add_slide(blank_layout)
    set_slide_background(s11)
    add_header(s11, "Conclusion & Phase 2 Roadmap (End-Semester Plan)", "Sprint Timeline", 11)

    sprints = [
        ("Sprint 1 (Weeks 8–9)", "Kafka Event Bus",
         "• Activate Redpanda Cloud cluster across all 7 canonical event topics.\n"
         "• Implement async consumer group processing for order dispatch.\n"
         "• Telemetry logging & cluster health monitoring."),
        ("Sprint 2 (Weeks 10–11)", "GPS Live Telemetry",
         "• WebSocket coordinate streaming between provider mobile & customer map.\n"
         "• Interactive Leaflet route geometry simulation with live ETA.\n"
         "• Proximity alerts when provider is within 500m."),
        ("Sprint 3 (Weeks 12–13)", "Payment & Escrow",
         "• Razorpay / Stripe webhook integration.\n"
         "• Automated escrow fund hold on booking creation.\n"
         "• Instant release to provider wallet upon verified customer OTP completion."),
        ("Sprint 4 (Weeks 14–15)", "Load Test & Audit",
         "• Locust load testing with 1,000 concurrent virtual users.\n"
         "• Final security penetration pass & accessibility compliance.\n"
         "• Comprehensive End-Semester Major Project Report submission.")
    ]

    for idx, (title, tag, body) in enumerate(sprints):
        x = Inches(0.8 + idx * 2.98)
        add_card(s11, x, Inches(1.45), Inches(2.8), Inches(4.55))
        
        sh = s11.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(1.45), Inches(2.8), Inches(0.75))
        sh.fill.solid()
        sh.fill.fore_color.rgb = C_PRIMARY if idx == 0 else (C_WARN_AMBER if idx == 1 else (C_ACCENT_BLUE if idx == 2 else C_SECONDARY))
        sh.line.fill.background()
        p = sh.text_frame.paragraphs[0]
        p.alignment = PP_ALIGN.CENTER
        r = p.add_run()
        r.text = title
        r.font.bold = True
        r.font.size = Pt(11.5)
        r.font.color.rgb = RGBColor(255, 255, 255)

        tb_s = s11.shapes.add_textbox(x + Inches(0.12), Inches(2.3), Inches(2.56), Inches(3.6))
        tf_s = tb_s.text_frame
        tf_s.word_wrap = True
        
        p_t = tf_s.paragraphs[0]
        p_t.add_run().text = tag
        p_t.runs[0].font.bold = True
        p_t.runs[0].font.size = Pt(12.5)
        p_t.runs[0].font.color.rgb = C_DARK

        p_b = tf_s.add_paragraph()
        p_b.space_before = Pt(5)
        p_b.add_run().text = body
        p_b.runs[0].font.size = Pt(11)
        p_b.runs[0].font.color.rgb = C_DARK

    add_card(s11, Inches(0.8), Inches(6.15), Inches(11.733), Inches(0.95), bg_color=C_CARD_BG, border_color=C_PRIMARY)
    tb_c = s11.shapes.add_textbox(Inches(1.0), Inches(6.2), Inches(11.3), Inches(0.85))
    tf_c = tb_c.text_frame
    tf_c.word_wrap = True
    p_c = tf_c.paragraphs[0]
    p_c.add_run().text = "MID-SEMESTER CONCLUSION: "
    p_c.runs[0].font.bold = True
    p_c.runs[0].font.size = Pt(12)
    p_c.runs[0].font.color.rgb = C_PRIMARY
    p_c.add_run().text = "Foundational architecture, relational schemas, dual-engine OCR algorithms, and multi-portal web applications are 100% operational. The upcoming sprints will complete distributed event streaming, live telemetry, and financial escrow."
    p_c.runs[1].font.size = Pt(11.5)
    p_c.runs[1].font.color.rgb = C_DARK

    add_notes(s11, 
        "Presenter Cue: Conclude by outlining the clear 4-sprint roadmap for Weeks 8 to 15. "
        "Reiterate that the team has delivered a rock-solid, production-tested foundation for the Mid-Semester milestone, "
        "and is poised to complete event-driven Kafka dispatch and GPS tracking in the upcoming sprints.")

    # ==================================================================
    # SLIDE 12: CLOSING SLIDE — THANK YOU & LIVE DEMO GATEWAYS
    # ==================================================================
    s12 = prs.slides.add_slide(blank_layout)
    set_slide_background(s12, C_PRIMARY)

    # Main Card
    add_card(s12, Inches(1.0), Inches(0.65), Inches(11.333), Inches(6.2), bg_color=C_CARD_BG, border_color=C_SECONDARY)

    # Top Heading Box
    tb_th = s12.shapes.add_textbox(Inches(1.2), Inches(0.85), Inches(10.933), Inches(1.5))
    tf_th = tb_th.text_frame
    tf_th.word_wrap = True
    
    p_th = tf_th.paragraphs[0]
    p_th.alignment = PP_ALIGN.CENTER
    r_th = p_th.add_run()
    r_th.text = "THANK YOU!"
    r_th.font.name = FONT_HEADING
    r_th.font.size = Pt(38)
    r_th.font.bold = True
    r_th.font.color.rgb = C_PRIMARY
    
    p_sub = tf_th.add_paragraph()
    p_sub.alignment = PP_ALIGN.CENTER
    p_sub.space_before = Pt(4)
    r_sub = p_sub.add_run()
    r_sub.text = "Minor Project Mid-Semester Evaluation  •  B.Tech in ICT, 7th Semester (2026-2027)"
    r_sub.font.size = Pt(13.5)
    r_sub.font.bold = True
    r_sub.font.color.rgb = C_SECONDARY

    p_team = tf_th.add_paragraph()
    p_team.alignment = PP_ALIGN.CENTER
    p_team.space_before = Pt(4)
    r_t1 = p_team.add_run()
    r_t1.text = "Pushkar Kanjani (23BIT153) & Aastha (23BIT095)   |   Project Mentor: Dr. Deepak Kumar Sharma, Asst. Professor, Dept. of ICT, SoT, PDEU"
    r_t1.font.size = Pt(12)
    r_t1.font.color.rgb = C_DARK

    # Centered Live Cloud Gateways Showcase Card
    add_card(s12, Inches(1.4), Inches(2.5), Inches(10.533), Inches(3.4), bg_color=RGBColor(248, 250, 252), border_color=C_PRIMARY)
    
    # Header inside card
    card_h = s12.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.4), Inches(2.5), Inches(10.533), Inches(0.7))
    card_h.fill.solid()
    card_h.fill.fore_color.rgb = C_PRIMARY
    card_h.line.fill.background()
    p_ch = card_h.text_frame.paragraphs[0]
    p_ch.alignment = PP_ALIGN.CENTER
    r_ch = p_ch.add_run()
    r_ch.text = "LIVE DEPLOYED CLOUD PLATFORM & API DEMO GATEWAYS"
    r_ch.font.bold = True
    r_ch.font.size = Pt(13.5)
    r_ch.font.color.rgb = RGBColor(255, 255, 255)

    # 2 Columns for Links inside card
    # Column 1: Web Portals
    tb_c1 = s12.shapes.add_textbox(Inches(1.7), Inches(3.3), Inches(4.8), Inches(2.4))
    tf_c1 = tb_c1.text_frame
    tf_c1.word_wrap = True
    
    c1_links = [
        ("Public Landing Showcase: ", "https://smartserve-landing-ten.vercel.app"),
        ("Customer Booking Portal: ", "https://smartserve-customer-alpha.vercel.app"),
        ("Service Partner Workspace: ", "https://smartserve-provider.vercel.app")
    ]
    for idx, (title, url) in enumerate(c1_links):
        p = tf_c1.paragraphs[0] if idx == 0 else tf_c1.add_paragraph()
        if idx > 0: p.space_before = Pt(8)
        r_t = p.add_run()
        r_t.text = f"• {title}\n"
        r_t.font.bold = True
        r_t.font.size = Pt(12)
        r_t.font.color.rgb = C_DARK
        r_u = p.add_run()
        r_u.text = f"   {url}"
        r_u.font.size = Pt(11)
        r_u.font.color.rgb = C_ACCENT_BLUE

    # Column 2: Admin & Backend APIs
    tb_c2 = s12.shapes.add_textbox(Inches(6.9), Inches(3.3), Inches(4.8), Inches(2.4))
    tf_c2 = tb_c2.text_frame
    tf_c2.word_wrap = True
    
    c2_links = [
        ("Admin Control Tower: ", "https://smartserve-admin-flax.vercel.app"),
        ("Interactive Swagger API Docs: ", "https://smartserve-api-de3f.onrender.com/docs"),
        ("API Health & Telemetry: ", "https://smartserve-api-de3f.onrender.com/health")
    ]
    for idx, (title, url) in enumerate(c2_links):
        p = tf_c2.paragraphs[0] if idx == 0 else tf_c2.add_paragraph()
        if idx > 0: p.space_before = Pt(8)
        r_t = p.add_run()
        r_t.text = f"• {title}\n"
        r_t.font.bold = True
        r_t.font.size = Pt(12)
        r_t.font.color.rgb = C_DARK
        r_u = p.add_run()
        r_u.text = f"   {url}"
        r_u.font.size = Pt(11)
        r_u.font.color.rgb = C_ACCENT_BLUE

    # Bottom Invite
    tb_inv = s12.shapes.add_textbox(Inches(1.4), Inches(6.0), Inches(10.533), Inches(0.65))
    tf_inv = tb_inv.text_frame
    tf_inv.word_wrap = True
    p_inv = tf_inv.paragraphs[0]
    p_inv.alignment = PP_ALIGN.CENTER
    r_inv = p_inv.add_run()
    r_inv.text = "We welcome questions, feedback, and suggestions from the Evaluation Committee."
    r_inv.font.size = Pt(12.5)
    r_inv.font.bold = True
    r_inv.font.color.rgb = C_MUTED

    add_notes(s12, 
        "Presenter Cue: Thank Dr. Deepak Kumar Sharma Sir and the respected evaluation committee. "
        "Keep this slide on screen during the 5 minutes of Q&A. "
        "Offer to open any of the live deployed Vercel portals or the interactive Swagger API console for a live demonstration.\n\n"
        "--- PERSONAL VIVA CROSS-QUESTIONING CHEAT SHEET (PRIVATE NOTES) ---\n"
        "Q1: Why PostgreSQL over MongoDB?\n"
        "Ans: Bookings require strict relational foreign keys and ACID transactions to guarantee that two customers cannot double-book the same partner.\n\n"
        "Q2: Why FastAPI over Flask/Django?\n"
        "Ans: FastAPI has native async I/O for high speed, automatically generates live OpenAPI Swagger docs at /docs, and validates schemas using Pydantic.\n\n"
        "Q3: Why Dual-Engine OCR (Paddle + EasyOCR)?\n"
        "Ans: Indian IDs often have uneven lighting or stamps; dual-engine fallback delivers 99% accuracy in 2.6s where single engines fail.\n\n"
        "Q4: Why is Kafka planned for Phase 2?\n"
        "Ans: Decouples driver GPS updates and order spikes so high traffic never blocks or crashes the main relational database.")

    try:
        prs.save(OUTPUT_PPTX)
        print(f"Presentation successfully updated at: {OUTPUT_PPTX}")
    except PermissionError:
        alt_path = os.path.join(DOCS_DIR, "SMARTSERVE_MID_SEM_PRESENTATION_UPDATED.pptx")
        prs.save(alt_path)
        print(f"Notice: Main PPTX was open in PowerPoint. Saved updated presentation to: {alt_path}")

if __name__ == "__main__":
    build_presentation()
