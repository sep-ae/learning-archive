from playwright.sync_api import sync_playwright
import random
import string

def generate_name():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=8))

def generate_email():
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=8)) + "@gmail.com"

def generate_password():
    return "Aa1!" + ''.join(random.choices(string.ascii_letters + string.digits, k=5))

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    # Buka halaman register
    page.goto("https://course.siberexpert.com/register")

    # Generate data
    name = generate_name()
    email = generate_email()
    password = generate_password()

    # Isi form
    page.fill('input[name="name"]', name)
    page.fill('input[name="email"]', email)
    page.fill('input[name="password"]', password)
    page.fill('input[name="password_confirmation"]', password)

    # Submit
    page.click('button[type="submit"]')

    page.wait_for_timeout(5000)  # tunggu proses

    html = page.content()
    if "Dashboard" in html:
        print(f"[+] Berhasil daftar: {name} | {email} | {password}")
    else:
        print("[-] Gagal daftar. Cek validasi.")

    browser.close()
