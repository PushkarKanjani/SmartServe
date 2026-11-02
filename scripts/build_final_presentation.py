import os
import sys
import pptx
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

DOCS_DIR = r"c:\MyDrive\SEM-7\BigData\SmartServe\docs"
ASSETS_DIR = os.path.join(DOCS_DIR, "assets")
OUTPUT_PPTX = os.path.join(DOCS_DIR, "SMARTSERVE_FINAL_PRESENTATION.pptx")
OUTPUT_PDF = os.path.join(DOCS_DIR, "SMARTSERVE_FINAL_PRESENTATION.pdf")
OUTPUT_TEX = os.path.join(DOCS_DIR, "SMARTSERVE_FINAL_PRESENTATION.tex")

PDEU_LOGO_PATH = os.path.join(ASSETS_DIR, "pdeu_logo.png")
ARCH_IMG_PATH = os.path.join(ASSETS_DIR, "architecture_diagram.png")
SEQ_IMG_PATH = os.path.join(ASSETS_DIR, "sequence_swimlane.png")
MODAL_IMG_PATH = os.path.join(ASSETS_DIR, "booking_modal_crop.png")
LOC_IMG_PATH = os.path.join(ASSETS_DIR, "gujarati_service_crop.png")

# Color Palette Constants
C_PRIMARY = RGBColor(47, 82, 51)       # #2F5233 SmartServe Forest Green
C_SECONDARY = RGBColor(201, 161, 90)   # #C9A15A Accent Gold
C_DARK = RGBColor(31, 42, 30)          # #1F2A1E Dark Slate / Charcoal
C_LIGHT_BG = RGBColor(250, 247, 240)   # #FAF7F0 Warm Ivory
C_CARD_BG = RGBColor(255, 255, 255)    # #FFFFFF Clean White Card
C_BORDER = RGBColor(226, 232, 240)     # #E2E8F0 Subtle Border Gray
C_MUTED = RGBColor(100, 116, 139)      # #64748B Slate Muted Text
C_ACCENT_BLUE = RGBColor(37, 99, 235)  # #2563EB Blue
C_WARN_AMBER = RGBColor(217, 119, 6)   # #D97706 Amber
C_GREEN_LIVE = RGBColor(22, 163, 74)   # #16A34A Emerald Green
C_RED_ALERT = RGBColor(220, 38, 38)    # #DC2626 Crimson Red

FONT_HEADING = "Segoe UI"
FONT_BODY = "Segoe UI"

def set_slide_background(slide, color=C_LIGHT_BG):
    background = slide.background
    fill = background.fill
    fill.solid()
    fill.fore_color.rgb = color

def add_header(slide, title_text, category_text, slide_num):
    # PDEU logo in top right
    if os.path.exists(PDEU_LOGO_PATH):
        try:
            slide.shapes.add_picture(PDEU_LOGO_PATH, Inches(10.6), Inches(0.22), Inches(2.0), Inches(0.54))
        except Exception:
            pass

    header_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.24), Inches(9.6), Inches(1.1))
    tf = header_box.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
    
    # Category tag
    p_cat = tf.paragraphs[0]
    r_cat = p_cat.add_run()
    r_cat.text = f"{category_text.upper()}  |  SLIDE {slide_num} OF 8  •  PDEU ICT"
    r_cat.font.name = FONT_BODY
    r_cat.font.size = Pt(11)
    r_cat.font.bold = True
    r_cat.font.color.rgb = C_DARK
    
    # Main title
    p_title = tf.add_paragraph()
    r_title = p_title.add_run()
    r_title.text = title_text
    r_title.font.name = FONT_HEADING
    r_title.font.size = Pt(21)
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

def add_badge(slide, left, top, width, height, text, bg_color, text_color):
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = bg_color
    shape.line.fill.background()
    tf = shape.text_frame
    tf.word_wrap = False
    tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = text
    r.font.name = FONT_BODY
    r.font.size = Pt(10)
    r.font.bold = True
    r.font.color.rgb = text_color
    return shape

