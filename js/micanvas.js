function draw() {
 var ctx = document.getElementById('canvas').getContext('2d');

 // Create gradients
 var lingrad = ctx.createLinearGradient(0,0,0,512);
 lingrad.addColorStop(0, '#00ABEB');
 lingrad.addColorStop(0.5, '#fff');
 lingrad.addColorStop(0.5, '#26C000');
 lingrad.addColorStop(1, '#fff');

 var lingrad2 = ctx.createLinearGradient(0,250,480,512);
 lingrad2.addColorStop(1, '#000');
 lingrad2.addColorStop(1, 'rgba(0,0,0,0)');

 // assign gradients to fill and stroke styles
 ctx.fillStyle = lingrad;
 ctx.strokeStyle = lingrad2;

 // draw shapes
 ctx.fillRect(0,0,512,480);
 ctx.strokeRect(0,0,512,480);
}
