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
import pandas as pd
import io
from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential
from keras.layers import Dense, Dropout, LSTM
import tensorflow

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
    model = keras.models.load_model('my_model') 
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

@app.route('/predict2/', methods=['GET','POST'])
def date_ml():
    model = keras.models.load_model('my_model2')
    datarec  = request.args.to_dict()
    src=datarec['IN']
    tar=datarec['OUT']
    Current_Date = datetime.datetime.today()
    #print("gmt:-", gmt) 
    #Previous_Date = datetime.datetime.today() - datetime.timedelta(days=1200)
    # ts stores timestamp 
    no1 = str(math.ceil(time.mktime(Current_Date.timetuple())))
    #no2 = str(math.ceil(time.mktime(Previous_Date.timetuple())))
    download = requests.get("https://finnhub.io/api/v1/forex/candle?symbol=OANDA:"+ src +"_"+ tar +"&resolution=D&from=1480032000" + "&to=" + no1 + "&token=bun19kv48v6pkdmogb80&format=csv");
    #download = requests.get('https://finnhub.io/api/v1/forex/candle?symbol=OANDA:EUR_USD&resolution=D&from=1480032000&to=1606262400&token=bun3n7748v6ubkqm42hg&format=csv')
    df = pd.read_csv(io.StringIO(download.text))
    # df['tt'] = pd.to_datetime(df['t']*1000, unit='ms').apply(lambda x: x.to_datetime64())
    # df['Date'] = pd.to_datetime(df.tt,format='%Y-%m-%d')
    # df['Date'] = pd.to_datetime(df['Date']).dt.date
    data = df.sort_index(ascending=True, axis=0)
    # print(data)
    new_data = pd.DataFrame(index=range(0,len(df)),columns=[ 'c'])
    i = 0
    new_data.drop([ i for i in range(0,len(data)-60)], inplace = True)
    
    for i in range(len(data) - 60,len(data)):
        #new_data['Date'][i] = data['Date'][i]
        new_data['c'][i] = data['c'][i]

    print(new_data)
    print(len(new_data))
    #return jsonify(str(new_data[:61]))
    # new_data.index = new_data.Date
    # new_data.drop('Date', axis=1, inplace=True) 
    scaler = MinMaxScaler(feature_range=(0, 1))

    inputs = new_data.values
    #return jsonify(str(inputs))
    inputs = inputs.reshape(-1,1)
    inputs  = scaler.fit_transform(inputs)

    for i in range(60):
        X_test = []
        X_test.append(inputs)
        X_test = np.array(X_test)
        closing_price1 = model.predict(X_test)
        inputs = np.append(np.delete(inputs, [0]),closing_price1)
        inputs = inputs.reshape(-1,1)
    inputs = scaler.inverse_transform(inputs)
    inputa = inputs.tolist()
    t = {"Array" : inputa}
    return jsonify(t)

