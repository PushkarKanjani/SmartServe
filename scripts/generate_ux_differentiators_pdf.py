import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_header_footer(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_header_footer(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748B"))
        
        # Header (pages > 1)
        if self._pageNumber > 1:
            self.drawString(40, 755, "SmartServe: UX, Customer Engagement & Competitive Strategy")
            self.drawRightString(572, 755, "PDEU ICT | Minor Project Strategy")
            self.setStrokeColor(colors.HexColor("#CBD5E1"))
            self.setLineWidth(0.5)
            self.line(40, 748, 572, 748)
            
        # Footer
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(572, 25, page_text)
        self.drawString(40, 25, "Confidential - Department of ICT, PDEU | Pushkar Kanjani & Aastha")
        self.setStrokeColor(colors.HexColor("#CBD5E1"))
        self.setLineWidth(0.5)
        self.line(40, 35, 572, 35)
        self.restoreState()

def build_pdf(filename="docs/SMARTSERVE_UX_ENGAGEMENT_DIFFERENTIATORS.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=40,
        rightMargin=40,
        topMargin=55,
        bottomMargin=45
    )

    styles = getSampleStyleSheet()
    
    # Custom Palette
    PRIMARY = colors.HexColor("#0F172A")    # Deep Navy
    SECONDARY = colors.HexColor("#1E3A8A")  # Deep Blue
    ACCENT = colors.HexColor("#D97706")     # Amber / Gold
    EMERALD = colors.HexColor("#059669")    # Green / Trust
    BG_LIGHT = colors.HexColor("#F8FAFC")   # Slate 50
    CARD_BG = colors.HexColor("#F1F5F9")    # Slate 100
    TEXT_DARK = colors.HexColor("#1E293B")  # Slate 800
    MUTED = colors.HexColor("#475569")      # Slate 600
    BORDER_COLOR = colors.HexColor("#E2E8F0")

    # Typography styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=PRIMARY,
        spaceAfter=4
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=MUTED,
        spaceAfter=10
    )

    h1_style = ParagraphStyle(
        'Heading1_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=SECONDARY,
        spaceBefore=12,
        spaceAfter=6,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'Heading2_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=PRIMARY,
        spaceBefore=8,
        spaceAfter=3,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11.5,
        textColor=TEXT_DARK,
        spaceAfter=4
    )

    table_header = ParagraphStyle(
        'TH',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10,
        textColor=colors.white
    )

    table_cell = ParagraphStyle(
        'TC',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=10,
        textColor=TEXT_DARK
    )

    callout_style = ParagraphStyle(
        'Callout',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11.5,
        textColor=PRIMARY
    )

    story = []

    # Title Banner Block
    story.append(Paragraph("SmartServe: User Experience (UX), Engagement & Market Differentiation", title_style))
    story.append(Paragraph("<b>Candidates</b>: Pushkar Kanjani (23BIT153) & Aastha (23BIT095) | <b>B.Tech ICT (7th Semester)</b><br/><b>Institution</b>: Department of Information and Communication Technology, Pandit Deendayal Energy University (PDEU)", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=SECONDARY, spaceBefore=0, spaceAfter=8))

    # Executive Summary Card
    summary_data = [
        [
            Paragraph("<b>EXECUTIVE STRATEGY & PROBLEM DEFINITION</b><br/>"
                      "The fatal flaw of modern home service platforms (Urban Company, Pronto, TaskRabbit) is <b>low user engagement and retention</b>. "
                      "Customers only open the app in moments of acute domestic crisis (e.g., an AC breakdown in May or a flooded pipe). Once the technician leaves, the app is ignored for 6 to 12 months.<br/>"
                      "This document establishes <b>11 concrete, user-centric innovations</b> designed to eliminate consumer anxieties (spare parts extortion, stranger fatigue, safety concerns) "
                      "and build continuous engagement, community virality, and lifelong customer loyalty.", callout_style)
        ]
    ]
    t_summary = Table(summary_data, colWidths=[532])
    t_summary.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#EFF6FF")),
        ('BORDER', (0,0), (-1,-1), 1, colors.HexColor("#93C5FD")),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_summary)
    story.append(Spacer(1, 8))

    # Competitor Flaws Matrix
    story.append(Paragraph("1. Competitor Landscape & Everyday Friction Points", h1_style))
    comp_data = [
        [Paragraph("Platform", table_header), Paragraph("Market Model", table_header), Paragraph("Everyday Consumer Headaches & UX Bottlenecks", table_header)],
        [
            Paragraph("<b>Urban Company</b>", table_cell),
            Paragraph("Monopolistic scheduled services", table_cell),
            Paragraph("• Rigid 2-hour slots with high minimum cart values (₹499+).<br/>"
                      "• Assigns unknown strangers every visit; hides trusted favorite technicians.<br/>"
                      "• Rampant spare-parts overcharging by technicians and platform markup.", table_cell)
        ],
        [
            Paragraph("<b>Pronto / Snabbit</b>", table_cell),
            Paragraph("10-15m quick chores (dark stores)", table_cell),
            Paragraph("• Strictly restricted to simple cleaning/dishwashing tasks.<br/>"
                      "• Zero ability to handle skilled technical repairs (plumbing, electrical, AC).", table_cell)
        ],
        [
            Paragraph("<b>Yes Madam</b>", table_cell),
            Paragraph("At-home salon with BYOP", table_cell),
            Paragraph("• Niche vertical focus (cosmetics only); completely absent in home repairs.", table_cell)
        ],
        [
            Paragraph("<b>Justdial / Sulekha</b>", table_cell),
            Paragraph("Unvetted local directory listings", table_cell),
            Paragraph("• Chaotic pricing, unverified strangers, zero warranty, zero safety tracking.", table_cell)
        ]
    ]
    t_comp = Table(comp_data, colWidths=[100, 120, 312])
    t_comp.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, BG_LIGHT]),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_comp)
    story.append(Spacer(1, 10))

    # Section 2: 11 Features
    story.append(Paragraph("2. The 11 Core User Experience & Engagement Differentiators", h1_style))

    features_list = [
        (
            "1. SmartServe HomeCare Passport (Digital Health Card for Your Home)",
            "Everyday Problem: Nobody remembers when the RO water filter was replaced, what brand of gas was filled in the AC, or whether the water heater is under warranty. Receipts get lost.",
            "UX Solution: Every completed job automatically updates an appliance-centric digital passport, logging part serial numbers, technician notes, invoice receipts, and warranty countdown timers.",
            "Engagement Hook: The app stays installed permanently as a digital home asset tracker, sending timely maintenance alerts ('Your Kent RO filter is 11 months old; refresh cartridge before summer').",
            "Competitive Edge: Competitors only provide isolated receipts; SmartServe builds an ongoing asset history."
        ),
        (
            "2. 'Re-Book My Trusted Pro' with Distance-Based Surcharge",
            "Everyday Problem: You find an exceptional, honest electrician named Ramesh. Next time you book, Urban Company assigns a total stranger! Customers secretly exchange phone numbers to bypass the platform.",
            "UX Solution: Customers bookmark favorite technicians. When booking, they select Ramesh directly. If Ramesh is 7 km away, the app adds a transparent transit fee: ₹349 Base + ₹70 Travel = ₹419.",
            "Engagement Hook: Eliminates platform leakage. Technicians treat clients exceptionally well because they are building a loyal personal client base on the platform.",
            "Competitive Edge: Directly solves the platform disintermediation problem that Urban Company actively ignores."
        ),
        (
            "3. VoiceServe (1-Tap Multilingual Voice Booking)",
            "Everyday Problem: Non-English speakers and elderly parents get lost in 15 confusing nested menus ('Is a leaking cistern under Sanitary, Cistern, or Plumbing?').",
            "UX Solution: Press a mic and speak naturally in Hindi, Gujarati, or Hinglish: 'Hamare kitchen sink ke neeche se paani tapak raha hai'. App auto-selects Under-Sink Leakage Repair (₹299) instantly.",
            "Engagement Hook: Removes digital intimidation; expands addressable market to elderly parents and vernacular users.",
            "Competitive Edge: Neither Urban Company nor Pronto offers native conversational voice booking for regional languages."
        ),
        (
            "4. 'Snap & Diagnose' (5-Second Video Problem Scanner)",
            "Everyday Problem: Customers don't know technical terms and fear being scammed on arrival. If a switchboard makes a buzzing noise, they don't know if it costs ₹149 or ₹799.",
            "UX Solution: Record a 5-second video of the issue. App analyzes visual cues and displays an instant triage estimate: 'Loose terminal connector detected. Est. Price: ₹199. Technician brings tester and pliers.'",
            "Engagement Hook: Eliminates customer anxiety and intimidation before the technician even knocks on the door.",
            "Competitive Edge: Removes the intimidating catalog search, making service booking instantaneous."
        ),
        (
            "5. 'Society Group-Pool' (Apartment WhatsApp Bulk Discounts)",
            "Everyday Problem: In residential societies, 30 neighbors all need AC servicing in March. Each books separately, pays full price, and 10 technicians drive through the same gate on different days.",
            "UX Solution: Booking a service opens a 24-hr 'Society Pool' for the apartment complex. Customer shares 1-tap WhatsApp link: 'Join Saturday slot—if 3 more flats join, everyone gets 20% OFF!'",
            "Engagement Hook: Virality! Customers market the app to their real-life neighbors for free. Technician does 4 flats back-to-back.",
            "Competitive Edge: Turns high-density Indian apartment living into a collaborative viral growth engine."
        ),
        (
            "6. 'Before & After' Live Visual Satisfaction Slider",
            "Everyday Problem: Customers book deep cleaning while at work. When they return, they wonder: 'Did the cleaner actually use specialized chemicals, or did they just wipe with water?'",
            "UX Solution: Technicians capture mandatory high-res 'Before' and 'After' photos. Customer gets an interactive swipe slider on their phone to inspect the transformation before releasing payment.",
            "Engagement Hook: Instant visual satisfaction; highly shareable on WhatsApp/Instagram ('Look at my newly restored sofa!').",
            "Competitive Edge: Replaces blind trust with verifiable visual proof before customer approval."
        ),
        (
            "7. SmartServe 'Deposit Shield' (Tenant Move-In / Move-Out Condition Audit)",
            "Everyday Problem: Landlords routinely withhold ₹15,000 to ₹40,000 from tenant security deposits, claiming pre-existing cracks, stained tiles, or broken ACs were caused by the tenant.",
            "UX Solution: Certified technician performs a 30-point digital inspection upon move-in/move-out, generating a tamper-proof SmartServe Home Condition Certificate with date-stamped photo evidence.",
            "Engagement Hook: Saves tenants tens of thousands of rupees; captures repeat users on an ongoing 11-month rental cycle.",
            "Competitive Edge: Taps into the massive urban rental market that no other service marketplace currently addresses."
        ),
        (
            "8. 'QuickFix Video Assist' (₹49 10-Minute Live Video Triage)",
            "Everyday Problem: An MCB tripped, water valve is off, or router plug is loose. Paying ₹399 and waiting 2 hours for a technician to press one button feels like a waste. Yet people fear DIY electricals.",
            "UX Solution: Customer connects on a 1-on-1 video call with a master technician for ₹49. Technician inspects via camera and guides the fix. If an in-person visit is needed, the ₹49 is 100% credited!",
            "Engagement Hook: Solves emergency panics in 60 seconds; builds immense brand trust and converts casual visitors into loyal users.",
            "Competitive Edge: Lowers the barrier to entry from ₹499 to ₹49, converting casual visitors into paying customers."
        ),
        (
            "9. 'TrueCost Spare Parts Escrow' (In-App Barcode / MRP Scan)",
            "Everyday Problem: The #1 complaint in home repair: technicians charging ₹1,400 for a ₹200 capacitor. Urban Company also aggressively pushes high-margin proprietary parts.",
            "UX Solution: Technician scans the part's retail MRP barcode or tax invoice inside the app in front of the customer. Customer verifies store MRP and approves via 1-tap OTP with a flat ₹49 warranty fee.",
            "Engagement Hook: Eradicates the #1 source of customer distrust and anxiety in home repairs.",
            "Competitive Edge: Urban Company marks up parts; SmartServe guarantees 100% price transparency."
        ),
        (
            "10. 'The Household Task Stash' (Accumulate Nagging Chores into a Handyman Hour)",
            "Everyday Problem: Every home has 3 or 4 minor nagging defects (squeaky door, loose towel rod, flickering bulb). Nobody calls a carpenter just for one hinge because visiting fees are ₹299.",
            "UX Solution: In-app household to-do list ('Add to Stash'). Once 3-4 tasks accumulate, SmartServe bundles them into a 'Multi-Skill Handyman Hour' (₹349 for 60 mins of mixed fixes) in one visit.",
            "Engagement Hook: Users open the app weekly to maintain their household repair checklist.",
            "Competitive Edge: Eliminates multiple expensive minimum visit fees for minor household chores."
        ),
        (
            "11. 'Family SafePass' (Real-Time Safety Companion for Solo Living & Elderly)",
            "Everyday Problem: The primary hesitation for women living alone, working professionals away at the office, or elderly parents at home is personal safety: letting an unknown stranger inside.",
            "UX Solution: 1-tap 'SafePass' sends an encrypted live tracking link via WhatsApp to family members, showing the technician's police-verified ID photo, arrival GPS, and active job status with an emergency alert button.",
            "Engagement Hook: Turns safety anxiety into total peace of mind for families.",
            "Competitive Edge: Transforms home services from an intimidating transaction into a secure, family-trusted experience."
        )
    ]

    for title, problem, solution, engagement, edge in features_list:
        feat_block = []
        feat_block.append(Paragraph(f"<b>{title}</b>", h2_style))
        
        f_table_data = [
            [Paragraph("<b>Everyday Customer Headache</b>", table_header), Paragraph("<b>SmartServe UX Innovation & Solution</b>", table_header)],
            [Paragraph(problem, table_cell), Paragraph(solution, table_cell)],
            [Paragraph("<b>Engagement & Retention Hook:</b>", table_cell), Paragraph(f"<b>{engagement}</b>", table_cell)],
            [Paragraph("<b>Competitive Edge:</b>", table_cell), Paragraph(f"<i>{edge}</i>", table_cell)]
        ]
        t_feat = Table(f_table_data, colWidths=[180, 352])
        t_feat.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), SECONDARY),
            ('GRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('BACKGROUND', (0,1), (0,-1), BG_LIGHT),
            ('TOPPADDING', (0,0), (-1,-1), 4),
            ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ]))
        feat_block.append(t_feat)
        feat_block.append(Spacer(1, 6))
        story.append(KeepTogether(feat_block))

    story.append(PageBreak())

    # Section 3: The 4-Stage Journey
    story.append(Paragraph("3. The 4-Stage Customer Journey Architecture", h1_style))
    journey_data = [
        [Paragraph("Stage", table_header), Paragraph("Key Features Active", table_header), Paragraph("Core Customer Experience & Value Delivered", table_header)],
        [
            Paragraph("<b>1. Before Service</b><br/>(Zero Friction)", table_cell),
            Paragraph("• Snap & Diagnose<br/>• VoiceServe<br/>• QuickFix Video Assist", table_cell),
            Paragraph("Eliminates technical intimidation. Customers book in 10 seconds by video or regional voice without navigating complex menus.", table_cell)
        ],
        [
            Paragraph("<b>2. During Service</b><br/>(Trust & Safety)", table_cell),
            Paragraph("• Family SafePass<br/>• TrueCost Parts Escrow<br/>• Re-Book Trusted Pro", table_cell),
            Paragraph("Total peace of mind. Families track arrival in real time, and in-app barcode scanning kills spare parts extortion.", table_cell)
        ],
        [
            Paragraph("<b>3. After Service</b><br/>(Satisfaction & Proof)", table_cell),
            Paragraph("• Before & After Slider<br/>• HomeCare Passport Log", table_cell),
            Paragraph("Visual satisfaction proof before payment release. Service details, replaced parts, and warranties logged permanently.", table_cell)
        ],
        [
            Paragraph("<b>4. Long-Term Loyalty</b><br/>(Repeat Engagement)", table_cell),
            Paragraph("• Society Group-Pool<br/>• Household Task Stash<br/>• Deposit Shield Audit", table_cell),
            Paragraph("Drives weekly app opens and viral WhatsApp society sharing. Customers keep app installed as a home management hub.", table_cell)
        ]
    ]
    t_journey = Table(journey_data, colWidths=[95, 140, 297])
    t_journey.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, BG_LIGHT]),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(t_journey)
    story.append(Spacer(1, 12))

    # Section 4: Faculty Presentation Script
    story.append(Paragraph("4. Recommended Presentation Script for Panel Review", h1_style))
    defense_card = [
        [
            Paragraph("<b>Verbatim Presentation Script for Evaluation / Viva:</b><br/><br/>"
                      "<i>\"Respected Panel, we took your feedback to heart. Instead of relying on commodity features or abstract backend plumbing, SmartServe differentiates itself where it matters most: <b>real-world User Experience and high-frequency engagement</b>.<br/><br/>"
                      "Existing platforms like Urban Company and Pronto suffer from a fatal flaw: customers only open them once in 6 months during an emergency, and they constantly worry about being scammed on spare parts or assigned unknown strangers.<br/><br/>"
                      "SmartServe transforms this experience across the entire customer lifecycle:<br/>"
                      "1. <b>Frictionless Booking:</b> With <b>Snap & Diagnose</b> and <b>VoiceServe</b>, users simply take a 5-second video or speak in Hindi/Gujarati, completely skipping confusing technical catalogs.<br/>"
                      "2. <b>Total Financial & Physical Safety:</b> We eliminate spare part overcharging through <b>TrueCost Parts Escrow</b> with in-app barcode scanning, while <b>Family SafePass</b> gives elderly parents and solo residents complete peace of mind through live family tracking.<br/>"
                      "3. <b>Permanent Engagement & Virality:</b> Our <b>HomeCare Passport</b> keeps the app installed permanently as a digital health card for appliances, while <b>Society Group-Pool</b> lets apartment neighbors get 20% bulk discounts by pooling weekend maintenance slots on WhatsApp.<br/><br/>"
                      "This makes SmartServe a platform that everyday households genuinely trust, love, and use regularly.\"</i>", callout_style)
        ]
    ]
    t_def = Table(defense_card, colWidths=[532])
    t_def.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FEF3C7")),
        ('BORDER', (0,0), (-1,-1), 1, colors.HexColor("#F59E0B")),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(t_def)

    # Build Document
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated UX PDF: {filename}")

if __name__ == '__main__':
    build_pdf()
