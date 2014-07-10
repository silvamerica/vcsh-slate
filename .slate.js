S.cfga({
	defaultToCurrentScreen: true,
	nudgePercentOf: 'screenSize',
	resizePercentOf: 'screenSize',
	modalEscapeKey: 'esc'
});


// Centering
var centeredLarge = S.op("move", {
	x: 'screenOriginX + (screenSizeX / 8)',
	y: 'screenOriginY + (screenSizeY / 8)',
	width: '(screenSizeX / 8) * 6',
	height: '(screenSizeY / 8) * 6'
}), centeredSmall = S.op("move", {
	x: 'screenOriginX + (screenSizeX / 4)',
	y: 'screenOriginY + (screenSizeY / 4)',
	width: '(screenSizeX / 4) * 2',
	height: '(screenSizeY / 4) * 2'
}), centerHalf = S.op("move", {
	x: 'screenSizeX / 4',
	y: 'screenOriginY',
	width: 'screenSizeX / 2',
	height: 'screenSizeY'
}), centerThird = S.op("move", {
	x: 'screenSizeX / 3',
	y: 'screenOriginY',
	width: 'screenSizeX / 3',
	height: 'screenSizeY'
}), centerCommand = S.op("chain", {
	operations: [centeredLarge, centeredSmall, centerHalf, centerThird]
});
S.bnd("k:f4:toggle", centerCommand);

// Full Screen
var fullScreen = S.op("move", {
	x: 'screenOriginX',
	y: 'screenOriginY',
	width: 'screenSizeX',
	height: 'screenSizeY'
});

// Pushes
var topHalf = S.op("push", {
	direction: "up",
	style: "bar-resize:screenSizeY/2"
}), bottomHalf = topHalf.dup({direction:"down"});

// Cornering
var cornerTopLeft = S.op("corner", {
  "direction" : "top-left",
  "width" : "screenSizeX/2",
  "height" : "screenSizeY/2"
}), cornerTopRight = cornerTopLeft.dup({ "direction" : "top-right" }),
  	cornerBottomLeft = cornerTopLeft.dup({ "direction" : "bottom-left" }),
  	cornerBottomRight = cornerTopLeft.dup({ "direction" : "bottom-right" });

// Throwing from Screen to Screen
var moveleftOneScreen = function() {
	return S.screen().id() - 1;
},  moveRightOneScreen = function() {
	return S.screen().id() + 1;
};
S.bnda({
	"t:f4": S.op("throw", { screen: moveleftOneScreen }),
	"y:f4": S.op("throw", { screen: moveRightOneScreen })
});


// Layouts
var boxDesk = {
	left: {screen: "0"},
	center: {screen: "1"},
	right: {screen: "2"}
};

var boxDeskLayout = S.layout("boxDesk", {
	// Left Screen
	"Adium": {
		"operations": [
			cornerTopLeft.dup(boxDesk.left),
			cornerTopRight.dup(boxDesk.left),
			cornerBottomLeft.dup(boxDesk.left)
		],
		"title-order": ["Webapp Channel", "Platform"],
		"repeat-last": true
	},
	"Slack": {
		"operations": [
			cornerBottomRight.dup(boxDesk.left)
		]
	},
	"Messenger for Telegram": {
		"operations": [
			cornerTopLeft.dup(boxDesk.left)
		]		
	},
	// Center Screen
	"Sublime Text": {
		"operations": [
			fullScreen.dup(boxDesk.center)
		]
	},
	// Right Screen
	"Google Chrome Canary": {
		"operations": [
			bottomHalf.dup(boxDesk.right),
			topHalf.dup(boxDesk.right)
		],
		"title-order-regex": [".*Developer Tools.*"],
		"repeat-last": true
	}
});

S.bind("1:f4", S.operation("layout", {name: "boxDesk"}));

// http://tadhg.com/wp/2013/08/11/more-slate-tweaking/
// https://gitorious.org/wincent/wincent/source/c1443164af46124643fb80baaa0a97b51803eef5:.slate.js
// Keep a newline or the log line at the end of the file otherwise slate chokes.
S.log("-------------- Finished Loading Config --------------");
