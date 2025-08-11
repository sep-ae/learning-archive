import random
welcome_message = "WELCOME TO MY BOT"

print("************************")
print(f"***{welcome_message}***")
print("************************")


nama_user = input("masukkan nama anda : ")

print(f"halo {nama_user} goa berapa ")

while True:
    pilihan_user = int(input("tebak : "))
    konfirmasi_user = input("tekan y or n : ").lower()
    if konfirmasi_user == "y":
        break
    else:
        print("ganti")


jawaban = random.randint(1,2)

if pilihan_user == jawaban:
    print("benar")
else:
    print("salah")