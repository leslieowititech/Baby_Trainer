from .db import db


class Diaper(db.Model):
    __tablename__ = 'diapers'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(100), nullable=True)
    change_time = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, nullable=False)
    baby_id = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type,
            'change_time': self.change_time,
            'user_id': self.user_id,
            'baby_id': self.baby_id
        }
