def findLongestPalindromeWithMapping(inputString):
    normalizedString, indexMapping = preprocessTextWithMapping(inputString)

    processedString = '#' + '#'.join(normalizedString) + '#'
    length = len(processedString)
    palindromeLengths = [0] * length
    center = 0
    rightBoundary = 0
    maxLength = 0
    centerIndex = 0

    for i in range(length):
        mirrorIndex = 2 * center - i
        if i < rightBoundary:
            palindromeLengths[i] = min(rightBoundary - i, palindromeLengths[mirrorIndex])

        while (i + palindromeLengths[i] + 1 < length and 
               i - palindromeLengths[i] - 1 >= 0 and 
               processedString[i + palindromeLengths[i] + 1] == processedString[i - palindromeLengths[i] - 1]):
            palindromeLengths[i] += 1

        if i + palindromeLengths[i] > rightBoundary:
            center = i
            rightBoundary = i + palindromeLengths[i]

        if palindromeLengths[i] > maxLength:
            maxLength = palindromeLengths[i]
            centerIndex = i

    startIndex = (centerIndex - maxLength) // 2
    endIndex = startIndex + maxLength - 1

    originalStartIndex = indexMapping[startIndex]
    originalEndIndex = indexMapping[endIndex]

    return originalStartIndex, originalEndIndex


def preprocessTextWithMapping(inputString):
    normalizedString = ''
    indexMapping = []

    for i, char in enumerate(inputString):
        if char.isalnum():
            normalizedString += char.lower()
            indexMapping.append(i)

    return normalizedString, indexMapping
