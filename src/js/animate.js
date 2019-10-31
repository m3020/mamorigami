var BASE_URL=window.baseUrl + 'js/';

var entries=new Array();

// document.write("<script type=\"text/javascript\" src=\"" + BASE_URL + "Tween.js\"></script>");
// document.write("<script type=\"text/javascript\" src=\"" + BASE_URL + "ColorTween.js\"></script>");
// document.write("<script type=\"text/javascript\" src=\"" + BASE_URL + "OpacityTween.js\"></script>");
// document.write("<script type=\"text/javascript\" src=\"" + BASE_URL + "StoryBoard.js\"></script>");

Entry = function(className,mo,cl) {
		this.className=className;
		this.mo=mo;
		this.cl=cl;
	}

var et=Entry.prototype;
et.className=null;
et.cl=null;
et.mo=null;

window.onload=function(){
	if(!entries || entries.length==0){
		return;
	}
	for(var i=0;i<entries.length;i++){
		initKaoSpan(entries[i]);
	}
}

function initKaoSpan(entry){
	
	var elms = document.getElementsByClassName(entry.className);
	for(var i=0;i<elms.length;i++){
		if(!elms[i].storyBoards){
			elms[i].storyBoards=new Object();
			if(entry.cl!=null){
				var func=eval(entry.cl);
				elms[i].storyBoards['onclick']=new StoryBoard(elms[i],func);
				
				elms[i].onclick=function(){
						this.storyBoards['onclick'].start();
					}
			}
			if(entry.mo!=null){
				var func=eval(entry.mo);
				elms[i].storyBoards['onmouseover']=new StoryBoard(elms[i],func);
				
				elms[i].onmouseover=function(){
						this.storyBoards['onmouseover'].start();
					}
			}
		}
	}
}