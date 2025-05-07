/**************************************************************************
 * 1. Starfield (re‑use tiny parallax engine)                             *
 **************************************************************************/
class Stars{constructor(id,speed,density){
    this.c=document.getElementById(id);this.x=this.c.getContext("2d");
    this.speed=speed;this.density=density;this.stars=[];this.resize();
    addEventListener("resize",()=>this.resize());this.populate();this.loop()}
  resize(){this.c.width=innerWidth;this.c.height=innerHeight}
  populate(){this.stars.length=0;const n=(innerWidth+innerHeight)/this.density;
    for(let i=0;i<n;i++)this.stars.push(this.newStar())}
  newStar(){return{x:Math.random()*this.c.width,y:Math.random()*this.c.height,r:Math.random()*1.2+.2,o:Math.random()*.7+.25}}
  loop(){this.x.clearRect(0,0,this.c.width,this.c.height);this.x.fillStyle="#fff";
    this.stars.forEach(s=>{this.x.globalAlpha=s.o;this.x.beginPath();this.x.arc(s.x,s.y,s.r,0,Math.PI*2);this.x.fill();s.y+=this.speed;if(s.y>this.c.height){s.y=-s.r;s.x=Math.random()*this.c.width}});requestAnimationFrame(()=>this.loop())}}
  new Stars("bgFar",.3,8);new Stars("bgNear",.8,4);
  
  /**************************************************************************
   * 2. Employee CRUD                                                       *
   **************************************************************************/
  const form=document.getElementById("employeeForm"),
        entriesEl=document.getElementById("entries"),
        submitBtn=document.getElementById("submitBtn");
  
  let editingId=null; // track current edit
  
  // Helpers
  const randId=()=>crypto.randomUUID();
  const createTag=(tag,cls,txt)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(txt)el.textContent=txt;return el}
  
  // Render one entry card
  function renderEntry({id,name,age,sex,position}){
    const card=createTag("div","entry");card.dataset.id=id;
  
    const info=createTag("div","entry__info");
    info.append(createTag("strong","",`${name} • ${position}`));
    info.append(createTag("span","",`Age ${age} | ${sex}`));
    card.append(info);
  
    const btns=createTag("div","entry__btns");
    const edit=createTag("button","btn btn--edit","Edit");
    const del =createTag("button","btn btn--delete","Delete");
    btns.append(edit,del);card.append(btns);
  
    // Edit handler
    edit.onclick=()=>{
      const {name,age,sex,position}=db.find(e=>e.id===id);
      form.name.value=name;form.age.value=age;form.sex.value=sex;form.position.value=position;
      submitBtn.querySelector(".txt").textContent="Update";
      editingId=id;
    };
  
    // Delete handler
    del.onclick=()=>{
      db=db.filter(e=>e.id!==id);
      card.style.animation="fadeOut .4s forwards";
      setTimeout(()=>card.remove(),380);
    };
  
    entriesEl.prepend(card);
  }
  
  /* Fade‑out keyframes injected once */
  document.head.insertAdjacentHTML("beforeend",`<style>
  @keyframes fadeOut{to{opacity:0;transform:translateY(10px)}} </style>`);
  
  /**************************************************************************
   * 3. DB + Form Handling                                                  *
   **************************************************************************/
  let db=[];
  
  form.addEventListener("submit",e=>{
    e.preventDefault();
    const name=form.name.value.trim(),
          age =Number(form.age.value),
          sex =form.sex.value,
          position=form.position.value.trim();
    if(!name||!age||!sex||!position||age<18||age>100)return shakeForm();
  
    if(editingId){
      // update
      const rec=db.find(e=>e.id===editingId);
      Object.assign(rec,{name,age,sex,position});
      refreshUI();
      editingId=null;
      submitBtn.querySelector(".txt").textContent="Add Entry";
    }else{
      // create
      const entry={id:randId(),name,age,sex,position};
      db.push(entry);
      renderEntry(entry);
    }
    form.reset();form.name.focus();
  });
  
  // UI Helpers
  function refreshUI(){
    entriesEl.innerHTML="";db.forEach(renderEntry);
  }
  function shakeForm(){
    form.classList.add("shake");setTimeout(()=>form.classList.remove("shake"),500);
  }
  