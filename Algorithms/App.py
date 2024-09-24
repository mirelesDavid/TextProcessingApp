from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/manchesterAlg', methods=['POST'])
def manchester():
    try:
        return "App Created Succesful"
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
