from flask import Flask, request, jsonify
from manacherAlg import findLongestPalindromeWithMapping
from longestCommonSubStringAlg import getLongestCommonSubString
from zAlg import search
from trieAlg import Trie

app = Flask(__name__)

#Z ALG
@app.route('/zAlg', methods=['POST'])
def zAlg():
    try:
        data = request.get_json()
        text = data.get('text', '')
        pattern = data.get('pattern', '')
        positions = search(text, pattern)

        return jsonify({"positions": positions})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

#TRIE ALG
trie = Trie()
@app.route('/insertText', methods=['POST'])
def insert_text():
    try:
        data = request.get_json()
        text = data.get('text', '')

        if not text:
            return jsonify({"error": "No text provided"}), 400
        
        words = text.split()
        for word in words:
            trie.insert(word)

        return jsonify({"message": "Words inserted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/trieAlg', methods=['POST'])
def trie_alg():
    try:
        data = request.get_json()
        prefix = data.get('prefix', '')
        suggestions = trie.startsWith(prefix)
        return jsonify({"suggestions": suggestions})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

#MANACHER
@app.route('/manchesterAlg', methods=['POST'])
def manchester_alg():
    try:
        data = request.get_json()
        text = data.get('text', '')

        start_index, end_index = findLongestPalindromeWithMapping(text)

        return jsonify({"startIndex": start_index, "endIndex": end_index})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


#LONGEST COMMON SUBSTRING
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
