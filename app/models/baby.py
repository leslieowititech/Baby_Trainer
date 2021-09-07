from .db import db


class Baby(db.Model):
    __tablename__ = 'babies'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    birthday = db.Column(db.Date)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    feed_relationship = db.relationship('Feed', cascade="all, delete-orphan")
    diaper_relationship = db.relationship('Diaper', cascade="all, delete-orphan") 
    sleep_relationship = db.relationship('Sleep', cascade="all, delete-orphan")
    user_relationship = db.relationship('User', back_populates='baby_relationship', cascade="save-update")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'birthday': self.birthday,
            'user_id': self.user_id
        }
