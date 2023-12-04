text_de_adaugat = "// Numele fișierului: {nume_fisier}\n"

nume_fisiere_js = ["ac.js", "ad.js", "ae.js"]  # Lista cu numele fișierelor .js

for nume_fisier in nume_fisiere_js:
    nume_fisier_fara_extensie = nume_fisier.split('.')[0]
    text_de_adaugat_formatat = text_de_adaugat.format(nume_fisier=nume_fisier_fara_extensie)
    
    with open(nume_fisier, 'a') as fisier_js:
        fisier_js.write(text_de_adaugat_formatat)

print("Numele fișierului a fost adăugat în fișierele .js.")