from app.models import db, Baby


# Adds a demo user, you can add other users here if you want
def seed_babies():
    demo_baby = Baby(
        name='Demo Baby', birthday='10/10/2020', user_id=1)
    cutie_pants = Baby(
        name='baby marnie', birthday='10/10/2018', user_id=1)
    handsome = Baby(
        name='baby bobbie', birthday='12/10/2021', user_id=2)

    db.session.add(demo_baby)
    db.session.add(cutie_pants)
    db.session.add(handsome)

    db.session.commit()

def undo_babies():
    db.session.execute('TRUNCATE babies RESTART IDENTITY CASCADE;')
    db.session.commit()
