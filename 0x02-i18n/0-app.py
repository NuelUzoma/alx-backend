#!/usr/bin/env python3
"""Basic Flask App to render an HTML template"""


from flask import Flask, render_template
app = Flask(__name__)


@app.route('/', strict_slashes=False)
def first_route() -> str:
    """The first endpoint"""
    return render_template('index.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
