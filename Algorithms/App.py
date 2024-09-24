from flask import Flask, request, jsonify
from manacherAlg import findLongestPalindrome

app = Flask(__name__)

@app.route('/manchesterAlg', methods=['POST'])
def manchesterAlg():
    try:
        data = request.get_json()
        text = data.get('text', '')

        startIndex, endIndex = findLongestPalindrome(text)

        return jsonify({"startIndex": startIndex, "endIndex": endIndex})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
