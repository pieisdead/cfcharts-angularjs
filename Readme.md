#CFCharts AngularJS#

Add cfchart.js to your application

```javascript
var MyApp = angular.module('MyApp', ['cfchart']);
```

Add a chart in HTML

```html
<piechart id="myChart" colors="#ff0000, #ffce00, #0062ff, #ff6700, #1fc90d" values="11, 55, 120, 32, 20" width="200" height="200"></piechart>
```
```html
<barchart id="myChart" colors="#ff0000, #ffce00, #0062ff, #ff6700, #1fc90d" values="111, 255, 120, 32, 420" width="400" height="300" labels="One, Two, Three, Four, Five"></barchart>
```
```html
<linechart id="myChart" values="[20, 50, 10, 60, 50, 77];[10, 30, 35, 50, 12, 70]" line-color="#ff0000, #0062ff" labels="2004, 2005, 2006, 2007, 2008, 2009" width="400" height="300"></linechart>
```
```html
<radarchart id="myChart" values="[20, 40, 10, 90, 50, 60, 23, 33];[12, 60, 55, 93, 34, 21, 77, 82]" colors="#ff0000, #0062ff" labels="1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001" width="400" height="400"></radarchart>
```
```html
<scatterchart id="myChart" width="400" height="300" values="[200, 230, 100, 30, 66, 190, 199];[210, 130, 120, 34, 56, 98, 198];[110, 120, 100, 33, 59, 190, 188]" colors="#FF0000, #0062FF, #FC00FF" labels="1999, 2000, 2001, 2002, 2003, 2004, 2005"></scatterchart>
```