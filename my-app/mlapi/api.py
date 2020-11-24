from flask import Flask
from flask_cors import CORS
from flask import request
from flask import jsonify
import keras
import numpy as np
import datetime
import time
import math
import requests
model = keras.models.load_model('my_model') 
app = Flask(__name__)
CORS(app)

@app.route('/',methods=['GET'])
def api():
    return {
        'userid' : 1,
        'title': 'Flask React Application',
        'completed': False
    }

@app.route('/hello/', methods=['GET', 'POST'])
def hello_world():
    return 'Hello, World!'

@app.route('/predict/', methods=['GET','POST'])
def image_classifier():
    #r = requests.post('http://localhost:9000/v1/models/ImageClassifier:predict', json=payload)
    datarec  = request.args.to_dict()
    src=datarec['IN']
    tar=datarec['OUT']
    Current_Date = datetime.datetime.today()
    #print("gmt:-", gmt) 
    Previous_Date = datetime.datetime.today() - datetime.timedelta(days=7)
    # ts stores timestamp 
    no1 = str(math.ceil(time.mktime(Current_Date.timetuple())))
    no2 = str(math.ceil(time.mktime(Previous_Date.timetuple())))
    response = requests.get("https://finnhub.io/api/v1/forex/candle?symbol=OANDA:"+ src +"_"+ tar +"&resolution=D&from=" + no2 + "&to=" + no1 + "&token=bun19kv48v6pkdmogb80");
    d = response.json()
    data = []
    
    for i in range(3):
        high=d['h'][-i]
        close=d['c'][-i]
        open= d['o'][-i]
        low = d['l'][-i]
        candlestick_data = [0,0,0,0]
        if close > open:
            candle_type = 1
            wicks_up = high - close
            wicks_down = low - open
            body_size = close - open

        else:
            candle_type = 0
            wicks_up = high - open
            wicks_down = low - close
            body_size = open - close

        if wicks_up < 0:wicks_up=wicks_up*(-1)
        if wicks_down < 0:wicks_down=wicks_down*(-1)
        if body_size < 0:body_size=body_size*(-1)
        candlestick_data[0]=candle_type
        candlestick_data[1]=round(round(wicks_up,5)*10000,2)
        candlestick_data[2]=round(round(wicks_down,5)*10000,2)
        candlestick_data[3]=round(round(body_size,5)*10000,2)
        data.append(candlestick_data)
    # Making POST request
    #r = requests.post('http://localhost:9000/v1/models/ImageClassifier:predict', json=payload)
    x = model.predict(np.array([data]))
    return  jsonify(str(x[0][0]))
    

