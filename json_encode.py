

open("db_edit.json","wb").write(bytes(open("db.json").read(), encoding="utf8")
                                .decode("unicode_escape").encode("utf8"))


# with open('db.json', 'rb') as f:
#     data = f.read()
# newdata = open('db_edit.json', 'wb')
# newdata.write(data)
# newdata.close()

# import codecs
#
# encoded = codecs.open('db.json', 'r', 'utf-8').read().encode(
#             'ascii', 'backslashreplace')
# open('db_edit.json', 'w').write(encoded)