def create_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # ==================================================================
    # SLIDE 1: TITLE SLIDE (WITH PDEU LOGO, MENTOR, & ROLL NUMBERS)
    # ==================================================================
    s1 = prs.slides.add_slide(blank_layout)
    set_slide_background(s1, C_PRIMARY)

    # Hero card in center with gold border
    add_card(s1, Inches(0.9), Inches(0.55), Inches(11.533), Inches(6.4), bg_color=C_CARD_BG, border_color=C_SECONDARY)

    # Add PDEU Logo at top left of hero card
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
    r_u2.text = "DEPARTMENT OF INFORMATION AND COMMUNICATION TECHNOLOGY (ICT)\nFINAL B.TECH ICT PROJECT EVALUATION  •  SEMESTER 7 (2026-2027)"
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
    r1.font.size = Pt(26)
    r1.font.bold = True
    r1.font.color.rgb = C_PRIMARY
    
    p2 = tf1.add_paragraph()
    p2.space_before = Pt(5)
    r2 = p2.add_run()
    r2.text = "A Multi-Tenant Cloud Architecture with Real-Time Rolling Slot Protection, Two-Stage Cryptographic OTP, 457-Service Master Catalog & Regional Franchise Engine"
    r2.font.name = FONT_BODY
    r2.font.size = Pt(12.5)
    r2.font.color.rgb = C_MUTED

    # Three Profile Cards Side-by-Side: Pushkar, Aastha, and Mentor Dr. Deepak Kumar Sharma
    # 1. Pushkar Card
    add_card(s1, Inches(1.3), Inches(3.6), Inches(3.6), Inches(1.65), bg_color=RGBColor(248, 250, 252), border_color=C_PRIMARY)
    tb_p = s1.shapes.add_textbox(Inches(1.42), Inches(3.7), Inches(3.36), Inches(1.45))
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

    # 2. Aastha Card
    add_card(s1, Inches(5.1), Inches(3.6), Inches(3.6), Inches(1.65), bg_color=RGBColor(248, 250, 252), border_color=C_PRIMARY)
    tb_a = s1.shapes.add_textbox(Inches(5.22), Inches(3.7), Inches(3.36), Inches(1.45))
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

    # 3. Project Mentor Card (Right side)
    add_card(s1, Inches(8.9), Inches(3.6), Inches(3.3), Inches(1.65), bg_color=RGBColor(254, 252, 232), border_color=C_SECONDARY)
    tb_men = s1.shapes.add_textbox(Inches(9.02), Inches(3.7), Inches(3.06), Inches(1.45))
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
    add_card(s1, Inches(1.3), Inches(5.4), Inches(10.9), Inches(1.2), bg_color=RGBColor(240, 253, 244), border_color=C_GREEN_LIVE)
    tb_m = s1.shapes.add_textbox(Inches(1.5), Inches(5.45), Inches(10.5), Inches(1.1))
    tf_m = tb_m.text_frame
    tf_m.word_wrap = True
    p_m = tf_m.paragraphs[0]
    r_mt = p_m.add_run()
    r_mt.text = "FINAL EVALUATION MILESTONE STATUS (VERSION 1.0): "
    r_mt.font.bold = True
    r_mt.font.size = Pt(12)
    r_mt.font.color.rgb = C_GREEN_LIVE
    r_mb = p_m.add_run()
    r_mb.text = "100% Production Ready  •  FastAPI Core Engine, 457 Catalog Services, Rolling Slot Protection, Two-Stage Cryptographic OTP, Trilingual Localization (EN/GU/HI), & Regional Franchise White-Label Architecture Verified."
    r_mb.font.size = Pt(11.5)
    r_mb.font.color.rgb = C_DARK

    add_notes(s1,
        "Presenter Cue: Greet the respected evaluation committee and our project mentor Dr. Deepak Kumar Sharma Sir. "
        "Introduce yourself: Pushkar Kanjani (23BIT153) and Aastha (23BIT095), B.Tech in ICT, Pandit Deendayal Energy University (PDEU). "
        "State clearly that this presentation represents the Final Project Evaluation (Version 1.0) of SmartServe. "
        "Highlight that all components—FastAPI core engine, rolling provider slot protection, 457 catalog services, trilingual localization, and multi-tenant franchise architecture—are 100% implemented, tested, and live.")

    # ==================================================================
    # SLIDE 2: INDUSTRY REALITY & COMPETITOR VULNERABILITIES
    # ==================================================================
    s2 = prs.slides.add_slide(blank_layout)
    set_slide_background(s2, C_LIGHT_BG)
    add_header(s2, "Industry Reality: Operational Bottlenecks in Monopolistic Platforms", "Market Research & Competitive Audit", 2)

    # Left Card: Incumbent Monopoly Vulnerabilities (Urban Company / Pronto)
    add_card(s2, Inches(0.8), Inches(1.45), Inches(5.6), Inches(5.6), bg_color=C_CARD_BG, border_color=C_RED_ALERT)
    
    tbox2_left = s2.shapes.add_textbox(Inches(1.0), Inches(1.6), Inches(5.2), Inches(5.3))
    tf2_l = tbox2_left.text_frame
    tf2_l.word_wrap = True

    p = tf2_l.paragraphs[0]
    r = p.add_run()
    r.text = "INCUMBENT MONOPOLY DEFICIENCIES"
    r.font.bold = True
    r.font.size = Pt(11)
    r.font.color.rgb = C_RED_ALERT

    p = tf2_l.add_paragraph()
    r = p.add_run()
    r.text = "Urban Company & Pronto Vulnerabilities"
    r.font.bold = True
    r.font.size = Pt(17)
    r.font.color.rgb = C_DARK

    bullets_left = [
        ("Algorithmic Dispatch Flaw (Greedy KNN):", "Competitors use naive greedy nearest-neighbor matching. Under the Karp-Vazirani-Vazirani Theorem, greedy bipartite matching has a competitive ratio bound of <= 50%, resulting in 30-35% unpaid partner deadhead travel fatigue."),
        ("Surge Gouging & Margin Squeeze:", "Unregulated surge pricing multipliers reach 2.0x-2.5x during seasonal peaks. High 25-30% platform commissions spark widespread partner strikes and high churn."),
        ("Spare Hardware Extortion:", "Technicians mark up parts without regulation (e.g. charging ₹1,400 for a ₹200 capacitor) due to zero platform transparency."),
        ("Single OTP Fraud & Language Barrier:", "Single completion OTP enables remote ghost completions; 85%+ regional gig workers & consumers face severe friction from English-only UIs.")
    ]
    for b_title, b_desc in bullets_left:
        p = tf2_l.add_paragraph()
        p.space_before = Pt(8)
        r1 = p.add_run()
        r1.text = f"• {b_title} "
        r1.font.bold = True
        r1.font.size = Pt(11)
        r1.font.color.rgb = C_DARK
        r2 = p.add_run()
        r2.text = b_desc
        r2.font.size = Pt(10.5)
        r2.font.color.rgb = C_MUTED

    # Right Card: SmartServe Architectural Solutions
    add_card(s2, Inches(6.6), Inches(1.45), Inches(5.9), Inches(5.6), bg_color=C_CARD_BG, border_color=C_GREEN_LIVE)

    tbox2_right = s2.shapes.add_textbox(Inches(6.8), Inches(1.6), Inches(5.5), Inches(5.3))
    tf2_r = tbox2_right.text_frame
    tf2_r.word_wrap = True

    p = tf2_r.paragraphs[0]
    r = p.add_run()
    r.text = "SMARTSERVE ARCHITECTURAL COUNTERMEASURES"
    r.font.bold = True
    r.font.size = Pt(11)
    r.font.color.rgb = C_GREEN_LIVE

    p = tf2_r.add_paragraph()
    r = p.add_run()
    r.text = "Engineered Trust, Fairness & Performance"
    r.font.bold = True
    r.font.size = Pt(17)
    r.font.color.rgb = C_PRIMARY

    bullets_right = [
        ("Batch Dispatch Optimization:", "Replaces naive greedy dispatch with sliding-window bipartite matching, minimizing deadhead travel and maximizing partner earnings."),
        ("Hard-Capped Surge & Discounts:", "Transparent platform ceiling: Max +20% surge cap and 10% maximum promotional discount rendered clearly to customers upfront."),
        ("Two-Stage Cryptographic OTP:", "Start OTP enforces physical on-site arrival; Complete OTP mandates customer inspection before payment release."),
        ("100% Native Trilingual Localization:", "Pure Gujarati ('ગુ') and Hindi ('हि') across all 457 catalog services with zero English leakage for Tier-2/3 inclusion."),
        ("Standardized 7-15 Day Warranty:", "Automated digital warranty card issuance on completion with formal dispute resolution workflow.")
    ]
    for b_title, b_desc in bullets_right:
        p = tf2_r.add_paragraph()
        p.space_before = Pt(7)
        r1 = p.add_run()
        r1.text = f"✓ {b_title} "
        r1.font.bold = True
        r1.font.size = Pt(11)
        r1.font.color.rgb = C_PRIMARY
        r2 = p.add_run()
        r2.text = b_desc
        r2.font.size = Pt(10.5)
        r2.font.color.rgb = C_MUTED

    # ==================================================================
    # SLIDE 3: SYSTEM ARCHITECTURE & PERFORMANCE CACHING
    # ==================================================================
    s3 = prs.slides.add_slide(blank_layout)
    set_slide_background(s3, C_LIGHT_BG)
    add_header(s3, "Distributed System Architecture & In-Memory Cache Optimization", "System Architecture & Engineering", 3)

    # Left: Architecture Diagram Card
    add_card(s3, Inches(0.8), Inches(1.45), Inches(7.4), Inches(5.6))
    if os.path.exists(ARCH_IMG_PATH):
        try:
            s3.shapes.add_picture(ARCH_IMG_PATH, Inches(0.95), Inches(1.6), Inches(7.1), Inches(5.3))
        except Exception as e:
            print("Error adding arch image:", e)

    # Right: Telemetry & Benchmark Card
    add_card(s3, Inches(8.4), Inches(1.45), Inches(4.1), Inches(5.6), bg_color=C_CARD_BG, border_color=C_PRIMARY)

    tbox3 = s3.shapes.add_textbox(Inches(8.55), Inches(1.6), Inches(3.8), Inches(5.3))
    tf3 = tbox3.text_frame
    tf3.word_wrap = True

    p = tf3.paragraphs[0]
    r = p.add_run()
    r.text = "VERIFIED TELEMETRY"
    r.font.bold = True
    r.font.size = Pt(11)
    r.font.color.rgb = C_SECONDARY

    p = tf3.add_paragraph()
    r = p.add_run()
    r.text = "Performance Benchmarks"
    r.font.bold = True
    r.font.size = Pt(16)
    r.font.color.rgb = C_PRIMARY

    # KPI Box 1
    p = tf3.add_paragraph()
    p.space_before = Pt(10)
    r = p.add_run()
    r.text = "Cold DB Query Latency:  "
    r.font.bold = True
    r.font.size = Pt(11)
    r.font.color.rgb = C_DARK
    r_val = p.add_run()
    r_val.text = "85.4 ms\n"
    r_val.font.bold = True
    r_val.font.size = Pt(12)
    r_val.font.color.rgb = C_WARN_AMBER

    r_warm = p.add_run()
    r_warm.text = "Warm Cache Latency:  "
    r_warm.font.bold = True
    r_warm.font.size = Pt(11)
    r_warm.font.color.rgb = C_DARK
    r_wval = p.add_run()
    r_wval.text = "1.82 ms  (-97.9%)\n"
    r_wval.font.bold = True
    r_wval.font.size = Pt(13)
    r_wval.font.color.rgb = C_GREEN_LIVE

    r_hit = p.add_run()
    r_hit.text = "Cache Hit Ratio:  "
    r_hit.font.bold = True
    r_hit.font.size = Pt(11)
    r_hit.font.color.rgb = C_DARK
    r_hval = p.add_run()
    r_hval.text = "> 85.0% under load"
    r_hval.font.bold = True
    r_hval.font.size = Pt(11)
    r_hval.font.color.rgb = C_ACCENT_BLUE

    # Architectural Highlights
    p = tf3.add_paragraph()
    p.space_before = Pt(12)
    r = p.add_run()
    r.text = "Distributed Architectural Highlights:"
    r.font.bold = True
    r.font.size = Pt(11.5)
    r.font.color.rgb = C_DARK

    arch_points = [
        "4-Tier Architecture: 3 React/Vite Portals + FastAPI + Kafka + In-Memory Cache.",
        "Kafka Real-Time Fabric: 7 event topics with live WebSocket broadcast manager.",
        "Graceful Degraded Mode: Zero server crash when cloud broker disconnects; fallback to in-memory store.",
        "Thread-Safe Invalidation: Cache invalidates automatically on service mutations."
    ]
    for pt in arch_points:
        p = tf3.add_paragraph()
        p.space_before = Pt(5)
        r = p.add_run()
        r.text = f"• {pt}"
        r.font.size = Pt(10)
        r.font.color.rgb = C_MUTED

    # ==================================================================
    # SLIDE 4: REAL-TIME OPERATIONAL WORKFLOWS & SLOT PROTECTION
    # ==================================================================
    s4 = prs.slides.add_slide(blank_layout)
    set_slide_background(s4, C_LIGHT_BG)
    add_header(s4, "Real-Time Operational Workflows: Dynamic Dispatch & Slot Protection", "Operational Engineering & Availability", 4)

    # Left: Logic and Supply Matrix (6.6" width)
    add_card(s4, Inches(0.8), Inches(1.45), Inches(6.6), Inches(5.6))
    tbox4 = s4.shapes.add_textbox(Inches(1.0), Inches(1.6), Inches(6.2), Inches(5.3))
    tf4 = tbox4.text_frame
    tf4.word_wrap = True

    p = tf4.paragraphs[0]
    r = p.add_run()
    r.text = "REAL-TIME LEAD BUFFER & DISPATCH ENFORCEMENT"
    r.font.bold = True
    r.font.size = Pt(11)
    r.font.color.rgb = C_PRIMARY

    p = tf4.add_paragraph()
    r = p.add_run()
    r.text = "Past-Time Slot Elimination Engine"
    r.font.bold = True
    r.font.size = Pt(16)
    r.font.color.rgb = C_DARK

    slot_rules = [
        ("Dynamic 30-Minute Lead Buffer:", "If customer opens booking at 11:15 PM, daytime elapsed slots (10:30 AM, 02:00 PM, 10:30 PM) are dynamically stripped from UI and API generation."),
        ("Automated Day-Roll to Tomorrow:", "When daily working hours close, date picker auto-advances to Tomorrow with earliest valid morning slot (09:00 AM) pre-selected."),
        ("Double-Lock Security Architecture:", "Client-side real-time filter + Backend assertion in eligibility_service.py strictly rejecting past timestamps with HTTP 400 Bad Request."),
        ("100% Catalog Supply Coverage (457/457):", "Every single service across all 14 categories mapped to verified background-approved specialists with active 7-day rolling availability (438 slots).")
    ]
    for r_title, r_desc in slot_rules:
        p = tf4.add_paragraph()
        p.space_before = Pt(8)
        r1 = p.add_run()
        r1.text = f"✓ {r_title} "
        r1.font.bold = True
        r1.font.size = Pt(11)
        r1.font.color.rgb = C_PRIMARY
        r2 = p.add_run()
        r2.text = r_desc
        r2.font.size = Pt(10.5)
        r2.font.color.rgb = C_MUTED

    # Supply Stats Pill Strip
    p = tf4.add_paragraph()
    p.space_before = Pt(14)
    r = p.add_run()
    r.text = "Live Catalog Coverage: "
    r.font.bold = True
    r.font.size = Pt(11)
    r.font.color.rgb = C_DARK
    r_val = p.add_run()
    r_val.text = "14 Categories  |  457 Bookable Services  |  18 Providers  |  438 Active Slots"
    r_val.font.size = Pt(10.5)
    r_val.font.color.rgb = C_GREEN_LIVE

    # Right: Real Modal Screenshot Card
    add_card(s4, Inches(7.6), Inches(1.45), Inches(4.9), Inches(5.6))
    if os.path.exists(MODAL_IMG_PATH):
        try:
            s4.shapes.add_picture(MODAL_IMG_PATH, Inches(7.8), Inches(1.6), Inches(4.5), Inches(5.3))
        except Exception as e:
            print("Error adding modal image:", e)

    # ==================================================================
    # SLIDE 5: TRUST, SAFETY & TWO-STAGE OTP
    # ==================================================================
    s5 = prs.slides.add_slide(blank_layout)
    set_slide_background(s5, C_LIGHT_BG)
    add_header(s5, "Trust, Safety & Financial Integrity: Two-Stage OTP & Warranty Engine", "Platform Governance & Security", 5)

    # Left: Security Policies Card (5.6" width)
    add_card(s5, Inches(0.8), Inches(1.45), Inches(5.6), Inches(5.6))
    tbox5 = s5.shapes.add_textbox(Inches(1.0), Inches(1.6), Inches(5.2), Inches(5.3))
    tf5 = tbox5.text_frame
    tf5.word_wrap = True

    p = tf5.paragraphs[0]
    r = p.add_run()
    r.text = "MULTI-TIER PLATFORM GOVERNANCE"
    r.font.bold = True
    r.font.size = Pt(11)
    r.font.color.rgb = C_PRIMARY

    p = tf5.add_paragraph()
    r = p.add_run()
    r.text = "Fraud Prevention & Financial Trust"
    r.font.bold = True
    r.font.size = Pt(16)
    r.font.color.rgb = C_DARK

    trust_points = [
        ("Two-Stage Cryptographic OTP:", "Phase 1 (Start OTP) physically confirms technician arrival and unlocks checklist timer. Phase 2 (Complete OTP) mandates customer handover approval before payment release."),
        ("COD (Cash on Delivery) Reconciled Flow:", "End-to-end payment status tracking ('Pending' -> 'Collected by Partner' -> 'Platform Reconciled') eliminating billing disputes."),
        ("Standardized 7-15 Day Warranty Policy:", "Stored in booking_warranties; customer claim portal with photo upload and admin resolution workflow (Repair, Re-assign, or Refund)."),
        ("Transparent Pricing Ceilings:", "Hard surge limit (Max +20%) and maximum promotional discount (10%) rendered upfront; zero hidden technician fees.")
    ]
    for t_title, t_desc in trust_points:
        p = tf5.add_paragraph()
        p.space_before = Pt(8)
        r1 = p.add_run()
        r1.text = f"🛡️ {t_title} "
        r1.font.bold = True
        r1.font.size = Pt(11)
        r1.font.color.rgb = C_PRIMARY
        r2 = p.add_run()
        r2.text = t_desc
        r2.font.size = Pt(10.5)
        r2.font.color.rgb = C_MUTED

    # Right: Sequence Swimlane Diagram Card
    add_card(s5, Inches(6.6), Inches(1.45), Inches(5.9), Inches(5.6))
    if os.path.exists(SEQ_IMG_PATH):
        try:
            s5.shapes.add_picture(SEQ_IMG_PATH, Inches(6.75), Inches(1.6), Inches(5.6), Inches(5.3))
        except Exception as e:
            print("Error adding seq image:", e)

    # ==================================================================
    # SLIDE 6: NATIVE TRILINGUAL HYPERLOCAL LOCALIZATION
    # ==================================================================
    s6 = prs.slides.add_slide(blank_layout)
    set_slide_background(s6, C_LIGHT_BG)
    add_header(s6, "Zero English Leaks: Native Trilingual Hyperlocal Localization", "Inclusion & Vernacular Architecture", 6)

    # Left: Translation Engine & 16 Sections Card (6.0" width)
    add_card(s6, Inches(0.8), Inches(1.45), Inches(6.0), Inches(5.6))
    tbox6 = s6.shapes.add_textbox(Inches(1.0), Inches(1.6), Inches(5.6), Inches(5.3))
    tf6 = tbox6.text_frame
    tf6.word_wrap = True

    p = tf6.paragraphs[0]
    r = p.add_run()
    r.text = "VERNACULAR INCLUSION ARCHITECTURE"
    r.font.bold = True
    r.font.size = Pt(11)
    r.font.color.rgb = C_PRIMARY

    p = tf6.add_paragraph()
    r = p.add_run()
    r.text = "100% Pure Gujarati & Hindi Localization"
    r.font.bold = True
    r.font.size = Pt(16)
    r.font.color.rgb = C_DARK

    p = tf6.add_paragraph()
    p.space_before = Pt(6)
    r = p.add_run()
    r.text = "Over 85% of domestic service users and gig technicians in Western/Northern India operate in vernacular languages. SmartServe delivers 100% pure localization with zero English leakage across 16 core service sections:"
    r.font.size = Pt(10.5)
    r.font.color.rgb = C_MUTED

    sections_list = [
        "1. Process Steps Titles & Descriptions (તબક્કાવાર પ્રક્રિયા)",
        "2. Products, Materials & Tools Used (વપરાતી સામગ્રી)",
        "3. Customer Setup & Requirements (ગ્રાહક પૂર્વતૈયારી)",
        "4. Aftercare & Safety Precautions (સંભાળ અને સાવચેતીઓ)",
        "5. Service Warranty & Guarantees (સેવા વૉરંટી અને ગેરંટી)",
        "6. Recommended Dos & Don'ts (શું કરવું અને શું ન કરવું)",
        "7. Exclusions & Uncovered Work (શું સમાયેલું નથી)",
        "8. FAQs, Tips, and Pricing Surge Multipliers (મહત્તમ +20%)"
    ]
    for sec in sections_list:
        p = tf6.add_paragraph()
        p.space_before = Pt(3)
        r = p.add_run()
        r.text = f"✓ {sec}"
        r.font.bold = True
        r.font.size = Pt(10)
        r.font.color.rgb = C_PRIMARY

    p = tf6.add_paragraph()
    p.space_before = Pt(8)
    r = p.add_run()
    r.text = "Engine: Dynamic pattern transliteration + dictionary normalizer with clean UTF-8 unicode rendering (zero Mojibake distortion)."
    r.font.size = Pt(10)
    r.font.color.rgb = C_MUTED

    # Right: Live UI Crop Card
    add_card(s6, Inches(7.0), Inches(1.45), Inches(5.5), Inches(5.6))
    if os.path.exists(LOC_IMG_PATH):
        try:
            s6.shapes.add_picture(LOC_IMG_PATH, Inches(7.15), Inches(1.6), Inches(5.2), Inches(5.3))
        except Exception as e:
            print("Error adding loc image:", e)

    # ==================================================================
    # SLIDE 7: B2B WHITE-LABEL FRANCHISE MODEL
    # ==================================================================
    s7 = prs.slides.add_slide(blank_layout)
    set_slide_background(s7, C_LIGHT_BG)
    add_header(s7, "The B2B Multi-Tenant White-Label Franchise Operating Engine", "Business Model & Enterprise Scalability", 7)

    # Top Overview Card
    add_card(s7, Inches(0.8), Inches(1.45), Inches(11.733), Inches(1.6), bg_color=C_CARD_BG, border_color=C_SECONDARY)
    tbox7_top = s7.shapes.add_textbox(Inches(1.0), Inches(1.55), Inches(11.3), Inches(1.4))
    tf7_t = tbox7_top.text_frame
    tf7_t.word_wrap = True

    p = tf7_t.paragraphs[0]
    r = p.add_run()
    r.text = "PLUG-AND-PLAY WHITE-LABEL PLATFORM AS A SERVICE"
    r.font.bold = True
    r.font.size = Pt(11)
    r.font.color.rgb = C_SECONDARY

    p = tf7_t.add_paragraph()
    r = p.add_run()
    r.text = "Hyperlocal Multi-Tenant Operating Infrastructure"
    r.font.bold = True
    r.font.size = Pt(16)
    r.font.color.rgb = C_PRIMARY

    p = tf7_t.add_paragraph()
    r = p.add_run()
    r.text = "SmartServe is architected not just as a single B2C app, but as a turnkey B2B White-Label Platform. Regional partners, corporate facility managers, and local franchise entrepreneurs deploy their own branded service marketplace with zero code rewrites."
    r.font.size = Pt(10.5)
    r.font.color.rgb = C_MUTED

    # 3 Franchise Cluster Cards (Side-by-side)
    clusters = [
        ("FRANCHISE A: GUJARAT CLUSTER", "Gujarat HomeCare Solutions", [
            "Branding: Custom Client Logo & Emerald Palette",
            "Language: Pure Gujarati ('ગુ') Interface Activated",
            "Catalog: 55 Beauty + 32 Deep Cleaning Services",
            "Pricing: Customized Surat & Ahmedabad Tier Rates",
            "SmartServe Engine: Manages dispatch, OTP & payments"
        ], C_PRIMARY),
        ("FRANCHISE B: DELHI NCR FACILITIES", "NCR Metro Facilities Portal", [
            "Branding: Enterprise Blue Theme & Corporate Domain",
            "Language: Dual Hindi & English Interface",
            "Catalog: 46 Appliance + 39 Electrical & Plumbing",
            "Pricing: Corporate B2B Facility Contract Tiers",
            "SmartServe Engine: Manages Kafka streaming & audit"
        ], C_ACCENT_BLUE),
        ("FRANCHISE C: QUICK-CHORE HUB", "ProntoFix Hyperlocal Services", [
            "Branding: High-Contrast Urban Gold Theme",
            "Language: Regional Dialect & Emergency Dispatch",
            "Catalog: 30-min Emergency Pipe Burst & Wiring",
            "Pricing: Real-time dynamic surge capped at +20%",
            "SmartServe Engine: Manages 30-min rolling slots"
        ], C_WARN_AMBER)
    ]

    for idx, (c_tag, c_name, c_bullets, c_theme) in enumerate(clusters):
        cx = Inches(0.8 + idx * 4.0)
        cw = Inches(3.75)
        add_card(s7, cx, Inches(3.2), cw, Inches(3.85), bg_color=C_CARD_BG, border_color=c_theme)
        
        tbox_c = s7.shapes.add_textbox(cx + Inches(0.15), Inches(3.35), cw - Inches(0.3), Inches(3.5))
        tf_c = tbox_c.text_frame
        tf_c.word_wrap = True

        p = tf_c.paragraphs[0]
        r = p.add_run()
        r.text = c_tag
        r.font.bold = True
        r.font.size = Pt(9.5)
        r.font.color.rgb = c_theme

        p = tf_c.add_paragraph()
        r = p.add_run()
        r.text = c_name
        r.font.bold = True
        r.font.size = Pt(13.5)
        r.font.color.rgb = C_DARK

        for b in c_bullets:
            p = tf_c.add_paragraph()
            p.space_before = Pt(4)
            r = p.add_run()
            r.text = f"• {b}"
            r.font.size = Pt(10)
            r.font.color.rgb = C_MUTED

    # ==================================================================
    # SLIDE 8: TECHNICAL VALIDATION & PRODUCTION STATUS
    # ==================================================================
    s8 = prs.slides.add_slide(blank_layout)
    set_slide_background(s8, C_LIGHT_BG)
    add_header(s8, "Technical Validation, System Metrics & Production Deliverables", "Verification & Delivery Audit", 8)

    # 4 Top KPI Cards
    kpis = [
        ("AUTOMATED TEST SUITE", "36 / 36 PASSED", "100% pytest pass rate in 7.92s", C_GREEN_LIVE),
        ("FRONTEND BUILDS", "0 ERRORS", "Clean Vite build in 5.73s across 3 portals", C_ACCENT_BLUE),
        ("CATALOG SCALE", "457 SERVICES", "Across 14 verified service categories", C_PRIMARY),
        ("ROLLING SUPPLY", "438 ACTIVE SLOTS", "18 verified providers across categories", C_SECONDARY),
    ]

    for idx, (k_tag, k_val, k_sub, k_color) in enumerate(kpis):
        kx = Inches(0.8 + idx * 3.0)
        kw = Inches(2.75)
        add_card(s8, kx, Inches(1.45), kw, Inches(1.4), bg_color=C_CARD_BG, border_color=k_color)
        
        tbox_k = s8.shapes.add_textbox(kx + Inches(0.12), Inches(1.52), kw - Inches(0.24), Inches(1.2))
        tf_k = tbox_k.text_frame
        tf_k.word_wrap = True

        p = tf_k.paragraphs[0]
        r = p.add_run()
        r.text = k_tag
        r.font.bold = True
        r.font.size = Pt(9.5)
        r.font.color.rgb = k_color

        p = tf_k.add_paragraph()
        r = p.add_run()
        r.text = k_val
        r.font.bold = True
        r.font.size = Pt(18)
        r.font.color.rgb = C_DARK

        p = tf_k.add_paragraph()
        r = p.add_run()
        r.text = k_sub
        r.font.size = Pt(9.5)
        r.font.color.rgb = C_MUTED

    # Bottom Terminal & Delivery Check-off Card
    add_card(s8, Inches(0.8), Inches(3.05), Inches(11.733), Inches(4.0))
    tbox8_b = s8.shapes.add_textbox(Inches(1.0), Inches(3.2), Inches(11.3), Inches(3.7))
    tf8_b = tbox8_b.text_frame
    tf8_b.word_wrap = True

    p = tf8_b.paragraphs[0]
    r = p.add_run()
    r.text = "LIVE SYSTEM STATUS & PRODUCTION DELIVERABLES"
    r.font.bold = True
    r.font.size = Pt(11)
    r.font.color.rgb = C_PRIMARY

    deliverables = [
        ("Backend REST & WebSocket Engine:", "FastAPI backend running live on Port 8000 (status: healthy, database: connected)."),
        ("Customer Web Portal:", "React + Vite application live on Port 5174 with multi-category catalog, 16-section Gujarati/Hindi views, and slot booking."),
        ("Provider Management Portal:", "React + Vite application live on Port 5175 with real-time assignment and booking workflow."),
        ("Operations & Admin Dashboard:", "React + Vite application live on Port 5173 with dispute management, catalog controls, and metrics."),
        ("Automated Regression Suite:", "36 test cases passing across COD OTP workflows, security controls, warranty policies, and caching benchmarks."),
        ("Git Repository State:", "Commit 8a247fb cleanly committed and pushed to origin/feat/smartserve-production-enhancements.")
    ]
    for d_title, d_desc in deliverables:
        p = tf8_b.add_paragraph()
        p.space_before = Pt(4)
        r1 = p.add_run()
        r1.text = f"✓ {d_title} "
        r1.font.bold = True
        r1.font.size = Pt(11)
        r1.font.color.rgb = C_DARK
        r2 = p.add_run()
        r2.text = d_desc
        r2.font.size = Pt(10.5)
        r2.font.color.rgb = C_MUTED

    p = tf8_b.add_paragraph()
    p.space_before = Pt(8)
    r = p.add_run()
    r.text = "Final Summary: Deliver what was promised — A mathematically grounded, localized hyperlocal service marketplace ready for live faculty demonstration."
    r.font.bold = True
    r.font.size = Pt(11)
    r.font.color.rgb = C_PRIMARY

    # Save presentation
    prs.save(OUTPUT_PPTX)
    print(f"Successfully generated PowerPoint presentation at:\n  {OUTPUT_PPTX}")

