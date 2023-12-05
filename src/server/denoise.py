import IPython
from scipy.io import wavfile
from scipy.io.wavfile import write
import sys
import scipy.signal
import matplotlib.pyplot as plt
import librosa
import numpy as np
import noisereduce as nr

print("yes")

file = sys.argv[1]
sr = 16000
# Load audio file
y1,sr = librosa.load(file, mono=True)
#Load noise file
noise1, sr = librosa.load("storage/noise.wav", mono=False, sr=sr, offset=0, duration=60)

# Reduce the noise on the audio file, using the noise file
yg1 = nr.reduce_noise(y=y1, y_noise=noise1, sr=sr)

# Write the new file to storage.
temp_file_path = '/storage/modified_audio.mp3'
modified_audio.export(temp_file_path, format='mp3')

# Return path of temporary file to ExpressJS server
print(temp_file_path)