"use strict";
// 09.02.2024 р.


const dictionary = document.getElementById("dictionary");
const form = document.getElementById("form");
const inp = document.getElementById("inp");
const names = document.getElementById("names");
const opt = document.getElementById("opt");
const ru = document.getElementById("RU");
let show = true;
const words = [];
let list = listUA;

form.addEventListener("click", (event) => event.preventDefault());

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
        // document.querySelector("header").style.height = "7vh";
    } else {
        form.style.display = "none";
        // document.querySelector("header").style.height = "5vh";
    }
    show = !show;
    inp.focus();
}

dictionary.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
        dictionary.style.marginTop = "0";
        setTimeout(() => {
            dictionary.style.marginTop = "4.5rem";
        }, 200);
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
        dictionary.style.marginTop = "4.5rem";
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
