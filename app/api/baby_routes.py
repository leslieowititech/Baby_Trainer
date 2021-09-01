from flask import Blueprint, redirect, request
from flask_login import current_user
from flask_login.utils import login_required
from app.models import Baby, db
from app.forms import BabyForm
from app.api.utils import validation_errors_to_error_messages

baby_routes = Blueprint('babies', __name__)

@baby_routes.route('/')
def get_all_babies():
    babies = Baby.query.all()
    return {'babies': [baby.to_dict() for baby in babies]}

@baby_routes.route('/<int:id>')
def get_single_baby(id):
    baby = Baby.query.get(id)
    return baby.to_dict()

@baby_routes.route('/<int:id>', methods=['PUT', 'DELETE'])
@login_required
def edit_a_baby(id):
    form = BabyForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    baby_to_update = Baby.query.get(id)
    # print(form.data, 'checking backend______________________________Here')
    if request.method == 'PUT':
        if form.validate_on_submit():
            if baby_to_update and (baby_to_update.user_id == current_user.id):                
                baby_to_update.name = form.name.data
                baby_to_update.birthday = form.birthday.data

                db.session.add(baby_to_update)
                db.session.commit()

                return baby_to_update.to_dict()
            return {'errors': 'Sorry something went wrong'}
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    elif request.method == 'DELETE':
        if baby_to_update and (baby_to_update.user_id == current_user.id):
            db.session.delete(baby_to_update)

            db.session.commit()
            return {'baby': 'Baby deleted' }
        return {'errors': 'Sorry 404 cant be found'}

@baby_routes.route('/create', methods=['POST'])
def create_a_baby():
    form = BabyForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        # print(data, 'data______CREATE')
        new_baby = Baby(
            name=data['name'],
            birthday=data['birthday'],
            user_id = current_user.id
        )

        db.session.add(new_baby)
        db.session.commit()

        return new_baby.to_dict()
    return 'Bad data'