def export_to_pdf():
    try:
        import win32com.client
        import time

        powerpoint = win32com.client.Dispatch("PowerPoint.Application")
        powerpoint.Visible = 1

        deck = powerpoint.Presentations.Open(OUTPUT_PPTX)
        # 32 = ppSaveAsPDF
        deck.SaveAs(OUTPUT_PDF, 32)
        deck.Close()
        powerpoint.Quit()
        print(f"Successfully exported presentation to PDF via PowerPoint COM at:\n  {OUTPUT_PDF}")
    except Exception as e:
        print(f"Notice: PowerPoint COM export skipped/failed ({e}). PPTX is ready.")

def generate_latex_beamer():
    latex_content = r"""\documentclass[aspectratio=169,11pt]{beamer}

\usepackage[utf8]{inputenc}
\usepackage{xcolor}
\usepackage{tcolorbox}
\usepackage{booktabs}
\usepackage{tikz}
\usepackage{graphicx}

% Brand Color Definitions
\definecolor{SmartGreen}{RGB}{47, 82, 51}
\definecolor{SmartGold}{RGB}{201, 161, 90}
\definecolor{SmartDark}{RGB}{31, 42, 30}
\definecolor{SmartIvory}{RGB}{250, 247, 240}
\definecolor{SmartBlue}{RGB}{37, 99, 235}
\definecolor{SmartAlert}{RGB}{220, 38, 38}

\setbeamercolor{background canvas}{bg=SmartIvory}
\setbeamercolor{palette primary}{bg=SmartGreen,fg=white}
\setbeamercolor{structure}{fg=SmartGreen}
\setbeamercolor{title}{fg=SmartGreen}
\setbeamercolor{frametitle}{bg=SmartGreen,fg=white}

\setbeamertemplate{navigation symbols}{}
\setbeamertemplate{headline}{}

\setbeamertemplate{footline}{
  \leavevmode%
  \hbox{%
  \begin{beamercolorbox}[wd=\paperwidth,ht=2.5ex,dp=1ex,leftskip=1cm,rightskip=1cm]{palette primary}%
    \tiny \textbf{PDEU ICT MAJOR PROJECT 2026} \hfill \textbf{SmartServe: Hyperlocal Services Platform} \hfill Slide \insertframenumber{} of \inserttotalframenumber
  \end{beamercolorbox}}%
  \vskip0pt%
}

\title{\textbf{SmartServe}}
\subtitle{Production-Grade Hyperlocal Services Marketplace \& Multi-Tenant White-Label Engine}
\author{\textbf{Pushkar Kanjani (23BIT153) \& Aastha (23BIT095)}}
\institute{Department of Information \& Communication Technology \\ Pandit Deendayal Energy University (PDEU), Gandhinagar}
\date{Final B.Tech Project Evaluation $\bullet$ Academic Year 2026-2027}

\begin{document}

% SLIDE 1: TITLE SLIDE (WITH PDEU HEADER, CARDS, & MENTOR)
\begin{frame}[plain]
  \begin{tcolorbox}[colback=white,colframe=SmartGold,arc=4mm,width=\textwidth,height=0.92\textheight,halign=center]
    \vspace{0.1cm}
    {\scriptsize \textbf{\color{SmartDark}PANDIT DEENDAYAL ENERGY UNIVERSITY (PDEU)}}\\[0.04cm]
    {\tiny \textbf{\color{gray}DEPARTMENT OF INFORMATION AND COMMUNICATION TECHNOLOGY (ICT) $\bullet$ FINAL EVALUATION (2026-2027)}}\\[0.18cm]
    {\Large \textbf{\color{SmartGreen}SMARTSERVE: Intelligent Multi-Service Platform}}\\[0.08cm]
    {\small \textbf{\color{SmartDark}Hyperlocal On-Demand Services Marketplace \& Multi-Tenant White-Label Engine}}\\[0.12cm]
    {\tiny \color{gray} Real-Time Rolling Slot Protection $\bullet$ Two-Stage Cryptographic OTP $\bullet$ 457 Catalog Services $\bullet$ Trilingual (EN/GU/HI) $\bullet$ In-Memory Caching}\\[0.25cm]
    
    \begin{columns}[T]
      \begin{column}{0.31\textwidth}
        \begin{tcolorbox}[colback=blue!4,colframe=SmartGreen,arc=2mm,halign=left]
          {\footnotesize \textbf{\color{SmartGreen}PUSHKAR KANJANI}}\\[0.04cm]
          {\scriptsize \textbf{Roll:} \color{SmartGold!90!black}\textbf{23BIT153}}\\[0.04cm]
          {\tiny \color{gray}B.Tech ICT, PDEU (7th Sem)}
        \end{tcolorbox}
      \end{column}
      \begin{column}{0.31\textwidth}
        \begin{tcolorbox}[colback=blue!4,colframe=SmartGreen,arc=2mm,halign=left]
          {\footnotesize \textbf{\color{SmartGreen}AASTHA}}\\[0.04cm]
          {\scriptsize \textbf{Roll:} \color{SmartGold!90!black}\textbf{23BIT095}}\\[0.04cm]
          {\tiny \color{gray}B.Tech ICT, PDEU (7th Sem)}
        \end{tcolorbox}
      \end{column}
      \begin{column}{0.33\textwidth}
        \begin{tcolorbox}[colback=yellow!6,colframe=SmartGold,arc=2mm,halign=left]
          {\tiny \textbf{\color{SmartGold}PROJECT MENTOR:}}\\[0.04cm]
          {\footnotesize \textbf{\color{SmartGreen}Dr. Deepak Kumar Sharma}}\\[0.04cm]
          {\tiny \color{SmartDark}Asst. Professor, Dept. of ICT, SoT, PDEU}
        \end{tcolorbox}
      \end{column}
    \end{columns}
    
    \vspace{0.2cm}
    \begin{tcolorbox}[colback=green!8,colframe=SmartGreen!80,arc=2mm]
      {\scriptsize \textbf{\color{SmartGreen}FINAL EVALUATION MILESTONE STATUS (VERSION 1.0):} \color{SmartDark}100\% Production Ready $\bullet$ FastAPI Core Engine, 457 Catalog Services, Rolling Slot Protection, Two-Stage Cryptographic OTP, Trilingual Engine \& Regional White-Label Architecture Verified.}
    \end{tcolorbox}
  \end{tcolorbox}
\end{frame}

% SLIDE 2: INDUSTRY REALITY & COMPETITOR AUDIT
\begin{frame}{Market Reality: Operational Bottlenecks in Monopolistic Platforms}
\begin{columns}[T]
  \begin{column}{0.48\textwidth}
    \begin{tcolorbox}[colback=white,colframe=SmartAlert,arc=3mm,title=\textbf{\scriptsize INCUMBENT MONOPOLY DEFICIENCIES}]
      {\scriptsize \textbf{Urban Company \& Pronto Vulnerabilities:}}
      \begin{itemize}\setlength\itemsep{0.2em}
        \item \textbf{\tiny Algorithmic Bound (Greedy KNN):} Greedy matching bound $\le 50\%$ (Karp-Vazirani-Vazirani Theorem); 30-35\% unpaid deadhead partner travel.
        \item \textbf{\tiny Surge Price Gouging:} Up to 2.5x seasonal surge; 25-30\% commission sparking partner strikes.
        \item \textbf{\tiny Hardware Extortion:} ₹1,400 charged for ₹200 capacitor.
        \item \textbf{\tiny Single OTP Fraud:} Remote ghost completions; English-only barrier alienating 85\%+ regional users.
      \end{itemize}
    \end{tcolorbox}
  \end{column}
  \begin{column}{0.48\textwidth}
    \begin{tcolorbox}[colback=white,colframe=SmartGreen,arc=3mm,title=\textbf{\scriptsize SMARTSERVE COUNTERMEASURES}]
      {\scriptsize \textbf{Engineered Fairness \& Platform Trust:}}
      \begin{itemize}\setlength\itemsep{0.2em}
        \item \textbf{\tiny Batch Dispatch Optimization:} Formulated as bipartite matching minimizing commute fatigue.
        \item \textbf{\tiny Hard-Capped Transparent Surges:} Max +20\% surge limit and 10\% max discount displayed upfront.
        \item \textbf{\tiny Two-Stage Cryptographic OTP:} Start OTP (physical arrival) + Complete OTP (customer quality handover).
        \item \textbf{\tiny 100\% Native Localization:} Pure Gujarati and Hindi across 457 services with zero English leakage.
      \end{itemize}
    \end{tcolorbox}
  \end{column}
\end{columns}
\end{frame}

% SLIDE 3: SYSTEM ARCHITECTURE & CACHING
\begin{frame}{Distributed System Architecture \& In-Memory Cache Optimization}
\begin{columns}[T]
  \begin{column}{0.55\textwidth}
    \begin{tcolorbox}[colback=white,colframe=gray!40,arc=3mm]
      \centering
      \includegraphics[width=\textwidth,height=0.62\textheight,keepaspectratio]{assets/architecture_diagram.png}
    \end{tcolorbox}
  \end{column}
  \begin{column}{0.42\textwidth}
    \begin{tcolorbox}[colback=white,colframe=SmartGreen,arc=3mm,title=\textbf{\scriptsize VERIFIED TELEMETRY \& BENCHMARKS}]
      {\tiny \textbf{Test Suite: test\_performance\_benchmarks.py}}\\[0.15cm]
      \textbf{\scriptsize Cold DB Latency:} 85.4 ms \\
      \textbf{\scriptsize Warm Cache Latency:} \textbf{\color{SmartGreen}1.82 ms (-97.9\%)} \\
      \textbf{\scriptsize Cache Hit Ratio:} > 85.0\% concurrent \\[0.25cm]
      \hrule\vspace{0.2cm}
      {\scriptsize \textbf{Architecture Highlights:}}
      \begin{itemize}\setlength\itemsep{0.2em}
        \item \textbf{\tiny 4 Tiers:} 3 React Portals + FastAPI + Kafka + In-Memory Cache.
        \item \textbf{\tiny Kafka Resilience:} Automatic degraded mode; zero server crash during broker disconnects.
        \item \textbf{\tiny Invalidation:} Thread-safe prefix purge on service mutation.
      \end{itemize}
    \end{tcolorbox}
  \end{column}
\end{columns}
\end{frame}

% SLIDE 4: REAL-TIME OPERATIONAL DISPATCH & SLOTS
\begin{frame}{Real-Time Operational Workflows: Dynamic Dispatch \& Slot Protection}
\begin{columns}[T]
  \begin{column}{0.52\textwidth}
    \begin{tcolorbox}[colback=white,colframe=SmartGreen,arc=3mm,title=\textbf{\scriptsize REAL-TIME LEAD BUFFER \& DISPATCH ENFORCEMENT}]
      \begin{itemize}\setlength\itemsep{0.3em}
        \item \textbf{\scriptsize Dynamic 30-Minute Lead Buffer:} Booking at 11:15 PM dynamically strips elapsed daytime slots (10:30 AM, 02:00 PM, 10:30 PM).
        \item \textbf{\scriptsize Intelligent Automated Day-Roll:} Auto-advances date picker to Tomorrow with valid morning slots pre-selected.
        \item \textbf{\scriptsize Double-Lock Security:} Client-side real-time filter + Backend assertion in eligibility\_service.py rejecting past timestamps (HTTP 400).
        \item \textbf{\scriptsize 100\% Catalog Coverage (457/457):} All services mapped to verified specialists with active 7-day rolling calendar (438 slots).
      \end{itemize}
    \end{tcolorbox}
  \end{column}
  \begin{column}{0.45\textwidth}
    \begin{tcolorbox}[colback=white,colframe=gray!40,arc=3mm,title=\textbf{\scriptsize VERIFIED LIVE BOOKING MODAL}]
      \centering
      \includegraphics[width=\textwidth,height=0.62\textheight,keepaspectratio]{assets/booking_modal_crop.png}
    \end{tcolorbox}
  \end{column}
\end{columns}
\end{frame}

% SLIDE 5: TWO-STAGE OTP & PLATFORM INTEGRITY
\begin{frame}{Trust, Safety \& Financial Integrity: Two-Stage OTP \& Warranty Engine}
\begin{columns}[T]
  \begin{column}{0.45\textwidth}
    \begin{tcolorbox}[colback=white,colframe=SmartGreen,arc=3mm,title=\textbf{\scriptsize PLATFORM GOVERNANCE}]
      \begin{itemize}\setlength\itemsep{0.3em}
        \item \textbf{\scriptsize Two-Stage OTP Handshake:} \\
          - \textbf{Start OTP}: Physical presence confirmation; unlocks timer.\\
          - \textbf{Complete OTP}: Quality inspection handover authorization.
        \item \textbf{\scriptsize Reconciled COD Lifecycle:} \\
          Pending $\rightarrow$ Collected $\rightarrow$ Platform Reconciled.
        \item \textbf{\scriptsize 7--15 Day Warranty:} Automated warranty issuance; online claim resolution.
        \item \textbf{\scriptsize Transparent Pricing Ceilings:} Max +20\% surge cap; 10\% promotional discount cap.
      \end{itemize}
    \end{tcolorbox}
  \end{column}
  \begin{column}{0.52\textwidth}
    \begin{tcolorbox}[colback=white,colframe=gray!40,arc=3mm,title=\textbf{\scriptsize SEQUENCE SWIMLANE VERIFICATION}]
      \centering
      \includegraphics[width=\textwidth,height=0.62\textheight,keepaspectratio]{assets/sequence_swimlane.png}
    \end{tcolorbox}
  \end{column}
\end{columns}
\end{frame}

% SLIDE 6: TRILINGUAL LOCALIZATION
\begin{frame}{Zero English Leaks: Native Trilingual Hyperlocal Localization}
\begin{columns}[T]
  \begin{column}{0.48\textwidth}
    \begin{tcolorbox}[colback=white,colframe=SmartGreen,arc=3mm,title=\textbf{\scriptsize VERNACULAR INCLUSION ENGINE}]
      {\scriptsize \textbf{Zero English Leaks across 16 Structural Sections:}}
      \begin{itemize}\setlength\itemsep{0.15em}
        \item \textbf{\tiny Process Steps:} પ્રારંભિક મૂલ્યાંકન, તૈયારી અને સેટઅપ, મુખ્ય અમલીકરણ
        \item \textbf{\tiny Exclusions:} માળખાકીય મોટા ફેરફારો, સ્પેર હાર્ડવેર
        \item \textbf{\tiny Warranties:} કારીગરી પર 7 દિવસની સર્વિસ વૉરંટી
        \item \textbf{\tiny Badges:} મહત્તમ +20\%, 10\% સુધી
        \item \textbf{\tiny Aftercare \& Dos/Don'ts:} 100\% pure Gujarati/Hindi.
      \end{itemize}
      \vspace{0.1cm}
      {\tiny \textbf{Engine:} Dynamic pattern transliteration + dictionary normalizer with clean UTF-8 unicode rendering.}
    \end{tcolorbox}
  \end{column}
  \begin{column}{0.48\textwidth}
    \begin{tcolorbox}[colback=white,colframe=gray!40,arc=3mm,title=\textbf{\scriptsize LIVE GUJARATI SERVICE VIEW}]
      \centering
      \includegraphics[width=\textwidth,height=0.62\textheight,keepaspectratio]{assets/gujarati_service_crop.png}
    \end{tcolorbox}
  \end{column}
\end{columns}
\end{frame}

% SLIDE 7: B2B FRANCHISE WHITE-LABEL
\begin{frame}{The B2B Multi-Tenant White-Label Franchise Operating Engine}
\begin{tcolorbox}[colback=white,colframe=SmartGold,arc=3mm]
  {\scriptsize \textbf{\color{SmartGold}PLUG-AND-PLAY WHITE-LABEL PLATFORM AS A SERVICE}}\\[0.1cm]
  {\small \textbf{\color{SmartGreen}Turnkey Multi-Tenant Hyperlocal Infrastructure:}}
  {\scriptsize Regional franchise entrepreneurs deploy their own branded marketplace with custom branding, territory language, and local catalogs with zero code rewrites.}
\end{tcolorbox}
\vspace{0.2cm}
\begin{columns}[T]
  \begin{column}{0.31\textwidth}
    \begin{tcolorbox}[colback=white,colframe=SmartGreen,arc=3mm,title=\textbf{\tiny FRANCHISE A: GUJARAT CLUSTER}]
      {\tiny \textbf{Gujarat HomeCare Solutions}}
      \begin{itemize}\setlength\itemsep{0.15em}
        \item \textbf{\tiny Brand:} Custom Logo \& Theme
        \item \textbf{\tiny Lang:} Gujarati ('ગુ') Interface
        \item \textbf{\tiny Catalog:} 55 Beauty + 32 Cleaning
        \item \textbf{\tiny Pricing:} Ahmedabad/Surat Rates
      \end{itemize}
    \end{tcolorbox}
  \end{column}
  \begin{column}{0.31\textwidth}
    \begin{tcolorbox}[colback=white,colframe=SmartBlue,arc=3mm,title=\textbf{\tiny FRANCHISE B: DELHI NCR FACILITIES}]
      {\tiny \textbf{NCR Metro Facilities}}
      \begin{itemize}\setlength\itemsep{0.15em}
        \item \textbf{\tiny Brand:} Corporate Blue Theme
        \item \textbf{\tiny Lang:} Dual Hindi \& English
        \item \textbf{\tiny Catalog:} 46 AC + 39 Electrical
        \item \textbf{\tiny Pricing:} B2B Corporate Contracts
      \end{itemize}
    \end{tcolorbox}
  \end{column}
  \begin{column}{0.31\textwidth}
    \begin{tcolorbox}[colback=white,colframe=SmartGold,arc=3mm,title=\textbf{\tiny FRANCHISE C: QUICK-CHORE HUB}]
      {\tiny \textbf{ProntoFix Hyperlocal}}
      \begin{itemize}\setlength\itemsep{0.15em}
        \item \textbf{\tiny Brand:} Urban Gold Palette
        \item \textbf{\tiny Lang:} Regional Dialect
        \item \textbf{\tiny Catalog:} 30-min Emergency Repair
        \item \textbf{\tiny Pricing:} Dynamic +20\% cap
      \end{itemize}
    \end{tcolorbox}
  \end{column}
\end{columns}
\end{frame}

% SLIDE 8: TECHNICAL VALIDATION & PRODUCTION STATUS
\begin{frame}{Technical Validation, System Metrics \& Production Deliverables}
\begin{columns}[T]
  \begin{column}{0.23\textwidth}
    \begin{tcolorbox}[colback=white,colframe=SmartGreen,arc=2mm,halign=center]
      {\tiny \textbf{TEST SUITE}}\\[0.1cm]
      {\large \textbf{\color{SmartGreen}36 / 36}} \\
      {\tiny 100\% pytest pass in 7.92s}
    \end{tcolorbox}
  \end{column}
  \begin{column}{0.23\textwidth}
    \begin{tcolorbox}[colback=white,colframe=SmartBlue,arc=2mm,halign=center]
      {\tiny \textbf{FRONTEND BUILDS}}\\[0.1cm]
      {\large \textbf{\color{SmartBlue}0 ERRORS}} \\
      {\tiny Clean Vite build (5.73s)}
    \end{tcolorbox}
  \end{column}
  \begin{column}{0.23\textwidth}
    \begin{tcolorbox}[colback=white,colframe=SmartDark,arc=2mm,halign=center]
      {\tiny \textbf{CATALOG SCALE}}\\[0.1cm]
      {\large \textbf{\color{SmartDark}457 SERVICES}} \\
      {\tiny Across 14 Categories}
    \end{tcolorbox}
  \end{column}
  \begin{column}{0.23\textwidth}
    \begin{tcolorbox}[colback=white,colframe=SmartGold,arc=2mm,halign=center]
      {\tiny \textbf{ROLLING SLOTS}}\\[0.1cm]
      {\large \textbf{\color{SmartGold}438 SLOTS}} \\
      {\tiny 18 verified providers}
    \end{tcolorbox}
  \end{column}
\end{columns}
\vspace{0.3cm}
\begin{tcolorbox}[colback=white,colframe=SmartGreen,arc=3mm,title=\textbf{\scriptsize LIVE PRODUCTION DELIVERABLES SUMMARY}]
  \begin{itemize}\setlength\itemsep{0.2em}
    \item \textbf{\scriptsize Live Backend API:} FastAPI on Port 8000 (\texttt{\{"status":"healthy","database":"connected"\}}).
    \item \textbf{\scriptsize 3 Live React Portals:} Customer (:5174), Provider (:5175), Operations Admin (:5173).
    \item \textbf{\scriptsize Complete Git State:} Commit 8a247fb pushed to \texttt{origin/feat/smartserve-production-enhancements}.
    \item \textbf{\scriptsize Delivery Guarantee:} Deliver what was promised --- An enterprise-grade, localized hyperlocal marketplace.
  \end{itemize}
\end{tcolorbox}
\end{frame}

\end{document}
"""
    with open(OUTPUT_TEX, "w", encoding="utf-8") as f:
        f.write(latex_content)
    print(f"Successfully generated LaTeX Beamer source file at:\n  {OUTPUT_TEX}")

if __name__ == "__main__":
    create_presentation()
    export_to_pdf()
    generate_latex_beamer()

