import { ORBS, evaluate } from "./engine.js";

const svg = document.getElementById("canvas");
const palette = document.getElementById("palette");
const status = document.getElementById("status");
const errorsOut = document.getElementById("errors");

let nodes = [];
let selected = null;

ORBS.forEach(type => {
  const btn = document.createElement("button");
  btn.textContent = type;
  btn.onclick = () => addOrb(type);
  palette.appendChild(btn);
});

function addOrb(type) {
  const orb = {
    id: crypto.randomUUID(),
    type,
    x: 600 + Math.random()*40 - 20,
    y: 400 + Math.random()*40 - 20,
    r: 40,
    links: []
  };
  nodes.push(orb);
  draw();
}

function draw() {
  svg.innerHTML = "";

  nodes.forEach(o => {
    const c = document.createElementNS("http://www.w3.org/2000/svg","circle");
    c.setAttribute("cx", o.x);
    c.setAttribute("cy", o.y);
    c.setAttribute("r", o.r);
    c.setAttribute("fill","none");
    c.setAttribute("stroke","rgba(255,255,255,0.8)");
    c.setAttribute("stroke-width","2");
    c.onclick = () => selected = o;
    svg.appendChild(c);

    const t = document.createElementNS("http://www.w3.org/2000/svg","text");
    t.setAttribute("x", o.x);
    t.setAttribute("y", o.y+4);
    t.setAttribute("text-anchor","middle");
    t.setAttribute("fill","white");
    t.textContent = o.type;
    svg.appendChild(t);
  });

  const result = evaluate(nodes);
  status.textContent = result.state;
  errorsOut.textContent = result.errors.length ? "Errors: " + result.errors.join(", ") : "";
}

document.getElementById("autoRel").onclick = () => {
  nodes.forEach(a => a.links = []);
  for (let i=0;i<nodes.length;i++) {
    for (let j=i+1;j<nodes.length;j++) {
      nodes[i].links.push(nodes[j].id);
      nodes[j].links.push(nodes[i].id);
    }
  }
  draw();
};

document.getElementById("clearAll").onclick = () => {
  nodes = [];
  draw();
};

draw();
