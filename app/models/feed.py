from .db import db
from sqlalchemy.ext.declarative import declarative_base
import datetime

Base = declarative_base()


class Feed(db.Model, Base):
    __tablename__ = 'feeds'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(100), nullable=False)
    feed_time = db.Column(db.DateTime, nullable=False)
    amount = db.Column(db.Float)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    baby_id = db.Column(db.Integer, db.ForeignKey('babies.id'), nullable=False)
    chart_relationship = db.relationship('Chart')

    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type,
            'amount': self.amount,
            'user_id': self.user_id,
            'baby_id': self.baby_id,
            'feed_time': self.feed_time
        }
