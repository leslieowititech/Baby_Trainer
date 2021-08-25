from .db import db


class Chart(db.Model):
    __tablename__ = 'charts'

    id = db.Column(db.Integer, primary_key=True)
    feed_id = db.Column(db.Integer)
    diaper_id = db.Column(db.Integer)
    sleep_id = db.Column(db.Integer)

    def to_dict(self):
        return {
            'id': self.id,
            'feed_id': self.feed_id,
            'diaper_id': self.diaper_id,
            'sleep_id': self.sleep_id
        }
