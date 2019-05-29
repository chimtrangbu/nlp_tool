import os, re, io, json

for f in os.listdir("/home/minhanh/Desktop/news_dataset"):
    print(f)
    with io.open('/home/minhanh/Desktop/news_dataset/' + f, 'rb') as fo:
        text = fo.read().decode('utf-16')
        text = re.sub(r'[\.\?\!]+(?=[ \.])', ' . ', text)
        text = re.sub(r'[\:\,\;\"\-\…\“\”\(\)\/]', ' ', text)
        re.sub(r'[ \?\.\!\:\r\n]+(?=[ \?\.\!\:\r\n])', ' .\n', text)
        d = {"text": text.lower()}
    with io.open("../public/nlp_tool/files/" + f.replace('txt', 'json'), 'w') as fo:
        fo.write(json.dumps(d))