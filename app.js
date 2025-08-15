
// Company defaults stored in localStorage for easy editing on Accueil
if(!localStorage.getItem("SAMASSA_COMPANY")){
  localStorage.setItem("SAMASSA_COMPANY", JSON.stringify({
    name: "Samassa Technologie",
    slogan: "Tout pour l’informatique",
    address: "Grand Marché de Kayes, près du 1er arrondissement de la police, Rue Soundiata Keita",
    phone: "00223 77291931",
    email: "samassatechnologie10@gmail.com",
    currency: "F CFA"
  }));
}
export function getCompany(){ return JSON.parse(localStorage.getItem("SAMASSA_COMPANY")); }
export function setCompany(d){ localStorage.setItem("SAMASSA_COMPANY", JSON.stringify(d)); }
export function formatMoney(n){
  if(isNaN(n)) return "0";
  return new Intl.NumberFormat('fr-FR').format(Number(n)) + " " + (getCompany().currency || "F CFA");
}
export function saveForm(id){ 
  const data = Object.fromEntries(new FormData(document.getElementById(id)).entries());
  localStorage.setItem("FORM_"+id, JSON.stringify(data));
}
export function loadForm(id){
  const raw = localStorage.getItem("FORM_"+id);
  if(!raw) return;
  const data = JSON.parse(raw);
  const form = document.getElementById(id);
  Object.keys(data).forEach(k=>{
    const el = form.querySelector(`[name="${k}"]`);
    if(el) el.value = data[k];
  });
}
export function printDoc(){ window.print(); }
// French number to words (simplified)
export function numberToFrenchWords(n){
  n = Math.floor(Number(n));
  if(isNaN(n)) return "";
  if(n===0) return "zéro";
  const ones = ["","un","deux","trois","quatre","cinq","six","sept","huit","neuf","dix","onze","douze","treize","quatorze","quinze","seize"];
  function under20(y){ return y<17?ones[y]: y===18?"dix-huit":"dix-neuf"; }
  function under100(x){
    if(x<17) return ones[x];
    const tens = ["","dix","vingt","trente","quarante","cinquante","soixante"];
    if(x<70){ const t=Math.floor(x/10),u=x%10; return tens[t]+(u? (u===1?" et un":"-"+ones[u]) : ""); }
    if(x<80){ const u=x-60; return "soixante-"+(u===11?"onze":under20(u)); }
    if(x<100){ const u=x-80; return "quatre-vingt"+(u? "-"+under20(u) : "s"); }
  }
  function under1000(x){
    if(x<100) return under100(x);
    const c = Math.floor(x/100), r = x%100;
    let base = c===1?"cent":ones[c]+" cent";
    if(r===0 && c>1) base += "s";
    return base + (r? " " + under100(r) : "");
  }
  const scales = [["milliard",1_000_000_000],["million",1_000_000],["mille",1000]];
  let out = "", rem = n;
  for(const [name,val] of scales){
    const q = Math.floor(rem/val);
    if(q){
      out += (out?" ":"") + (q===1 && name==="mille" ? "mille" : under1000(q)+" "+name+(q>1?"s":""));
      rem%=val;
    }
  }
  if(rem) out += (out?" ":"") + under1000(rem);
  return out;
}
// PWA
if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('/service-worker.js').catch(console.error);
  });
}
