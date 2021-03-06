from .db import db


class Sleep(db.Model):
    __tablename__ = 'sleep'

    id = db.Column(db.Integer, primary_key=True)
    sleep_time = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    baby_id = db.Column(db.Integer, db.ForeignKey('babies.id'), nullable=False)
    chart_relationship = db.relationship('Chart')

    def to_dict(self):
        return {
            'id': self.id,
            'sleep_time': self.sleep_time,
            'user_id': self.user_id,
            'baby_id': self.baby_id
        }
