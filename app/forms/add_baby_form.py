from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField, DateField
from wtforms.validators import DataRequired, ValidationError
from app.models import Baby


def baby_exists(form, field):
    # Checking if user exists
    name = field.data
    baby = Baby.query.filter(Baby.name == name).first()
    if baby:
        raise ValidationError('Baby name already exists')

class  BabyForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), baby_exists])
    birthday = DateField('birthday', validators=[DataRequired()])
