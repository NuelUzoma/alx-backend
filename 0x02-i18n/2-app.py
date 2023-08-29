#!/usr/bin/python3
"""Instantiate the Babel object in your app.
Store it in a module-level variable named babel"""


from flask_babel import Babel
from flask import Flask, render_template, request
app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)


class Config:
    """The class instantiating for Babel"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


@babel.localeselector
def get_locale():
    """Get the best locale"""
    return request.accept_languages.best_match(app.config["LANGUAGES"])


@app.route('/', strict_slashes=False)
def first_route():
    """The flask app endpoint"""
    return render_template('2-index.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)