def isDecimal(x):
        if ((x*10)%10 != 0):
            return True;
        else:
            return False


print(isDecimal(6.0))