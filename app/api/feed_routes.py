from flask import Blueprint
from app.models import Feed,db

feed_routes = Blueprint('feeds', __name__)


@feed_routes.route('/')
def get_all_feeds():
    feeds = Feed.query.all()
    return {'feeds': [feed.to_dict() for feed in feeds]}