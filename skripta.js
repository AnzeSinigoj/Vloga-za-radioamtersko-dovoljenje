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
*/
import Swal from 'sweet/dist/sweetalert2.all.js'
//osnovno
const ime = document.getElementById("ime");
const priimek = document.getElementById("priimek");
const davcna = document.getElementById("davcnaST");
const tel = document.getElementById("telefonska");
const email = document.getElementById("mail");
const ulica = document.getElementById("ulica_hisna_st");
const mesto = document.getElementById("mesto");
const posta = document.getElementById("postnaST");
//izdaja
const datumIzpita = document.getElementById("dat");
const kz1 = document.getElementById("k1");
const kz2 = document.getElementById("k2");
const kz3 = document.getElementById("k3");
//podalsanje
const kzPodal = document.getElementById("k_pod");
const datumIzdaje = document.getElementById("dat_izdaje");
//vracilo
const kzVracila = document.getElementById("vrac_kz");
const datVracKz = document.getElementById("dat_vrac_kz");
const kzV1 = document.getElementById("nk1");
const kzV2 = document.getElementById("nk2");
const kzV3 = document.getElementById("nk3");

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
posta.addEventListener("input", function (event) {

    let vr = posta.value.replace(/\D/g, '');

    if (vr.length > 4) {
        vr = vr.slice(0, 4);
    }

    posta.value = vr;
});

//vnosna maska za klicne znake:

//izdaja
kz1.addEventListener("input", maskaKlicniZnak);
kz2.addEventListener("input", maskaKlicniZnak);
kz3.addEventListener("input", maskaKlicniZnak);

//podalsanje
kzPodal.addEventListener("input", maskaKlicniZnak);

//vracilo
datVracKz.addEventListener("input", maskaKlicniZnak);
kzV1.addEventListener("input", maskaKlicniZnak);
kzV2.addEventListener("input", maskaKlicniZnak);
kzV3.addEventListener("input", maskaKlicniZnak);

//Za onemogocat pisat use 3 (ko kliknes naredi sivo):
//POMEMBNO:
let dolocilo_input = 0;
//Ta spremenljivka odloca kateri input se uzame ko se to procesira 1 = izd 2 = pod 3 = vrac 0 = ni valid
const izd = document.getElementById('izdaja');
const pod = document.getElementById('podalsanje');
const vrac = document.getElementById('vracilo');

izd.addEventListener('click', function () {
    izd.classList.remove('osivi');
    pod.classList.add('osivi');
    vrac.classList.add('osivi');

    pocistiVnose(pod);
    pocistiVnose(vrac);

    dolocilo_input = 1;
});
pod.addEventListener('click', function () {
    izd.classList.add('osivi');
    pod.classList.remove('osivi');
    vrac.classList.add('osivi');

    pocistiVnose(izd);
    pocistiVnose(vrac);

    dolocilo_input = 2;
});
vrac.addEventListener('click', function () {
    izd.classList.add('osivi');
    pod.classList.add('osivi');
    vrac.classList.remove('osivi');

    pocistiVnose(izd);
    pocistiVnose(pod);

    dolocilo_input = 3;
});

//previri input ce je polno
document.getElementById('dejanska_forma').addEventListener('submit', function (event) {
    let el = [];

    switch (dolocilo_input) {
        case 1: // izdaja
            el = [ime, priimek, davcna, ulica, mesto, posta, datumIzpita, kz1, kz2, kz3];
            break;
        case 2: // podal.
            el = [ime, priimek, davcna, ulica, mesto, posta, kzPodal, datumIzdaje];
            break;
        case 3: // vrac.
            el = [ime, priimek, davcna, ulica, mesto, posta, kzVracila, datVracKz, kzV1, kzV2, kzV3];
            break;
        default:
            event.preventDefault();
            alert('Prosim izberite eno izmed moznosti!');
            return;
    }

    preveriVnose(el, event);
})

function pocistiVnose(div) {
    const vn = div.querySelectorAll('input');

    for (let i = 0; i < vn.length; i++) {
        vn[i].value = '';
    }

}


function preveriVnose(elementi, event) {

    for (let i = 0; i < elementi.length; i++) {
        if (!elementi[i].value.trim()) {
            event.preventDefault();
            Swal.fire({
                title: 'Napaka!',
                text: 'Vsa označena polja so obvezna!',
                icon: 'error',
                confirmButtonText: 'Nadaljuj'
              })
            return;
        }

    }
}

function maskaKlicniZnak(event) {
    let kz = event.target.value.replace(/[^0-9A-Za-z]/g, ""); 

    let st = kz.charAt(2).replace(/[a-zA-Z]/, ""); //stevilka
    let crk = kz.slice(3, 6).replace(/[0-9]/,"").toUpperCase(); //crke

    if (st && crk.length >= 1 && crk.length <= 3) {
        event.target.value = "S5" + st + crk;
    } else {
        event.target.value = "S5" + st;
    }
}
