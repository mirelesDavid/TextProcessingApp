class TrieNode:
    def __init__(self):
        self.children = {}
        self.endWord = False

class Trie:
    def __init__(self):
        self.root = TrieNode()
        self.result = []

    def insert(self, word: str) -> None:
        current = self.root
        for char in word:
            if char not in current.children:
                current.children[char] = TrieNode() 
            current = current.children[char]
        current.endWord = True                

    def startsWith(self, prefix: str) -> list:
        current = self.root
        self.result = []

        for char in prefix:
            if char not in current.children:
                return []
            current = current.children[char]

        self._findWordsFromNode(current, prefix)
        return self.result

    def _findWordsFromNode(self, node: TrieNode, prefix: str):
        if node.endWord:
            self.result.append(prefix)
        
        for char, child in node.children.items():
            self._findWordsFromNode(child, prefix + char)

trie = Trie()
trie.insert("guillermo")
trie.insert("guiso")
trie.insert("guille")

print(trie.startsWith("gui"))  
