from app.models import db, Feed

def seed_feeds():
    a = Feed(
        type='bottle',
        feed_time='2017-09-05 09:45:28',
        amount=4,
        user_id=1,
        baby_id=1
    )

    b = Feed(
        type='breast',
        feed_time='2017-09-05 19:45:28',
        amount=2,
        user_id=2,
        baby_id=1
    )

    c = Feed(
        type='breast',
        feed_time='2016-09-05 10:35:28',
        amount=2,
        user_id=1,
        baby_id=2
    )

    d = Feed(
        type='breast',
        feed_time='2016-09-05 10:35:28',
        amount=8,
        user_id=3,
        baby_id=2
    )

    db.session.add(a)
    db.session.add(b)
    db.session.add(c)
    db.session.add(d)

    db.session.commit()


def undo_feeds():
    db.session.execute('TRUNCATE feeds RESTART IDENTITY CASCADE;')
    db.session.commit()
