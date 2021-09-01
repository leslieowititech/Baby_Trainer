from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField
from wtforms import validators
from wtforms.validators import DataRequired, ValidationError


class FeedForm(FlaskForm):
    type = StringField('type', validators=[DataRequired()])
    feed_time = DateField('feed_time', validators=[DataRequired()])
    amount= IntegerField('amount')
    user_id = IntegerField('user_id', validators=[DataRequired()])
    baby_id = IntegerField('baby_id', validators=[DataRequired()])