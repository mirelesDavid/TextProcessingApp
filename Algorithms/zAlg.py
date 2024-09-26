def getZ(string, z): 
    m = len(string)
    r,l,k = 0,0,0
    for i in range(1,m):
        if i > r: 
            l,r = i,i
            while r < m and string[r -l] == string[r]:
                r= r+1
            z[i] = r - l
            r = r -1
        else: 
            k = i - l 
            if z[k] < r - i + 1: 
                z[i] = z[k]
            else: 
                l = i 
                while r < m and string[r -l] == string[r]:
                    r = r+1
                z[i] = r - l
                r = r - 1


def search(text, pattern):
    concatString = pattern + "$" + text
    z = [0] * len(concatString)
    getZ(concatString, z)

    positions = []
    for i in range(len(pattern) + 1, len(concatString)):
        if z[i] == len(pattern): 
            positions.append(i - len(pattern) - 1)

    return positions


