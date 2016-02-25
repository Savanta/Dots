#!/usr/bin/python

import urllib
from xml.etree.cElementTree import parse
from datetime import datetime, timedelta
import os
from os.path import join
from sys import argv
try:
    import cPickle as pickle
except ImportError:
    import pickle

#Usage: yweather.py AYXX0001 Celsius

if len(argv) != 3:
    raise Exception('Usage: yweather.py zip_code units. zip_code is your city code in Yahoo Weather, units can be Celsius or Fahrenheit.')
else:
    zip_code = argv[1]
    if argv[2] == 'Fahrenheit' or argv[2] == 'fahrenheit':
        units = 'f'
    else:
        units = 'c'



CACHE_HOURS = 6

#http://weather.yahooapis.com/forecastrss
WEATHER_URL = 'http://xml.weather.yahoo.com/forecastrss?p=%s&u=%s'
WEATHER_NS = 'http://xml.weather.yahoo.com/ns/rss/1.0'

def weather_for_zip(zip_code, units):
    url = WEATHER_URL % (zip_code, units)
    rss = parse(urllib.urlopen(url)).getroot()
    forecasts = []
    for element in rss.findall('channel/item/{%s}forecast' % WEATHER_NS):
        forecasts.append(dict(element.items()))
    ycondition = rss.find('channel/item/{%s}condition' % WEATHER_NS)
    return {
        'current_condition': dict(ycondition.items()),
        'forecasts': forecasts,
        'title': rss.findtext('channel/title'),
        'pubDate': rss.findtext('channel/item/pubDate'), #rss.findtext('channel/lastBuildDate'),
        'location': dict(rss.find('channel/{%s}location' % WEATHER_NS).items()),
        'wind': dict(rss.find('channel/{%s}wind' % WEATHER_NS).items()),
        'atmosphere': dict(rss.find('channel/{%s}atmosphere' % WEATHER_NS).items()),
        'astronomy': dict(rss.find('channel/{%s}astronomy' % WEATHER_NS).items()),
        'units': dict(rss.find('channel/{%s}units' % WEATHER_NS).items())
    }

def print_openbox_pipe_menu(weather):
    print '<openbox_pipe_menu>'
    print '<separator label="%s %s" />' % (weather['location']['city'],weather['pubDate'])
    print '<separator label="Aktualne warunki" />'
    print '<item label="Pogoda: %s" />' % weather['current_condition']['text']
    print '<item label="Temperatura: %s %s" />' % ( weather['current_condition']['temp'],
                                          weather['units']['temperature'] )
    print '<item label="Wilgotnosc: %s%%" />' % weather['atmosphere']['humidity']
    print '<item label="Widocznosc: %s %s" />' % ( weather['atmosphere']['visibility'],
                                          weather['units']['distance'] )
    
    #pressure: steady (0), rising (1), or falling (2)
    if weather['atmosphere']['rising'] == 0:
        pressure_state = 'steady'
    elif weather['atmosphere']['rising'] == 1:
        pressure_state = 'rising'
    else:
        pressure_state = 'falling'
    print '<item label="Cisnienie: %s %s (%s)" />' % ( weather['atmosphere']['pressure'],
                                          weather['units']['pressure'], pressure_state )
    print '<item label="Temperatura odczuwalna: %s %s" />' % ( weather['wind']['chill'],
                                          weather['units']['temperature'] )
    print '<item label="Kierunek wiatru: %s degrees" />' % weather['wind']['direction']
    print '<item label="Predkosc wiatru: %s %s" />' % ( weather['wind']['speed'],
                                          weather['units']['speed'] )
    print '<item label="Wschod: %s" />' % weather['astronomy']['sunrise']
    print '<item label="Zachod: %s" />' % weather['astronomy']['sunset']
    for forecast in weather['forecasts']:
        print '<separator label="Pogoda: %s" />' % forecast['day']
        print '<item label="Pogoda: %s" />' % forecast['text']
        print '<item label="Minimalna temperatura: %s %s" />' % ( forecast['low'],
                                                weather['units']['temperature'] )
        print '<item label="Maksymalna temperatura: %s %s" />' % ( forecast['high'],
                                                weather['units']['temperature'] )
    print '</openbox_pipe_menu>'

cache_file = join(os.getenv("HOME"), '.yweather.cache')

try:
    f = open(cache_file,'rb')
    cache = pickle.load(f)
    f.close()
except IOError:
    cache = None

if cache == None or (zip_code, units) not in cache or (
        cache[(zip_code, units)]['date'] + timedelta(hours=CACHE_HOURS) < datetime.utcnow()):
    # The cache is outdated
    weather = weather_for_zip(zip_code, units)
    if cache == None:
        cache = dict()
    cache[(zip_code, units)] = {'date': datetime.utcnow(), 'weather': weather}
    
    #Save the data in the cache
    try:
        f = open(cache_file, 'wb')
        cache = pickle.dump(cache, f, -1)
        f.close()
    except IOError:
        raise
else:
    weather = cache[(zip_code, units)]['weather']


print_openbox_pipe_menu(weather)