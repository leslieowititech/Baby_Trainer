from .db import db


class Baby(db.Model):
    __tablename__ = 'babies'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    birthday = db.Column(db.Date)
    user_id = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'ame': self.name,
            'birthday': self.birthday,
            'user_id': self.user_id
        }
