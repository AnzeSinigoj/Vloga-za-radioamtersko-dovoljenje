/*
ime var = ime id
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Osnovno:
ime = ime
priimek = priimek
davcna = davcnaST
tel = telefonska
email = mail
ulica = ulica_hisna_st
mesto = mesto
posta = postnaST
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Izdaja:
datumIzpita = dat
kz1 = k1
kz2 = k2
kz3 = k3
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Podalsanje:
kzPodal = k_pod
datumIzdaje = dat_izdaje
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Vracilo:
kzVracila = vrac_kz
datVracKz = dat_vrac_kz
kzV1 = nk1
kzV2 = nk2
kzV3 = nk3
raz = razlog <- textarea!
*/

const ime = document.getElementById("ime");
const priimek = document.getElementById("priimek");
const davcna = document.getElementById("davcnaST");
const tel = document.getElementById("telefonska");
const email = document.getElementById("mail");
const ulica = document.getElementById("ulica_hisna_st");
const mesto = document.getElementById("mesto");
const posta = document.getElementById("postnaST");


document.getElementById('dejanska_forma').addEventListener('submit', function(event) {
    const ime_V = ime.value.trim();
    const priimek_V = priimek.value.trim();
    const davcna_V = davcna.value.trim();
    const tel_V = tel.value.trim();
    const ulica_V = ulica.value.trim();
    const mesto_V = mesto.value.trim();
    const posta_V= posta.value.trim();

    if (!imeValue || !priimekValue || !davcnaValue || !ulicaValue || !mestoValue || !postaValue) {
        event.preventDefault();
        alert('Vse oznacena polja so obvezna!');
        return;
    }
});

//davcna (SI85218521)
davcna.addEventListener("input", function (event) {

    let vr = davcna.value.replace(/\D/g, ''); // \D vse kar ni stevilo odreze, velja skozi celotn string -> g, / -zacetek regex / -konec regex

    if (vr.length > 8) {
        vr = vr.slice(0, 8); 
    }

    davcna.value = 'SI' + vr; 
});

//telefon
tel.addEventListener("input", function (event) {

    let vr = tel.value.replace(/\D/g, '');

    if (vr.length > 3 && vr.length <= 6) {
        tel.value = vr.slice(0, 3) + '-' + vr.slice(3);
    } else if (vr.length > 6) {
        tel.value = vr.slice(0, 3) + '-' + vr.slice(3, 6) + '-' + vr.slice(6, 9);
    } else {
        tel.value = vr;
    }
});

//postna st.
posta.addEventListener("input", function(event){

    let vr = posta.value.replace(/\D/g,'');

    if(vr.length > 4){
        vr = vr.slice(0,4);
    }

    posta.value = vr;
});

//Za onemogocat pisat use 3 (ko kliknes naredi sivo)

//POMEMBNO:
let dolocilo_input = 0;
//Ta spremenljivka odloca kateri input se uzame ko se to procesira 1 = izd 2 = pod 3 = vrac 0 = ni valid
const izd = document.getElementById('izdaja');
const pod = document.getElementById('podalsanje');
const vrac = document.getElementById('vracilo');

izd.addEventListener('click', function() {
    izd.classList.remove('osivi');
    pod.classList.add('osivi');
    vrac.classList.add('osivi');

    pocistiVnose(pod);
    pocistiVnose(vrac);
    
    dolocilo_input = 1;
});
pod.addEventListener('click', function() {
    izd.classList.add('osivi');
    pod.classList.remove('osivi');
    vrac.classList.add('osivi');

    pocistiVnose(izd);
    pocistiVnose(vrac);

    dolocilo_input = 2;
});
vrac.addEventListener('click', function() {
    izd.classList.add('osivi');
    pod.classList.add('osivi');
    vrac.classList.remove('osivi');

    pocistiVnose(izd);
    pocistiVnose(pod);

    dolocilo_input = 3;
});

function pocistiVnose(div) {
    const vn = div.querySelectorAll('input');

    for (let i = 0; i < vn.length; i++) {
        vn[i].value = '';
    }
      
  }