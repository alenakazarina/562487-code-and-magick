'use strict';
window.renderStatistics = function (ctx, names, times) {
  var cloud = {
    coords: [100, 10],
    width: 420,
    height: 270,
    fillColor: 'white',
    shadowColor: 'rgba(0, 0, 0, 0.7)',
    draw: function () {
      //  shadow
      ctx.shadowColor = this.shadowColor;
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 10;
      ctx.shadowOffsetY = 10;
      //  cloud
      ctx.fillStyle = this.fillColor;
      ctx.beginPath();
      ctx.moveTo(155, 280);
      ctx.bezierCurveTo(70, 270, 70, 20, 205, 50);
      ctx.bezierCurveTo(150, -5, 450, -5, 415, 50);
      ctx.bezierCurveTo(550, 20, 550, 270, 465, 280);
      ctx.lineTo(155, 280);
      ctx.fill();
    }
  };
  var message = {
    text: 'Ура вы победили!\nСписок результатов:',
    font: '16px PT Mono',
    fillColor: 'crimson',
    draw: function () {
      //  divide message into phrases
      var phrases = this.text.split('\n');
      var phrasesX = cloud.coords[0] + cloud.width / 2;
      var phrasesY = cloud.height / 8;
      var phrasesOffset = 24;
      ctx.font = this.font;
      ctx.strokeStyle = this.fillColor;
      //  cancel shadow params
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      //  centered phrases
      for (var i = 0; i < phrases.length; i++) {
        ctx.strokeText(phrases[i], phrasesX - phrases[i].length * 5, phrasesY + phrasesOffset * i);
      }
    }
  };
  var barChart = {
    columnWidth: 40,
    height: 150,
    columnGap: 50,
    columnCount: names.length,
    draw: function () {
      var startPosX = cloud.coords[0] + (cloud.width - cloud.coords[0]) / 6;
      var barWidth = this.columnGap + this.columnWidth;
      var maxTime = this.getMax(times);
      //  bars
      for (var i = 0; i < names.length; i++) {
        var time = Math.round(times[i]);
        var barHeight = time / maxTime * this.height;
        var startY = cloud.height - barHeight - 25;
        var startX = startPosX + barWidth * i;
        //  name
        if (names[i] !== 'Вы') {
          ctx.strokeText(names[i], startX, cloud.height);
          // random saturation
          var saturation = Math.random() * 100;
          ctx.fillStyle = 'hsla(240, ' + saturation + '%, 50%, 0.9)';
        } else {
          ctx.strokeText(names[i], startX + names[i].length * 10 / 2, cloud.height);
          // special barColor for 'Вы'
          ctx.fillStyle = 'rgba(255, 0, 0, 1)';
        }
        //  bar
        ctx.fillRect(startX, startY, this.columnWidth, barHeight);
        //  time
        ctx.strokeText(time, startX, startY - 10);
      }
    },
    getMax: function (items) {
      var max = 0;
      for (var i = 0; i < items.length; i++) {
        if (items[i] > max) {
          max = items[i];
        }
      }
      return max;
    }
  };
  cloud.draw();
  message.draw();
  barChart.draw();
};
