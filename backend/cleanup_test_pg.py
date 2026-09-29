import psycopg2

def clean():
    conn = psycopg2.connect("postgresql://postgres:Aastha%401810@localhost:5432/smartserve")
    cur = conn.cursor()
    cur.execute("DELETE FROM bookings WHERE scheduled_time >= '2026-10-01';")
    cur.execute("DELETE FROM availability WHERE slot_date >= '2026-10-01';")
    conn.commit()
    conn.close()
    print("Cleaned up October 2026 test records successfully.")

if __name__ == "__main__":
    clean()
