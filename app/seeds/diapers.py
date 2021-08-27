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

    d = Diaper(
        type='poo', change_time='2016-08-12 18:45:28', user_id=1, baby_id=3
    )

    f = Diaper(
        type='pee', change_time='2016-03-11 18:05:28', user_id=1, baby_id=3
    )

    e = Diaper(
        type='pee', change_time='2016-03-11 18:05:28', user_id=1, baby_id=2
    )

    db.session.add(a)
    db.session.add(b)
    db.session.add(c)
    db.session.add(d)
    db.session.add(e)
    db.session.add(f)



    db.session.commit()


def undo_diapers():
    db.session.execute('TRUNCATE diapers RESTART IDENTITY CASCADE;')
    db.session.commit()
