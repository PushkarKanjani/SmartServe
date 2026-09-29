import sys
from datetime import date

sys.path.insert(0, '.')

from app.repositories.db import get_db
from app.models.booking import Booking
from app.models.provider import Availability
from app.models.support import SupportTicket, TicketMessage

def clean():
    db = next(get_db())
    # Delete test messages and support tickets
    db.query(TicketMessage).filter(TicketMessage.message_text.like('%E2E_KAFKA%')).delete(synchronize_session=False)
    test_tickets = db.query(SupportTicket).filter(
        (SupportTicket.subject.like('%E2E_KAFKA%')) | 
        (SupportTicket.description.like('%E2E_KAFKA%'))
    ).all()
    for t in test_tickets:
        db.delete(t)
    
    # Delete test bookings
    db.query(Booking).filter(
        (Booking.address.like('%Bellandur%')) | 
        (Booking.address.like('%Whitefield%'))
    ).delete(synchronize_session=False)

    # Reset availability slots to FREE
    db.query(Availability).filter(Availability.slot_date >= date.today()).update({'status': 'FREE'})
    db.commit()
    print("Cleaned")

if __name__ == '__main__':
    clean()
