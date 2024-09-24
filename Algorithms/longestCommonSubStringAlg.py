def getLongestCommonSubString(text1, text2):
    matrix = createMatrix(text1, text2)
    maxSubString, maxSubStringCord = 0, []
    
    for i in range(1, len(text1) + 1):
        for j in range(1, len(text2) + 1):
            if text1[i - 1] == text2[j - 1]:
                matrix[i][j] = matrix[i - 1][j - 1] + 1
                if matrix[i][j] == maxSubString:
                    maxSubStringCord.append((i, j))
                elif matrix[i][j] > maxSubString:
                    maxSubString = matrix[i][j]
                    maxSubStringCord = [(i, j)]
                    
    subStrings = []
    
    
    for finalIdx, finalJdx in maxSubStringCord:
        initialIdx = finalIdx - maxSubString 
        initialJdx = finalJdx - maxSubString 
        subStrings.append(((initialIdx, finalIdx - 1), (initialJdx, finalJdx -1)))

    return subStrings

def createMatrix(text1, text2):
    matrix = [[0 for _ in range(len(text2) + 1)] for _ in range(len(text1) + 1)]
    return matrix

