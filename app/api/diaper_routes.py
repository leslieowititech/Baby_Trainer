from app.models import Diaper, db
from flask import Blueprint

diaper_routes = Blueprint('diapers', __name__)

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
