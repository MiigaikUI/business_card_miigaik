class WrapperMap:
    def __init__(self, d: dict):
        self.d = d

    def get_value(self):
        return self.d

    def __getattr__(self, item: str):
        return self.__class__(self.d.get(item))

    def __repr__(self):
        return repr(self.d)