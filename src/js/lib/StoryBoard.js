
TweenSet = function(tws,tspan) {
    this.tweens=tws;
    this.timespan=tspan;
}

var ts=TweenSet.prototype;
ts.tweens=new Array();
ts.timespan=0;
ts.start = function(){
    for(var i=0;i<this.tweens.length;i++){
        this.tweens[i].start();
    }
}

StoryInfo=function(tweenSets,prepare,cleanup){
    this.tweenSets=tweenSets;
    this.prepare=prepare;
    this.cleanup=cleanup;
}
var si=StoryInfo.prototype;
si.prepare=null;
si.cleanup=null;


StyleSet = function(prop,val){
    this.prop=prop;
    this.val=val;
}
var ss=StyleSet.prototype;
ss.prop=null;
ss.val=null;


StoryBoard = function(obj,func){
this.init(obj,func);
}
var sb = StoryBoard.prototype;

sb.tweenSets=new Array();
sb.prepareStyleSets=null;
sb.clearStyleSets=null;

sb.start=function(){
var startTime=0;
if(this.prepareStyleSets){
    this.applyStyleSets(this.prepareStyleSets);
}

for(var i=0;i<this.tweenSets.length;i++){
    setTimeout(Delegate.create(this.tweenSets[i], this.tweenSets[i].start),startTime);
    startTime+=this.tweenSets[i].timespan;
}
if(this.clearStyleSets){
    setTimeout(Delegate.create(this, this.applyStyleSets(this.clearStyleSets)),startTime);
}
}

sb.obj = new Object();
sb.parseChars=function(){
var kaoChars = this.obj.innerText;
this.obj.innerText='';
for(var i=0;i<kaoChars.length;i++){
    var elmSpan=document.createElement('span');
    elmSpan.style.position='relative';
    elmSpan.appendChild(document.createTextNode(kaoChars.substr(i,1)));
    this.obj.appendChild(elmSpan);
}
}
sb.init=function(obj,func){
this.obj=obj;
this.parseChars();
var storyInfo=func(obj);
this.tweenSets=storyInfo.tweenSets;
this.prepareStyleSets=storyInfo.prepare;
this.cleanupStyleSets=storyInfo.cleanup;
}


sb.applyStyleSets=function(styleSets){
for(var i=0;i<this.obj.childNodes.length;i++){
    for(var j=0;j<styleSets.length;j++){
        this.obj.childNodes[i].style[styleSets[j].prop]=styleSets[j].val;
    }
}
}


StoryBoard.verticalBounce=function(obj){
    var tweenSets=new Array();
    for(var i=0;i<obj.childNodes.length;i++){
        var rnd=parseInt(Math.random()*100) - 50;
        var ts=new Array();
        ts.push ( new Tween(obj.childNodes[i].style,'top',Tween.elasticEaseOut,rnd,0,1,'px') );
        tweenSets.push(new TweenSet(ts,0));
    }
    return new StoryInfo(tweenSets);
}

StoryBoard.verticalBounce2=function(obj){
    var tweenSets=new Array();
    for(var i=0;i<obj.childNodes.length;i++){
        var rnd=parseInt(Math.random()*100) - 50;
        var ts=new Array();
        ts.push ( new Tween(obj.childNodes[i].style,'top',Tween.elasticEaseOut,rnd,0,1,'px') );
        tweenSets.push(new TweenSet(ts,100));
    }
    return new StoryInfo(tweenSets);
}

StoryBoard.horizontalBounce=function(obj){
    var tweenSets=new Array();
    for(var i=0;i<obj.childNodes.length;i++){
        var w=i*10 + 10;
        var ts=new Array();
        ts.push ( new Tween(obj.childNodes[i].style,'left',Tween.elasticEaseOut,w,0,1,'px') );
        tweenSets.push(new TweenSet(ts,0));
    }
    return new StoryInfo(tweenSets);
}

StoryBoard.breakConsentlate=function(obj){
    var tweenSets=new Array();
    for(var i=0;i<obj.childNodes.length;i++){
        var rndX=parseInt(Math.random()*1000) - 500;
        var rndY=parseInt(Math.random()*1000) - 500;
        var ts=new Array();
        ts.push ( new Tween(obj.childNodes[i].style,'top',Tween.elasticEaseInOut,rndY,0,1,'px') );
        ts.push ( new Tween(obj.childNodes[i].style,'left',Tween.elasticEaseInOut,rndX,0,1,'px') );
        tweenSets.push(new TweenSet(ts,0));
    }
    return new StoryInfo(tweenSets);
}

