from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField
from wtforms.validators import DataRequired

class  BabyForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    birthday = DateTimeField('birthday', validators=[DataRequired()])