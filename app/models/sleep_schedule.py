from .db import db


class SleepSchedule(db.Model):
    __tablename__ = 'sleep_shedules'

    id = db.Column(db.Integer, primary_key=True)
    sleep_time = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, nullable=False)
    baby_id = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'sleep_time': self.sleep_time,
            'user_id': self.user_id,
            'baby_id': self.baby_id
        }
