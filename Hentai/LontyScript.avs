zvideo=LWLibavVideoSource("C:\Users\GigaByte\Desktop\yuruyuri.360p.mp4").ConvertFPS(24000,1001).Spline64Resize(1280,720)
zaudio=LWLibavAudioSource("C:\Users\GigaByte\Desktop\yuruyuri.360p.mp4").resampleaudio(48000)
zastavka=AudioDub(zvideo,zaudio)
a1=LWLibavVideoSource("C:\Users\GigaByte\Desktop\Garou.mp4").Spline64Resize(1280,720)
a2=LWLibavAudioSource("C:\Users\GigaByte\Desktop\Garou.wav")
Anime=AudioDub(a1,a2)
zastavka+Anime
