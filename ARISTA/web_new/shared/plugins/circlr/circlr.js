!function(){'use strict';var mutable=['vertical','reverse','cycle','speed','playSpeed'];function Circlr(options){options.mouse=options.mouse||true;options.scroll=options.scroll||false;options.vertical=options.vertical||false;options.reverse=options.reverse||false;options.cycle=options.cycle||true;options.start=options.start||0;options.speed=options.speed||50;var autoplay=options.autoplay||false;options.playSpeed=options.playSpeed||100;var el=this.el=options.element;el.setAttribute('data-circlr',true);var loader=options.loader?document.getElementById(options.loader):undefined;var length=this.length=el.getElementsByTagName('img').length;var height=options.height||undefined;var width=options.width||undefined;var movable=false;var loaded=[];var errored=[];var current;var pre={};pre.Y=null;pre.X=null;pre.frame=0;var callbacks={};callbacks.ready=options.ready||undefined;callbacks.change=options.change||undefined;var scrollEvents=['wheel','mousewheel','scroll','DOMMouseScroll'];function onEventListener(target,event,fn){if(target.addEventListener){target.addEventListener(event,fn,false);}else{target.attachEvent('on'+event,function(){fn.call(target,window.event);});}}
function preventDefault(e){if(e.preventDefault){e.preventDefault();}else{e.returnValue=false;}}
function preMove(e){autoplay=false;preventDefault(e);e=e.type==='touchstart'?e.changedTouches[0]:e;movable=true;if(options.vertical){pre.Y=e.clientY-el.offsetTop;}else{pre.X=e.clientX-el.offsetLeft;}}
function normalize(cur){if(cur<0){cur=options.cycle?cur+length:0;}else if(cur>length-1){cur=options.cycle?cur-length:length-1;}
return cur;}
function isMove(e){if(movable){preventDefault(e);e=e.type==='touchmove'?e.changedTouches[0]:e;var offset=(options.vertical)?((e.clientY-el.offsetTop)-pre.Y):((e.clientX-el.offsetLeft)-pre.X);offset=options.reverse?-offset:offset;var step=width/length;var previous=current;offset=Math.floor(offset/step);if(offset!==current){current=normalize(pre.frame+offset);if(previous!==current){el.getElementsByTagName('img')[previous].style.display='none';el.getElementsByTagName('img')[current].style.display='block';if(typeof callbacks.change==='function'){callbacks.change(current,length);}}}}}
function stopMove(e){preventDefault(e);movable=false;pre.frame=current;}
function scrollMove(e){autoplay=false;preventDefault(e);var delta=e.deltaY||e.detail||(-e.wheelDelta);delta=delta/Math.abs(delta);delta=options.reverse?-delta:delta;current=normalize(current+delta);el.getElementsByTagName('img')[pre.frame].style.display='none';el.getElementsByTagName('img')[current].style.display='block';pre.frame=current;if(typeof callbacks.change==='function'){callbacks.change(current,length);}}
function initEvents(){if(loader){loader.style.display='none';}
if(errored.length===0){var start=normalize(options.start);el.getElementsByTagName('img')[start].style.display='block';current=start;el.style.position='relative';el.style.width='100%';if('ontouchstart'in window||'onmsgesturechange'in window){if(options.mouse||options.scroll){onEventListener(el,'touchstart',preMove);onEventListener(el,'touchmove',isMove);onEventListener(el,'touchend',stopMove);}}else{if(options.mouse){onEventListener(el,'mousedown',preMove);onEventListener(el,'mousemove',isMove);onEventListener(document,'mouseup',stopMove);}
if(options.scroll){for(var e=0;e<scrollEvents.length;e++){if('on'+scrollEvents[e]in window){onEventListener(el,scrollEvents[e],scrollMove);break;}}}}
if(autoplay){play();}}
if(typeof callbacks.ready==='function'){callbacks.ready(errored);}}
function loadImagesEvents(img){img.onload=function(){loaded.push(this.src);if(loaded.length+errored.length===length){initEvents();}};img.onerror=function(){errored.push(this.src);if(loaded.length+errored.length===length){initEvents();}};img.onreadystatechange=function(){this.onload();};}
function loadImages(){var img;if(loader){loader.style.display='block';}
for(var i=0;i<length;i++){img=el.getElementsByTagName('img')[i];img.style.display='none';img.style.width='100%';img.setAttribute('src',img.getAttribute('data-src'));img.setAttribute('data-index',i);img.removeAttribute('data-src');loadImagesEvents(img);}
height=height||el.clientHeight;width=width||el.clientWidth;}
loadImages();function setFrame(i){el.getElementsByTagName('img')[current].style.display='none';el.getElementsByTagName('img')[i].style.display='block';pre.frame=current=i;}
var turn=this.turn=function(i){i=normalize(i);autoplay=true;(function turnInterval(){if(i!==current&&autoplay){setFrame(normalize(i<current?current-1:current+1));setTimeout(turnInterval,typeof i==='undefined'?options.playSpeed:options.speed);}else if(i===current){pre.frame=current=i;autoplay=false;if(typeof callbacks.change==='function'){callbacks.change(current,length);}}})();};this.go=function(i){if(i!==current){setFrame(i);if(typeof callbacks.change==='function'){callbacks.change(current,length);}}};var play=this.play=function(){autoplay=true;turn();};this.stop=function(){autoplay=false;};this.show=function(){el.style.display='block';};this.hide=function(){el.style.display='none';};this.set=function(set){for(var i=0,key;i<mutable.length;i++){key=mutable[i];options[key]=typeof set[key]!=='undefined'?set[key]:options[key];}};}
function Creator(element,options){element=document.getElementById(element);if(element.getAttribute('data-circlr')){return;}
options=options||{};options.element=element;return new Circlr(options);}
if(typeof define==='function'&&define.amd){define([],function(){return Creator;});}else if(typeof module!=='undefined'&&module.exports){module.exports=Creator;}else{this.circlr=Creator;}}.call(this);