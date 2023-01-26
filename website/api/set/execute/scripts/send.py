#!/usr/bin/python
import sys
import serial

ser = serial.Serial('/dev/ttyUSB0',115200)

if len(sys.argv)>1:
	command = (sys.argv[1]+'\n').encode('utf_8')
	ser.write(command)
	#ser.write(command.encode('utf_8')
	print(command, end='')

ser.close()
