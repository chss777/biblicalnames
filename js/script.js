"use strict";

const menu = document.getElementById('menu');
const logo = document.getElementById('logo');

const dictionary = document.getElementById("dictionary");
const form = document.getElementById("form");
const inp = document.getElementById("inp");
const names = document.getElementById("names");
const opt = document.getElementById("opt");
const ru = document.getElementById("RU");
let show = true;
const words = [];
let list = listUA;
var check = true; 

form.addEventListener("click", (event) => event.preventDefault());

logo.addEventListener('click', () => {
    if (check) {
        menu.style.display = 'block';
        check = !check;
    } else {
        menu.style.display = 'none';
        check = !check;
    }
});

inp.addEventListener("input", () => {
    let d = inp.value.replace("ru: ", "").toUpperCase();
    opt.replaceChildren();
    if (dict[d] && Array.isArray(dict[d])) {
        ru.style.display = "inline";
        for (let i = 0; i < dict[d].length; i++) {
            let el = document.createElement("option");
            el.innerHTML = dict[d][i];
            opt.append(el);
        }
        cross(dict[d][0]);
    } else ru.style.display = "none";
    step(d);
});

ru.addEventListener("input", () => cross(ru.value));

function cleaner() {
    inp.value = "";
    inp.focus();
}

function find() {
    if (show) {
        inp.value = "";
        form.style.display = "flex";
        ru.style.display = "none";
        opt.replaceChildren();
        names.replaceChildren();
    } else {
        form.style.display = "none";
    }
    show = !show;
    inp.focus();
}

dictionary.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
        dictionary.style.marginTop = "0";
        setTimeout(() => {
            dictionary.style.marginTop = "2.5rem";
        }, 200);
    } else {
        menu.style.display = 'none';
        check = true
    }
});

function cross(val) {
    dictionary.style.marginTop = "0";
    let el = document.createElement("a");
    el.setAttribute("href", "#" + val);
    document.body.append(el);
    el.click();
    el.remove();
    inp.focus();
    setTimeout(() => {
        dictionary.style.marginTop = "2.5rem";
    }, 100);
}

function diction(reg) {
    for (let i = 0; i < listRU.length; i++) {
        let w = listRU[i];
        if (reg.test(w)) {
            words.push("ru: " + w);
        }
    }
}

function massiv(v) {
    let reg = new RegExp(`^${v}`, "i");
    for (let i = 0; i < list.length; i++) {
        let w = list[i];
        if (reg.test(w)) {
            words.push(w);
        }
    }
    diction(reg);
}

function step(v) {
    massiv(v);
    names.replaceChildren();
    for (let w of words) {
        let el = document.createElement("option");
        el.innerHTML = w;
        names.append(el);
    }
    words.splice(0, words.length);
}

function ok(w) {
    let reg = new RegExp(`^${w}`, "i");
    let d = w.replace("ru: ", "").toUpperCase();
    if (dict[d]) {
        cross(dict[d]);
    } else {
        for (let i = 0; i < list.length; i++) {
            let str = list[i].replaceAll("_", " ");
            if (reg.test(list[i]) || reg.test(str)) {
                cross(list[i]);
                break;
            }
        }
    }
    inp.focus();
}

/**
*  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
*  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables    */

var disqus_config = function () {
    this.page.url = "http://127.0.0.1:5500/index.html";  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = ""; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
};

const disqus = document.getElementById('disqus');

function toComments() { 
    disqus.style.display = 'block';
    menu.style.display = 'none';
    var d = document, s = d.createElement('script');
    s.src = 'https://biblicalnames-ua.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
}
function offComments() {
    disqus.style.display = 'none';
    menu.style.display = 'none';
    check = true
}


