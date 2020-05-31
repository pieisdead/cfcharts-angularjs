angular.module('cfchart', []).
    directive('piechart', [function() {
    return {
        restrict: 'E',
        replace: true,
        link: function(scope, elem, attrs) {
            var c = attrs.id;
            var vals = attrs.values.split(', ');
            var colors = attrs.colors.split(', ');
            var nv = [];
            for (var j = 0; j < vals.length; j++) {
                nv.push(vals[j]);
            }
            var canvas = document.getElementById(c);
            var ctx = canvas.getContext("2d");
            var lastend = 0;
            var myTotal = 0; 
            for (var e = 0; e < nv.length; e++) {
              myTotal += parseInt(nv[e]);
            }
            var cw = canvas.offsetWidth;
            var ch = canvas.offsetHeight;
            for (var i = 0; i < nv.length; i++) {
                  ctx.fillStyle = colors[i];
                  ctx.beginPath();
                  ctx.moveTo(cw / 2, ch / 2);
                  ctx.arc(cw / 2, ch / 2, ch / 2, lastend, lastend + (Math.PI * 2 * (nv[i] / myTotal)), false);
                  ctx.lineTo(cw / 2, ch / 2);
                  ctx.fill();
                  lastend += Math.PI * 2 * (nv[i] / myTotal);
             }
        },
        template: function(scope, elem, attrs) {
            return '<canvas width="' + $(elem).attr('width') + '" height="' + $(elem).attr('height') + '"></canvas>';
        }
    }
}])
.directive('barchart', [function() {
    return {
        restrict: 'E',
        replace: true,
        link: function(scope, elem, attrs) {
            var vals = attrs.values.split(', ');
            var colors = attrs.colors.split(', ');
            var labels = attrs.labels !== undefined ? attrs.labels.split(', ') : false;
            var c = attrs.id;
            var canvas = document.getElementById(c);
            var ctx = canvas.getContext('2d');
            var w = canvas.offsetWidth;
            var h = canvas.offsetHeight;
            var margin = 10;
            var bw = Math.ceil(w / vals.length) - margin;
            var nv = [];
            var max = 0;
            var factors = 10;
            var vheight = h / factors;
            for (var j = 0; j < factors; j++) {
                ctx.strokeStyle = "#DFDFDF";
                ctx.moveTo(0, vheight * j);
                ctx.lineTo(w, vheight * j);
                ctx.stroke();
            }
            angular.forEach(vals, function(val) {
                if (parseFloat(val) > max) {
                    max = val;
                }
            });
            angular.forEach(vals, function(val) {
                var cv = Math.floor(parseFloat(val / max) * h);
                nv.push(cv);
            });
            console.log(nv);
            angular.forEach(nv, function(val, i) {
                var posX = (bw * i);
                ctx.beginPath();
                ctx.fillStyle = colors[i];
                ctx.fillRect(posX, h - val, bw - margin, val);
                ctx.closePath();
                ctx.fillStyle = "#333333";
                  ctx.font = '14px Arial';
                ctx.textAlign = 'center';
                if (labels) {
                    ctx.fillText(labels[i], bw * i + bw / 2 - margin, h - 10);
                }
            });
            var upper = Math.max.apply(Math, vals);
            var ph = upper / factors;
            ctx.textAlign = 'right';
            for (var l = 1; l <= factors; l++) {
                ctx.fillText(Math.round(ph * l), w - 5, h - (l * vheight));
            }
        },
        template: function(scope, elem, attrs) {
            return '<canvas width="' + $(elem).attr('width') + '" height="' + $(elem).attr('height') + '"></canvas>';
        }
    }
}])
.directive('linechart', [function() {
    return {
        restrict: 'E',
        replace: true,
        link: function(scope, elem, attrs) {
            var inp = attrs.values.split(';');
            var valueset = {};
            angular.forEach(inp, function(v, i) {
                var p = v.replace('[', '').replace(']', '').split(', ');
                valueset[i] = {
                    setValues: p
                }
            });
            var labels = attrs.labels.split(', ');
            var lineColors = attrs.lineColor.split(', ');
            var c = attrs.id;
            var canvas = document.getElementById(c);
            var ctx = canvas.getContext("2d");
            var w = canvas.offsetWidth;
            var h = canvas.offsetHeight;
            var factor = 10;
            var facHeight = h / factor;
            ctx.strokeStyle = '#CCCCCC';
            for (var i = 0; i < factor; i++) {
                ctx.beginPath();
                ctx.moveTo(0, facHeight * i);
                ctx.lineTo(w - 12, facHeight * i);
                ctx.stroke();
            }
            var tabWidth = Math.floor(w / labels.length);
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            angular.forEach(labels, function(v, i) {
                ctx.fillText(v, tabWidth * i, h - 14);
            });
            var maxes = [];
            var upper = 0;
            angular.forEach(valueset, function(v, i) {
                var m = 0;
                var factors = [];
                var positions = [];
                angular.forEach(v.setValues, function(val, ind) {
                    positions.push(val);
                });
                angular.forEach(positions, function(n, i) {
                    if (n > m) {
                        m = n;
                    }
                });
                 for (var k = 1; k < factor + 1; k++) {
                    factors.push(Math.floor(m / k));
                }
                maxes.push(Math.max(factors[i]));
                ctx.strokeStyle = lineColors[i];
                ctx.beginPath();
                angular.forEach(positions, function(val, ind) {
                    var pos = Math.floor((val / m) * h);
                    ctx.moveTo(ind * tabWidth, h - pos);
                    var nv = positions[ind+1] / m * h;
                    ctx.lineTo((ind + 1) * tabWidth, h - nv);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.arc(ind * tabWidth, h - pos, 5, 0, 2 * Math.PI);
                    ctx.fillStyle = lineColors[i];
                    ctx.fill();
                });
            });
            
            upper = Math.max.apply(Math, maxes);
            ctx.fillStyle = "#CCCCCC";
            var ph = upper / factor;
            for (var l = 1; l <= factor; l++) {
                ctx.fillText(Math.round(ph * l), w - 10, h - (l * facHeight) + 5);
            }
            
        },
        template: function(scope, elem, attrs) {
            return '<canvas width="400" height="300"></canvas>';
        }
    }
}])
.directive('radarchart', [function() {
   return {
       restrict: 'E',
       replace: true,
       link: function(scope, elem, attrs) {
           var inp = attrs.values.split(';');
           var valueset = {};
            angular.forEach(inp, function(v, i) {
            var p = v.replace('[', '').replace(']', '').split(', ');
                valueset[i] = {
                    setValues: p
                }
            });
           var labels = attrs.labels.split(', ');
           var colors = attrs.colors.split(', ');
           var canvas = document.getElementById(attrs.id);
           var ctx = canvas.getContext('2d');
           var w = canvas.offsetWidth;
           var h = canvas.offsetHeight;
           var centerx = canvas.width / 2;
            var centery = canvas.height / 2;
            var hfrac = labels.length;
           var valArray = [];
           ctx.fillStyle = "#CCCCCC";
           ctx.font = "14px 'Lato'";
            for (var n = 0; n < labels.length; n++) {
                ctx.fillText(labels[n], centerx + 200 * Math.cos(n * 2 * Math.PI / hfrac), centery + 200 * Math.sin(n * 2 * Math.PI / hfrac));
            } 
           angular.forEach(valueset, function(v, i) {
               valArray = [];
				var headArray = [];
				var incVals = [];
				angular.forEach(v.setValues, function(em, i) {
                    valArray.push(parseFloat(em));
				});
				var frac = valArray.length;
				var factors = 7;
				var currentFactor = 0;
               var stime = 99;
               for (var k = 0; k < valArray.length; k++) {
                ctx.lineWidth = 1;
                ctx.strokeStyle = "#CCCCCC";
                ctx.lineTo(centerx + 205 * Math.cos(k * 2 * Math.PI / valArray.length), centery + 200 * Math.sin(k * 2 * Math.PI / valArray.length));
                ctx.stroke();
                ctx.moveTo(centerx, centery);
            }
               currentFactor = 0;
					if (stime < 100) {
						for (var q = 0; q < incVals.length; q++) {
							incVals[q] += valArray[q];
						}
						stime++;
                    }
					
				for (var p = 0; p < valArray.length; p++) {
					incVals[p] = 0;
				}
               
               for (var q = 0; q < incVals.length; q++) {
                    incVals[q] += valArray[q] ;
                }
               
                for (var j = 0; j < factors; j++) {
                    ctx.strokeStyle = "#CCCCCC";
                    ctx.beginPath();
                    ctx.moveTo(centerx + currentFactor * Math.cos(0), centery + currentFactor * Math.sin(0));
                    for (var l = 1; l < v.setValues.length; l++) {
                        ctx.lineTo(centerx + currentFactor * Math.cos(l * 2 * Math.PI / frac), centery + currentFactor * Math.sin(l * 2 * Math.PI / frac));
                    }
                    ctx.lineTo(centerx + currentFactor * Math.cos(0), centery + currentFactor * Math.sin(0));
                    ctx.lineWidth = 1;
                    ctx.stroke();
                    ctx.closePath();
                    currentFactor += 20 * 1.7;
                }
                ctx.closePath();
                ctx.moveTo(centerx, centery);

                
                ctx.fillStyle = "#D4D4D4";
                ctx.closePath();
                ctx.beginPath();
                ctx.moveTo(centerx + valArray[0] * 1.7 * Math.cos(0), centery + valArray[0] * 1.7 * Math.sin(0));
                ctx.strokeStyle = colors[i];
                for (var m = 0; m < valArray.length; m++) {
                    ctx.lineTo(centerx + incVals[m] * 1.7 * Math.cos(m * 2 * Math.PI / valArray.length), centery + incVals[m] * 1.7 * Math.sin(m * 2 * Math.PI / valArray.length));
                    ctx.stroke();
                    ctx.fillStyle = colors[i];
                    ctx.beginPath()
                    ctx.arc(centerx + incVals[m] * 1.7 * Math.cos(m * 2 * Math.PI / valArray.length), centery + incVals[m] * 1.7 * Math.sin(m * 2 * Math.PI / valArray.length), 5, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.lineTo(centerx + incVals[0] * 1.7 * Math.cos(0), centery + incVals[0] * 1.7 * Math.sin(0));
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                var factorText = 20;
                ctx.font = "14px 'Lato'";
                ctx.fillStyle = "#CCCCCC";
                ctx.textAlign = "right";
                for (var m = 0; m < factors -1; m++) {
                    ctx.fillText(factorText, centerx - 20 - (factorText), centery + 20 - (factorText) );
                    factorText += 20;	
                }
           });
           
           
       },
       template: function(scope, elem, attrs) {
           return '<canvas width="400" height="400"></canvas>';
       }
   } 
}]);