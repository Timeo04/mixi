#!/usr/bin/env python
import sys
import serial

print(str(sys.argv))
try:
	ser = serial.Serial('/dev/ttyUSB0',115200)
	#ser.close()
except Exception as e:
	print("an error occured")
	print(e)

print("Hello")
