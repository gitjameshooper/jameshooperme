define(["jquery","snabbt"], function($, snabbt)
{
  
  function cardViz(){
    this.settings = {
       cards: 30
    }
    return this;
  }

  cardViz.prototype.start = function( ) {
      
  };
// Constants
var CARD_HEIGHT = 100;
var CARD_WIDTH = 60;
var CARD_COUNT = 40;

var WIDTH = 800;
var HEIGHT = 600;
var BOTTOM = 400;

var TILT = Math.PI/8;
var PYTH_ANGLE = Math.PI/2 - TILT;

var TILTED_CARD_HEIGHT = Math.sin(PYTH_ANGLE) * CARD_HEIGHT + 2;
var TILTED_CARD_WIDTH = Math.cos(PYTH_ANGLE) * CARD_HEIGHT;
var CARD_SPACING = 2;
var PYRAMID_WIDTH = TILTED_CARD_WIDTH * 2 + CARD_SPACING * 2;

function update_sizes() {
  var c = document.getElementById('container');
  WIDTH = c.clientWidth;
  HEIGHT = c.clientHeight;
  CARD_WIDTH = WIDTH * 0.05;
  CARD_HEIGHT = HEIGHT * 0.15;
  TILTED_CARD_HEIGHT = Math.sin(PYTH_ANGLE) * CARD_HEIGHT + 2;
  TILTED_CARD_WIDTH = Math.cos(PYTH_ANGLE) * CARD_HEIGHT;
  PYRAMID_WIDTH = TILTED_CARD_WIDTH * 2 + CARD_SPACING * 2;
  for(var i=0;i<Deck.cards.length;++i) {
    Deck.card_at(i).style.height = CARD_HEIGHT + 'px';
    Deck.card_at(i).style.width = CARD_WIDTH + 'px';
  }
}

var COLORS = randomColor({
  count: 40,
  luminosity: 'dark',
});


// Formations
var PILE = 1;
var CYLINDER = 2;
var current_mode;

var formation_builders = {};
formation_builders[PILE] = pile_positions;
formation_builders[CYLINDER] = cylinder_positions;

function create_card(container, index) {
  var card = document.createElement('div');
  card.className = 'card';
  card.style.background = COLORS[index % COLORS.length];

  container.appendChild(card);
  return card;
}

// Deck
 
var Deck = (function() {
  this.cards = [];
  this.card_index = [];

  for(var i=0;i<CARD_COUNT;++i) {
    var container = document.getElementById('surface');
    this.cards.push(create_card(container, i));
  }

  this.next_card = function() {
    if(this.card_index > 51)
      return;
    return this.cards[this.card_index++];
  };

  this.card_at = function(index) {
    return this.cards[index];
  };

  this.reset = function() {
    this.card_index = 0;
  };
  return this;
})();
 

function build_formation(positions) {
  Deck.reset();
  for(i=0;i<positions.length;++i) {
    snabbt(Deck.next_card(), {
      position: positions[i].position,
      rotation: positions[i].rotation,
      easing: 'ease',
      delay: i * 50
    });
  }
}

function set_mode(mode) {
  update_sizes();
  if(mode == current_mode) {
    return;
  }

  positions = formation_builders[mode]();
  build_formation(positions);

  current_mode = mode;
}

function rotate_container() {
  var container = document.getElementById('surface');
  snabbt(container, {
    rotation: [0, 2*Math.PI, 0],
    duration: 10000,
    perspective: 2000,
    loop: Infinity
  });
}

function pile_positions() {
  Deck.reset();
  var positions = [];

  var i=0;
  var card=Deck.next_card();
  var center = (WIDTH - CARD_WIDTH)/2;
  var y = HEIGHT - HEIGHT*0.2;
  while(card) {
    positions.push({
      position: [center, y - i*0.5, WIDTH*0.1],
      rotation: [Math.PI/2, 0, 0],
    });
    ++i;
    card = Deck.next_card();
  }
  return positions;
}

 
 
function cylinder_positions() {
  var positions = [];
  var start_x = WIDTH / 2;
  var start_y = HEIGHT * 0.1;
  var radius = WIDTH*0.2;
  for(var i=0;i<CARD_COUNT;++i) {
    var angle = ((i % 10) / 10) * 2 * Math.PI;
    var x = Math.cos(angle) * radius + start_x;
    var z = Math.sin(angle) * radius;
    var y = Math.floor(i / 10) * 1.2 * CARD_HEIGHT + start_y;
    positions.push({
      position: [x, y, z],
      rotation: [0, Math.PI/2 + angle, 0],
    });
  }
  return positions;
}

 
function build_pile() {
  set_mode(PILE);
}

function init() {
  update_sizes();
  Deck.reset();
  build_pile();
  rotate_container();

  // Initialize fast click
  FastClick.attach(document.body);

  // Event handlers
  var buttons = {
    "pile_button": PILE,
    "cylinder_button": CYLINDER
  };

  var click_handler = function(key) {
    document.getElementById('pile_button').className = '';
    document.getElementById('cylinder_button').className = '';
    document.getElementById(key).className = 'button-primary';
    set_mode(buttons[key]);
  };

  for(var key in buttons) {
    document.getElementById(key).addEventListener('click', click_handler.bind(undefined, key));
  }
}
  return cardViz;
});