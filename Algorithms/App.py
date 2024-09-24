from flask import Flask, request, jsonify
from manacherAlg import findLongestPalindrome
from longestCommonSubStringAlg import getLongestCommonSubString

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


@app.route('/longestCommonSubString', methods=['POST'])
def longestCommonSubStringAlg():
    try:
        data = request.get_json()
        text1 = data.get('text1', '')
        text2 = data.get('text2', '')

        subStrings = getLongestCommonSubString(text1, text2)
        
        substringCoordinates1 = [{'start': subString[0][0], 'end': subString[0][1]} for subString in subStrings]
        substringCoordinates2 = [{'start': subString[1][0], 'end': subString[1][1]} for subString in subStrings]

        return jsonify({
            "substringCoordinates1": substringCoordinates1,
            "substringCoordinates2": substringCoordinates2
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)
