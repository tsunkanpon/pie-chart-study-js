function drawPiChart(element, labels, vals, color, fontSize, font) {
    var context = element.getContext("2d");
    context.clearRect(0, 0, element.width, element.height);

    var sum = 0;
    for (i = 0; i < vals.length; i++) {
        sum = sum + vals[i];
    }

    var ox = element.width / 2;
    var oy = element.height / 2;

    var minLong;
    if (element.width < element.height) {
        minLong = element.width;
    } else {
        minLong = element.height;
    }
    var r = minLong * 300 / 1000;
    var rr = minLong * 350 / 1000;

    var angleArray = [];
    for (i = 0; i < vals.length; i++) {
        angleArray[i] = 360 * (vals[i] / sum * 100) / 100;
    }

    var x1 = [];
    for (i = 0; i < angleArray.length; i++) {
        var angleSum = 0;
        for (j = 0; j <= i; j++) {
            if (j == i) {
                angleSum = angleSum + angleArray[j] / 2;
            } else {
                angleSum = angleSum + angleArray[j];
            }
        }
        x1[i] = ox + r * Math.sin(angleSum * Math.PI / 180);
    }

    var y1 = [];
    for (i = 0; i < angleArray.length; i++) {
        var angleSum = 0;
        for (j = 0; j <= i; j++) {
            if (j == i) {
                angleSum = angleSum + angleArray[j] / 2;
            } else {
                angleSum = angleSum + angleArray[j];
            }
        }
        y1[i] = oy - r * Math.cos(angleSum * Math.PI / 180);
    }

    var x2 = [];
    for (i = 0; i < angleArray.length; i++) {
        var angleSum = 0;
        for (j = 0; j <= i; j++) {
            if (j == i) {
                angleSum = angleSum + angleArray[j] / 2;
            } else {
                angleSum = angleSum + angleArray[j];
            }
        }
        x2[i] = ox + rr * Math.sin((angleSum) * Math.PI / 180);
    }


    var y2 = [];
    for (i = 0; i < angleArray.length; i++) {
        var angleSum = 0;
        for (j = 0; j <= i; j++) {
            if (j == i) {
                angleSum = angleSum + angleArray[j] / 2;
            } else {
                angleSum = angleSum + angleArray[j];
            }
        }
        y2[i] = oy - rr * Math.cos((angleSum) * Math.PI / 180);
    }

    var angle1 = [];
    for (i = 0; i < angleArray.length; i++) {
        var angleSum = 0;
        for (j = 0; j <= i; j++) {
            if (j == 0) {
                angleSum = 0 - 90;
            } else {
                angleSum = angleSum + angleArray[j - 1];
            }
        }
        angle1[i] = angleSum * Math.PI / 180;
    }

    var angle2 = [];
    for (i = 0; i < angleArray.length; i++) {
        var angleSum = 0;
        for (j = 0; j <= i; j++) {
            angleSum = angleSum + angleArray[j];
        }
        angle2[i] = (angleSum - 90) * Math.PI / 180;
    }

    var lenUnderBarPerFont = fontSize * 19 / 30;

    for (i = 0; i < x1.length; i++) {
        context.beginPath();
        context.arc(ox, oy, r, angle1[i], angle2[i], false);
        context.lineTo(ox, oy);
        context.fillStyle = color[i];
        context.fill();

        context.beginPath();
        context.moveTo(x1[i], y1[i]);
        context.lineTo(x2[i], y2[i]);
        if (x2[i] > ox) {
            var len = labels[i].length * lenUnderBarPerFont;
        } else {
            var len = - labels[i].length * lenUnderBarPerFont;
        }
        context.lineTo(x2[i] + len, y2[i]);
        context.stroke();

        context.font = fontSize + "px " + font;
        context.textBaseline = "bottom";
        if (x2[i] > ox) {
            context.fillText(labels[i], x2[i] + (fontSize * 10 / 30), y2[i]);
        } else {
            var len = labels[i].length * lenUnderBarPerFont;
            context.fillText(labels[i], x2[i] - len, y2[i]);
        }

    }
}
