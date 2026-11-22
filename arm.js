(function(){
var svg=document.getElementById('arm');if(!svg)return;
var bx=200,by=230,L1=85,L2=85,tx=100,ty=120,cx=tx,cy=ty,idle=true,t0=performance.now();
var still=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function set(id,o){var e=document.getElementById(id);for(var k in o)e.setAttribute(k,o[k]);}
function draw(x,y){
  var dx=x-bx,dy=by-y,d=Math.hypot(dx,dy),R=L1+L2-1;
  if(d>R){dx*=R/d;dy*=R/d;d=R;}
  var c2=(d*d-L1*L1-L2*L2)/(2*L1*L2);c2=Math.max(-1,Math.min(1,c2));
  var q2=-Math.acos(c2),th=Math.atan2(dy,dx);
  var q1=th-Math.atan2(L2*Math.sin(q2),L1+L2*Math.cos(q2));
  var jx=bx+L1*Math.cos(q1),jy=by-L1*Math.sin(q1);
  var ex=jx+L2*Math.cos(q1+q2),ey=jy-L2*Math.sin(q1+q2);
  set('l1',{x1:bx,y1:by,x2:jx,y2:jy});set('l2',{x1:jx,y1:jy,x2:ex,y2:ey});
  set('j',{cx:jx,cy:jy});set('tgt',{cx:x,cy:y});
}
function move(e){var p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;p=p.matrixTransform(svg.getScreenCTM().inverse());tx=p.x;ty=p.y;idle=false;if(still){cx=tx;cy=ty;draw(cx,cy);}}
document.addEventListener('pointermove',move);svg.addEventListener('pointerdown',move);
function loop(now){
  if(idle){var t=(now-t0)/1000;tx=bx+110*Math.sin(t*.7);ty=by-80-55*Math.sin(t*1.1+1);}
  cx+=(tx-cx)*.15;cy+=(ty-cy)*.15;draw(cx,cy);requestAnimationFrame(loop);
}
if(still)draw(tx,ty);else requestAnimationFrame(loop);
})();
