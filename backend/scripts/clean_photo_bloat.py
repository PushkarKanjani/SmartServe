import os, psycopg2, json
from urllib.parse import urlparse, unquote
from dotenv import load_dotenv

load_dotenv('backend/.env')
p = urlparse(os.getenv('DATABASE_URL'))
conn = psycopg2.connect(
    dbname=p.path.lstrip('/'),
    user=unquote(p.username),
    password=unquote(p.password),
    host=p.hostname,
    port=p.port or 5432
)
cur = conn.cursor()

# Lightweight professional service proof photo placeholders
SAMPLE_BEFORE = "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80"
SAMPLE_AFTER = "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=400&q=80"

cur.execute("""
    SELECT id, before_photos, after_photos, timeline 
    FROM bookings 
    WHERE length(coalesce(before_photos::text, '')) > 500 
       OR length(coalesce(after_photos::text, '')) > 500
       OR length(coalesce(timeline::text, '')) > 1000;
""")
rows = cur.fetchall()
print(f"Found {len(rows)} bookings to sanitize.")

for r in rows:
    bid, bp, ap, tl = r[0], r[1] or [], r[2] or [], r[3] or []
    
    clean_bp = []
    for item in bp:
        if isinstance(item, str) and (item.startswith("data:image") or len(item) > 500):
            clean_bp.append(SAMPLE_BEFORE)
        else:
            clean_bp.append(item)
            
    clean_ap = []
    for item in ap:
        if isinstance(item, str) and (item.startswith("data:image") or len(item) > 500):
            clean_ap.append(SAMPLE_AFTER)
        else:
            clean_ap.append(item)
            
    # Sanitize timeline
    clean_tl = []
    for ev in tl:
        if isinstance(ev, dict):
            ev_copy = dict(ev)
            p_url = ev_copy.get("photo_url")
            if p_url and (str(p_url).startswith("data:image") or len(str(p_url)) > 500):
                ev_copy["photo_url"] = SAMPLE_AFTER
            clean_tl.append(ev_copy)
        else:
            clean_tl.append(ev)

    print(f"Updating booking {bid}:")
    print(f"  BP: {len(bp)} -> {len(clean_bp)}")
    print(f"  AP: {len(ap)} -> {len(clean_ap)}")
    
    cur.execute(
        """
        UPDATE bookings 
        SET before_photos = %s::json, 
            after_photos = %s::json, 
            timeline = %s::json 
        WHERE id = %s;
        """,
        (json.dumps(clean_bp), json.dumps(clean_ap), json.dumps(clean_tl), bid)
    )

conn.commit()
print("Database sanitization committed successfully!")

cur.close()
conn.close()
