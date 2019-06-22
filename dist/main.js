!function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="dist/",o(o.s=0)}([function(e,t,o){"use strict";o.r(t);var n=class{constructor(e){this.selector=e,this.container=document.querySelector(this.selector)}init(){this.container&&(this.onComponentsLoading(),this.onBindEvents(),this.onCreate())}onCreate(){}onComponentsLoading(){}onBindEvents(){}};var r=class{static get(e){return JSON.parse(localStorage.getItem(e.toString()))}static getAll(){const e=[],t=Object.keys(localStorage);let o=t.length;for(;o--;)"number"==typeof JSON.parse(localStorage.getItem(t[o])).id&&e.push(JSON.parse(localStorage.getItem(t[o])));return e}static post(e){localStorage.setItem(e.id.toString(),JSON.stringify(e))}static update(e){localStorage.setItem(e.id.toString(),JSON.stringify(e))}static delete(e){localStorage.removeItem(e.toString())}};var i=(e,...t)=>{const o=document.createElement(e);return o.classList.add(...t),o};var s=class{constructor(e){this.book=e}bookImg(){const e=i("img","book__img");return e.setAttribute("src",`${this.book.mainPhoto}`),e.setAttribute("alt",`${this.book.name}`),e}bookContainer(){const e=i("div","book__container"),t=t=>{const o=i("p","book__text","book__text--heading");o.innerText=t,e.append(o)},o=t=>{const o=i("p","book__text");o.innerText=t,e.append(o)};t("Book's name:");const n=i("h3","book__heading");n.innerText=`${this.book.name}`,e.append(n),t("Book authors:"),o(`${this.book.authors}`),t("Date of publishing:"),o(`${this.book.date}`),t("Publisher names:"),o(`${this.book.publisher}`),t("Publishing address:"),o(`${this.book.address}`),t("Publisher's phone:"),o(`${this.book.phone}`),t("Book categories:"),o(`${this.book.categories}`);const r=i("div","book__buttons"),s=i("img","book__btn","book__btn--delete");s.setAttribute("src","./img/delete.svg"),s.setAttribute("alt","delete");const a=i("img","book__btn","book__btn--edit");a.setAttribute("src","./img/edit.svg"),a.setAttribute("alt","edit");const d=i("img","book__btn","book__btn--view");return d.setAttribute("src","./img/view.svg"),d.setAttribute("alt","view"),r.append(s),r.append(a),r.append(d),e.append(r),e}asElement(){const e=i("div","book");return e.dataset.id=`${this.book.id}`,e.append(this.bookImg()),e.append(this.bookContainer()),e}};var a=class extends n{constructor(e){super(e)}onComponentsLoading(){this.booksContainer=document.querySelector(".books__wrapper")}onCreate(){new Promise(e=>{e(r.getAll())}).then(e=>{for(let t=0;t<e.length;t++)this.booksContainer.append(new s(e[t]).asElement())})}};var d=class{constructor(e){this.text=e}asElement(){}init(){this.asElement()}};var l=class extends d{constructor(e,t){super(e),this.timer=t}asElement(){if(!document.querySelector(".fade")){const e=i("div","fade"),t=i("div","info-output");t.innerText=this.text,e.append(t),document.body.append(e);const o=setTimeout(()=>{document.body.removeChild(document.querySelector(".fade")),clearInterval(o)},this.timer)}}};var c=class extends n{constructor(e){super(e),this.isCurrentBook()}onComponentsLoading(){this.addBtn=document.querySelector(".add-book__btn--add"),this.updateBtn=document.querySelector(".add-book__btn--update"),this.morePhotoBtn=document.querySelector(".add-book__more-photo-btn")}onBindEvents(){this.addBtn.addEventListener("click",()=>{this.addBook()}),this.updateBtn.addEventListener("click",()=>{this.updateBook()}),this.morePhotoBtn.addEventListener("click",()=>{this.addMorePhoto()})}addBook(){const e={};if(e.id=Date.now(),e.name=document.querySelector("#name").value,e.authors=document.querySelector("#authors").value,e.date=document.querySelector("#date").value,e.publisher=document.querySelector("#publisher").value,e.address=document.querySelector("#address").value,e.phone=document.querySelector("#phone").value,e.categories=document.querySelector("#categories").value,e.mainPhoto=document.querySelector("#main-photo").value,e.photos=[],document.querySelector(".add-book__photos")){const t=document.querySelector(".add-book__photos"),o=[];for(let e=0;e<t.children.length;e++)t.children[e].getAttribute("id")&&o.push(t.children[e].getAttribute("id"));(t=>{for(let o=0;o<t.length;o++){const n={};n.id=t[o],n.link=document.querySelector(`#${t[o]}`).value,e.photos.push(n)}})(o)}return e.name&&e.authors?(r.post(e),new l("Book added",2e3).init()):new l("Please, enter the name and authors for the book",5e3).init()}isCurrentBook(){const e=new URLSearchParams(location.search).get("id");e&&this.showCurrentBook(e)}showCurrentBook(e){document.querySelector("#id").value=e;const t=r.get(e),o=i("div","current-book");o.innerText=`Current book's name is ${t.name}, authors is ${t.authors}`,document.querySelector(".add-book__form").firstElementChild.append(o),document.querySelector("#name").value=`${t.name}`,document.querySelector("#authors").value=`${t.authors}`,document.querySelector("#date").value=`${t.date}`,document.querySelector("#publisher").value=`${t.publisher}`,document.querySelector("#address").value=`${t.address}`,document.querySelector("#phone").value=`${t.phone}`,document.querySelector("#categories").value=`${t.categories}`,document.querySelector("#main-photo").value=`${t.mainPhoto}`,t.photos&&this.showCurrentPhotos(t)}showCurrentPhotos(e){for(let t=0;t<e.photos.length;t++)if(document.querySelector(".add-book__photos")){const o=document.querySelector(".add-book__photos"),n=i("label","add-book__label");n.innerText="Link for additional book photo:",n.setAttribute("for",e.photos[t].id);const r=i("input","add-book__input");r.innerText="Link for additional book photo:",r.setAttribute("type","url"),r.setAttribute("id",e.photos[t].id),r.value=e.photos[t].link,o.append(n),o.append(r)}else{const o=i("div","add-book__photos"),n=i("label","add-book__label");n.innerText="Link for additional book photo:",n.setAttribute("for",e.photos[t].id);const r=i("input","add-book__input");r.innerText="Link for additional book photo:",r.setAttribute("type","url"),r.setAttribute("id",e.photos[t].id),r.value=e.photos[t].link,o.append(n),o.append(r),document.querySelector(".add-book__more-photo").insertAdjacentElement("beforebegin",o)}}updateBook(){const e={};e.id=parseInt(document.querySelector("#id").value),e.name=document.querySelector("#name").value,e.authors=document.querySelector("#authors").value,e.date=document.querySelector("#date").value,e.publisher=document.querySelector("#publisher").value,e.address=document.querySelector("#address").value,e.phone=document.querySelector("#phone").value,e.categories=document.querySelector("#categories").value,e.mainPhoto=document.querySelector("#main-photo").value,e.photos=[];const t=document.querySelector(".add-book__photos"),o=[];if(t)for(let e=0;e<t.children.length;e++)t.children[e].getAttribute("id")&&o.push(t.children[e].getAttribute("id"));return(t=>{for(let o=0;o<t.length;o++){const n={};n.id=t[o],n.link=document.querySelector(`#${t[o]}`).value,n.link&&e.photos.push(n)}})(o),e.id&&e.name&&e.authors?(r.update(e),new l("Book edited",2e3).init()):new l("Please, enter the id, name and authors for the book",5e3).init()}addMorePhoto(){if(document.querySelector(".add-book__photos")){const e=`id${Date.now()}`,t=document.querySelector(".add-book__photos"),o=i("label","add-book__label");o.innerText="Link for additional book photo:",o.setAttribute("for",e);const n=i("input","add-book__input");n.innerText="Link for additional book photo:",n.setAttribute("type","url"),n.setAttribute("id",e),t.append(o),t.append(n)}else{const e=`id${Date.now()}`,t=i("div","add-book__photos"),o=i("label","add-book__label");o.innerText="Link for additional book photo:",o.setAttribute("for",e);const n=i("input","add-book__input");n.innerText="Link for additional book photo:",n.setAttribute("type","url"),n.setAttribute("id",e),t.append(o),t.append(n),document.querySelector(".add-book__more-photo").insertAdjacentElement("beforebegin",t)}}};var u=class extends n{constructor(e){super(e)}onComponentsLoading(){this.input=document.querySelector("#filters")}onBindEvents(){this.input.addEventListener("keyup",()=>{this.filterFromInput()})}filterFromInput(){const e=new RegExp(this.input.value,"i");if(this.input.value.length>2)this.filter(e);else for(let e=0;e<this.container.children.length;e++)this.container.children[e].style.display=""}filter(e){let t=!1;for(let o=0;o<this.container.children.length;o++)this.container.children[o].querySelector(".book__heading")&&(t=e.test(this.container.children[o].querySelector(".book__heading").innerText)),this.container.children[o].style.display=t?"":"none"}};var h=class extends n{constructor(e){super(e)}onComponentsLoading(){this.selectorList=document.querySelector(".books__wrapper")}onBindEvents(){this.selectorList.addEventListener("click",e=>{this.deleteBook(e)})}deleteBook(e){if(e.target.closest(".book__btn--delete")){const t=e.target.closest(".book").getAttribute("data-id");r.delete(t),this.updateView()}}updateView(){this.selectorList.innerHTML="";const e=r.getAll();for(let t=0;t<e.length;t++)this.selectorList.append(new s(e[t]).asElement())}};var p=class extends n{constructor(e){super(e),this.checkUrl()}checkUrl(){const e=/index.html/i.test(window.location.href);this.url=e?window.location.href.replace(/index.html/i,"addBook.html"):`${window.location.href}addBook.html`}onComponentsLoading(){this.selector=document.querySelector(".books__wrapper")}onBindEvents(){this.selector.addEventListener("click",e=>{this.editBook(e)})}editBook(e){if(e.target.closest(".book__btn--edit")){const t=e.target.closest(".book").getAttribute("data-id"),o=new URL(this.url),n=new URLSearchParams(location.search);n.set("id",t),o.search=n.toString(),window.location.href=o.toString()}}};var m=class extends n{constructor(e){super(e),this.isAnimation=!1}animation(e,t,o,n,r){const i=(t-e)/(o/15),s=t>e,a=setInterval(()=>{e+=i,(s&&e>=t||!s&&e<=t)&&(clearInterval(a),e=t),n(e),e===t&&r&&r()},15)}onComponentsLoading(){this.slideWrapper=document.querySelector(".photos-slider__list"),this.leftArrow=document.querySelector(".photos-slider__prev"),this.rightArrow=document.querySelector(".photos-slider__next")}onBindEvents(){this.rightArrow.addEventListener("click",()=>this.animateLeft()),this.leftArrow.addEventListener("click",()=>this.animateRight())}animateLeft(e){this.isAnimation||(this.isAnimation=!0,this.animation(0,-50,800,e=>{this.slideWrapper.style.transform=`translateX(${e}%)`},()=>{this.slideWrapper.firstElementChild&&(this.slideWrapper.appendChild(this.slideWrapper.firstElementChild),this.slideWrapper.style.transform="",e&&e(),this.isAnimation=!1)}))}animateRight(e){this.isAnimation||(this.isAnimation=!0,this.slideWrapper.style.marginLeft="-100%",this.slideWrapper.firstElementChild&&this.slideWrapper.insertBefore(this.slideWrapper.lastElementChild,this.slideWrapper.firstElementChild),this.animation(-100,0,800,e=>{this.slideWrapper.style.marginLeft=e+"%"},()=>{e&&e(),this.slideWrapper.style.marginLeft="",this.isAnimation=!1}))}};var b=class extends n{constructor(e){super(e)}onComponentsLoading(){this.selectorList=document.querySelector(".books__wrapper")}onBindEvents(){this.selectorList.addEventListener("click",e=>{this.showPhotos(e)})}newEvents(){this.closeBtn.addEventListener("click",()=>{document.body.removeChild(document.querySelector(".fade"))})}showPhotos(e){if(e.target.closest(".book__btn--view")){const t=e.target.closest(".book").getAttribute("data-id"),o=r.get(t);if(!document.querySelector(".fade")){const e=i("div","fade"),t=i("div","photos-slider"),n=i("ul","photos-slider__list");for(let e=0;e<o.photos.length;e++){const t=i("li","photos-slider__item"),r=i("img","photos-slider__img");r.setAttribute("src",o.photos[e].link),r.setAttribute("alt",o.name),t.append(r),n.append(t)}t.append(n);const r=i("img","photos-slider__prev");r.setAttribute("src","./img/prev.svg"),r.setAttribute("alt","prev");const s=i("img","photos-slider__next");return s.setAttribute("src","./img/next.svg"),s.setAttribute("alt","next"),this.closeBtn=i("img","photos-slider__close"),this.closeBtn.setAttribute("src","./img/close.svg"),this.closeBtn.setAttribute("alt","close"),t.append(r),t.append(s),t.append(this.closeBtn),e.append(t),document.body.append(e),this.newEvents(),new m(".photos-slider").init()}}}};const k=new class{constructor(){this.modules=[]}registerModule(e){this.modules.push(e)}init(){this.modules.forEach(e=>{e.init()})}start(){document.addEventListener("DOMContentLoaded",()=>{this.init()})}};document.querySelector(".add-book")&&k.registerModule(new c(".add-book")),document.querySelector(".books")&&k.registerModule(new a(".books")),document.querySelector(".filters")&&k.registerModule(new u(".books__wrapper")),document.querySelector(".books__wrapper")&&k.registerModule(new h(".books__wrapper")),document.querySelector(".books__wrapper")&&k.registerModule(new p(".books__wrapper")),document.querySelector(".books__wrapper")&&k.registerModule(new b(".books__wrapper")),k.start()}]);