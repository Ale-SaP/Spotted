import bleach as bleach

class Analysis():
    def __init__(self, data, view):
        self.data = data
        self.view = view
    
    def sanitization(self):
        cleanData = bleach.clean(text = (self.data), strip = True, strip_comments = True)
        cleanData = cleanData.strip(" ")
        if ( len(cleanData) < 60):
            return (True, (cleanData))
        else: return (False, "")