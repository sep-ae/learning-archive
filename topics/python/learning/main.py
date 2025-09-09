import random
from libs import welcome

welcome()

nama_user = input("Masukkan nama anda : ")
print(f"Halo {nama_user}, tebak berapa")

jawaban_list = [1, 2, 3, 4]
jawaban = random.randint(1, 4)

while True:
    try:
        pilihan_user = int(input("Tebak Angka : "))
    except ValueError:
        print("Masukkan angka saja!")
        continue
    
    if pilihan_user not in jawaban_list:
        print(f"Angka harus salah satu dari {jawaban_list}")
        continue
    
    konfirmasi_user = input("Yakin? (y/n): ").lower()
    if konfirmasi_user != "y":
        print("Oke, silakan ganti tebakan.")
        continue
    
    if pilihan_user == jawaban:
        print("Selamat Anda Benar")
    else:
        print(f"Anda Kalah wkwkwk, jawabannya {jawaban}")
    break
