from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)


# Test page
@app.route("/", methods=['GET'])
def hello_world():
    return jsonify(
        message="Success",
        warning="Hello world",
        status=200)


# Get exact block
@app.route("/api/block/<block_num>", methods=['GET'])
def get_block(block_num):
    request_data = dict(jsonrpc="2.0", method="eth_getBlockByNumber", params=[block_num, True], id=1)
    r = requests.post('https://cloudflare-eth.com', json=request_data)
    r_data = r.json()

    return r_data
