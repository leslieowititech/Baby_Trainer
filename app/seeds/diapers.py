from app.models import db, Diaper

def seed_diapers():
    a = Diaper(
        type='pee', change_time='2017-09-05 09:45:28', user_id=1, baby_id=1
    )

    b = Diaper(
        type='pee', change_time='2017-09-05 12:45:28', user_id=1, baby_id=1
    )

    c = Diaper(
        type='poo', change_time='2017-09-05 18:45:28', user_id=1, baby_id=1
    )

    db.session.add(a)
    db.session.add(b)
    db.session.add(c)

    db.session.commit()


def undo_diapers():
    db.session.execute('TRUNCATE diapers RESTART IDENTITY CASCADE;')
    db.session.commit()
