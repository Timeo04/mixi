#!/usr/bin/python
import sys
import serial

ser = serial.Serial('/dev/ttyUSB0',115200)

#if len(sys.argv)>1:
#	if sys.argv[1] == 'on':
#		ser.write(b'on\n')
#		print('on sent', end='')
#	elif sys.argv[1] == 'off':
#		ser.write(b'off\n')
#		print('off sent', end='')

if len(sys.argv)>1:
	command = ('led_'+sys.argv[1]+'\n').encode('utf_8')
	ser.write(command)
	#ser.write(command.encode('utf_8')
	print(command, end='')

ser.close()