StoryBoard.burstIn=function(obj){
    var tweenSets=new Array();
    for(var i=0;i<obj.childNodes.length;i++){
        var rndX=parseInt(Math.random()*1000) - 500;
        var rndY=parseInt(Math.random()*1000) - 500;
        var ts=new Array();
        ts.push ( new Tween(obj.childNodes[i].style,'top',Tween.elasticEaseInOut, rndY,0,2,'px') );
        ts.push ( new Tween(obj.childNodes[i].style,'left',Tween.elasticEaseInOut, rndX,0,2,'px') );
        //ts.push ( new Tween(obj.childNodes[i].style,'fontSize',Tween.strongEaseOut,1000,100,2,'%') );
        ts.push ( new ColorTween(obj.childNodes[i].style,'color',Tween.strongEaseOut,'FFFFFF','000000',2) );


        //ts.push ( new Tween(obj.childNodes[i].style,'color',Tween.strongEaseOut,1000,100,1,'') );
        
        tweenSets.push(new TweenSet(ts,100));
    }
    return new StoryInfo(tweenSets);
}

StoryBoard.exitIn=function(obj){
    var tweenSets=new Array();
    for(var i=0;i<obj.childNodes.length;i++){
        var ts=new Array();
        ts.push ( new Tween(obj.childNodes[i].style,'left',Tween.strongEaseOut, 0,2000,0.5,'px') );
        if(i<obj.childNodes.length-1){
            tweenSets.push(new TweenSet(ts,20));
        }else{
            tweenSets.push(new TweenSet(ts,400));
        }
    }
    for(var i=0;i<obj.childNodes.length;i++){
        var ts=new Array();
        ts.push ( new Tween(obj.childNodes[i].style,'left',Tween.strongEaseOut, -2000,0,2,'px') );
        tweenSets.push(new TweenSet(ts,50));
    }
    return new StoryInfo(tweenSets);
}


StoryBoard.charDrop=function(obj){
    var tweenSets=new Array();
    var prepare=new Array();
    prepare.push(new StyleSet('top','-20px'));
    prepare.push(new StyleSet('left','-20px'));
    prepare.push(new StyleSet('zoom','3'));
    //prepare.push(new StyleSet('color','#FFFFFF'));
    prepare.push(new StyleSet('opacity','0'));
    prepare.push(new StyleSet('-moz-opacity','0'));
    
    for(var i=0;i<obj.childNodes.length;i++){
        var rndX=parseInt(Math.random()*1000) - 500;
        var rndY=parseInt(Math.random()*1000) - 500;
        var ts=new Array();
        
        ts.push ( new Tween(obj.childNodes[i].style,'top',Tween.strongEaseIn, -20,0,1,'px') );
        ts.push ( new Tween(obj.childNodes[i].style,'left',Tween.strongEaseIn, -20,0,1,'px') );
        ts.push ( new Tween(obj.childNodes[i].style,'zoom',Tween.strongEaseOut,3,1,1,'') );
        //ts.push ( new ColorTween(obj.childNodes[i].style,'color',Tween.strongEaseIn,'FFFFFF','000000',1) );
        //ts.push ( new OpacityTween(obj.childNodes[i],Tween.strongEaseIn,0,100,1) );
        tweenSets.push(new TweenSet(ts,100));
    }
    return new StoryInfo(tweenSets,prepare);
}

StoryBoard.rainbow=function(obj){
    var tweenSets=new Array();
    for(var i=0;i<obj.childNodes.length;i++){
        var ts=new Array();
        ts.push ( new ColorTween(obj.childNodes[i].style,'color',Tween.strongEaseOut,'FF0000','0000FF',2) );
        tweenSets.push(new TweenSet(ts,100));
    }
    for(var i=0;i<obj.childNodes.length;i++){
        var ts=new Array();
        ts.push ( new ColorTween(obj.childNodes[i].style,'color',Tween.strongEaseOut,'0000FF','FFFFFF',1) );
        tweenSets.push(new TweenSet(ts,100));
    }
    for(var i=0;i<obj.childNodes.length;i++){
        var ts=new Array();
        ts.push ( new ColorTween(obj.childNodes[i].style,'color',Tween.strongEaseOut,'FFFFFF','000000',1) );
        var rnd=parseInt(Math.random()*10) - 5;
        ts.push ( new Tween(obj.childNodes[i].style,'top',Tween.elasticEaseOut,rnd,0,1,'px') );
        tweenSets.push(new TweenSet(ts,100));
    }
    //return tweenSets;
    return new StoryInfo(tweenSets);
}
