from app.models import Diaper, db, diaper
from flask import Blueprint, request
from app.forms import DiaperForm

diaper_routes = Blueprint('diapers', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@diaper_routes.route('/')
def get_all_diapers():
    diapers = Diaper.query.all()
    return {'diapers': [diaper.to_dict() for diaper in diapers]}

@diaper_routes.route('/<int:baby_id>/')
def get_all_diapers_for_specific_baby(baby_id):
    diapers = Diaper.query.filter(Diaper.baby_id == baby_id).all()
    return {'diapers': [diaper.to_dict() for diaper in diapers]}

@diaper_routes.route('/change/<int:id>')
def get_specific_diaper(id):
    diaper = Diaper.query.get(id)
    
    return diaper.to_dict()

@diaper_routes.route('/<int:id>', methods=['DELETE'])
def delete_a_specific_diaper(id):
    diaper = Diaper.query.get(id)

    db.session.delete(diaper)
    db.session.commit()
    return {'Diaper': 'record deleted'}


@diaper_routes.route('/create', methods=['POST'])
def create_a_diaper():
    form = DiaperForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        new_diaper = Diaper(
            type = data['type'],
            change_time = data['change_time'],
            user_id = data['user_id'],
            baby_id = data['baby_id']
        )

        db.session.add(new_diaper)
        db.session.commit()
        return new_diaper.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


@diaper_routes.route('/<int:id>', methods=['PUT'])
def edit_a_diaper(id):
    diaper_to_edit = Diaper.query.get(id)
    form = DiaperForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        diaper_to_edit.type = form.type.data
        diaper_to_edit.change_time = form.change_time.data
        diaper_to_edit.user_id = form.user_id.data
        diaper_to_edit.baby_id = form.baby_id.data


        db.session.add(diaper_to_edit)
        db.session.commit()

        return diaper_to_edit.to_dict()
 