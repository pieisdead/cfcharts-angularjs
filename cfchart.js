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
            var c = attrs.id;
            var canvas = document.getElementById(c);
            var ctx = canvas.getContext('2d');
            var w = canvas.offsetWidth;
            var h = canvas.offsetHeight;
            var margin = 10;
            var bw = Math.ceil(w / vals.length) - margin;
            var nv = [];
            var max = 0;
            angular.forEach(vals, function(val) {
                if (parseFloat(val) > max) {
                    max = val;
                }
            });
            angular.forEach(vals, function(val) {
                var cv = Math.floor(parseFloat(val / max) * h);
                nv.push(cv);
            });
            angular.forEach(nv, function(val, i) {
                var posX = (bw * i);
                ctx.beginPath();
                ctx.fillStyle = colors[i];
                ctx.fillRect(posX, h - val, bw - margin, val);
                ctx.closePath();
            })
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
}]);