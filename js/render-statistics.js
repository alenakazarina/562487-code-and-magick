'use strict';

(function () {
  window.renderStatistics = function (ctx, names, times) {
    var CLOUD_WIDTH = 420;
    var CLOUD_HEIGHT = 270;
    var CLOUD_X = 100;
    var CLOUD_Y = 10;
    var cloud = {
      fillColor: 'white',
      shadowColor: 'rgba(0, 0, 0, 0.7)',
      printShape: function (fillColor, offsetX, offsetY) {
        ctx.fillStyle = fillColor;
        ctx.beginPath();
        ctx.moveTo(155 + offsetX, 280 + offsetY);
        ctx.bezierCurveTo(70, 270, 70, 20, 205 + offsetX, 50 + offsetY);
        ctx.bezierCurveTo(150, -5, 450, -5, 415 + offsetX, 50 + offsetY);
        ctx.bezierCurveTo(550, 20, 550, 270, 465 + offsetX, 280 + offsetY);
        ctx.lineTo(155 + offsetX, 280 + offsetY);
        ctx.fill();
      },
      draw: function () {
        this.printShape(this.shadowColor, 10, 10);
        this.printShape(this.fillColor, 0, 0);
      },
    };
    var MESSAGE_X = CLOUD_X + CLOUD_WIDTH / 2;
    var MESSAGE_Y = CLOUD_Y + CLOUD_HEIGHT / 10;
    var MESSAGE_FONT_GAP = 24;
    var message = {
      text: 'Ура вы победили!\nСписок результатов:',
      font: '16px PT Mono',
      fillColor: 'crimson',
      draw: function () {
        //  divide message into phrases
        var phrases = this.text.split('\n');
        ctx.font = this.font;
        ctx.strokeStyle = this.fillColor;
        //  centered phrases
        for (var i = 0; i < phrases.length; i++) {
          ctx.strokeText(phrases[i], MESSAGE_X - phrases[i].length * 5, MESSAGE_Y + MESSAGE_FONT_GAP * i);
        }
      }
    };
    //  const
    var BARCHART_X = CLOUD_X + (CLOUD_WIDTH - CLOUD_X) / 6;
    var BARCHART_Y = CLOUD_HEIGHT - 25;
    var COLUMN_WIDTH = 40;
    var BARCHART_HEIGHT = 150;
    var COLUMN_GAP = 50;
    var BAR_WIDTH = COLUMN_WIDTH + COLUMN_GAP;
    var MAX_TIME = getMax(times);
    //  max width Math.max
    function getMax(items) {
      return Math.max.apply(null, items);
    }
    //  barChart
    var barChart = {
      printTimes: function () {
        for (var i = 0; i < times.length; i++) {
          var position = this.getPosition(i);
          ctx.strokeText(Math.round(times[i]), position[0], position[1] - 10);
        }
      },
      printBars: function () {
        for (var i = 0; i < names.length; i++) {
          var coords = this.getPosition(i);
          ctx.fillStyle = this.getFillColor(names[i]);
          ctx.fillRect(coords[0], coords[1], COLUMN_WIDTH, this.getBarHeight(times[i]));
        }
      },
      printNames: function () {
        for (var i = 0; i < names.length; i++) {
          var startX = BARCHART_X + BAR_WIDTH * i;
          if (names[i] !== 'Вы') {
            ctx.strokeText(names[i], startX, CLOUD_HEIGHT);
          } else {
            ctx.strokeText(names[i], startX + names[i].length * 10 / 2, CLOUD_HEIGHT);
          }
        }
      },
      getFillColor: function (item) {
        if (item !== 'Вы') {
          var saturation = Math.random() * 100;
          return 'hsla(240, ' + saturation + '%, 50%, 0.9)';
        }
        return 'rgba(255, 0, 0, 1)';
      },
      getPosition: function (i) {
        var startX = BARCHART_X + BAR_WIDTH * i;
        var startY = BARCHART_Y - this.getBarHeight(times[i]);
        return [startX, startY];
      },
      getBarHeight: function (time) {
        return Math.round(time * BARCHART_HEIGHT / MAX_TIME);
      },
      draw: function () {
        this.printTimes();
        this.printBars();
        this.printNames();
      }
    };
    cloud.draw();
    message.draw();
    barChart.draw();
  };
})();
