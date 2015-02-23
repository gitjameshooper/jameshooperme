define(["jquery","snabbt"], function($, snabbt)
{
  
  
  function Deck(){
    this.cards = [];
    this.card_index = [];
    this.$container = $('#surface');

    
    this.create_card = function(index){
       
      var card = document.createElement('div');
      card.className = 'card';
      card.style.background = 'red';

      this.$container.append(card);
      return card;
   
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
    for(var i=0;i<29;++i) {
      
      this.cards.push(this.create_card(i));
    }
    return this;
  }
  
 
  function CardViz(){
    this.Deck = new Deck();
    this.config = {
        CARD_HEIGHT : 100,
        CARD_WIDTH : 60,
        CARD_COUNT : 29,
        
        WIDTH : 800,
        HEIGHT : 600,
        BOTTOM : 400,

        TILT : Math.PI/8,
        PYTH_ANGLE : Math.PI/2 - this.TILT,

        TILTED_CARD_HEIGHT : Math.sin(this.PYTH_ANGLE) * this.CARD_HEIGHT + 2,
        TILTED_CARD_WIDTH : Math.cos(this.PYTH_ANGLE) * this.CARD_HEIGHT,
        CARD_SPACING : 2
 
    }
     
    return this;
  }

  CardViz.prototype.update_sizes = function() {
        this.container = document.getElementById('cylinder-container');
        WIDTH = this.container.clientWidth;
        HEIGHT = this.container.clientHeight;
        CARD_WIDTH = WIDTH * 0.05;
        CARD_HEIGHT = HEIGHT * 0.15;
        TILTED_CARD_HEIGHT = Math.sin(this.config.PYTH_ANGLE) * CARD_HEIGHT + 2;
        TILTED_CARD_WIDTH = Math.cos(this.config.PYTH_ANGLE) * CARD_HEIGHT;
        
        for(var i=0;i<this.Deck.cards.length;++i) {
          this.Deck.card_at(i).style.height = CARD_HEIGHT + 'px';
          this.Deck.card_at(i).style.width = CARD_WIDTH + 'px';
        }
  };
  
 
  CardViz.prototype.build_formation = function(positions) {
     this.Deck.reset();
     window.console.log(positions);
    for(i=0;i<positions.length;++i) {
      snabbt(this.Deck.next_card(), {
        position: positions[i].position,
        rotation: positions[i].rotation,
        easing: 'ease',
        delay: i * 50
      });
    }
  };
   
  CardViz.prototype.rotate_container = function() {
    var container = document.getElementById('surface');
    snabbt(container, {
      rotation: [0, 2*Math.PI, 0],
      duration: 10000,
      perspective: 2000,
      loop: Infinity
    });
  };
  CardViz.prototype.pile_positions = function() {
     this.Deck.reset();
      var positions = [];

      var i = 0;
      var card = this.Deck.next_card();
      var center = (WIDTH - CARD_WIDTH)/2;
      var y = HEIGHT - HEIGHT*0.2;
      while(card) {
        positions.push({
          position: [center, y - i*0.5, WIDTH*0.1],
          rotation: [Math.PI/2, 0, 0],
        });
        ++i;
        card = this.Deck.next_card();
      }
      return positions;
  };
  CardViz.prototype.cylinder_positions = function() {
    var positions = [];
    var start_x = WIDTH / 2;
    var start_y = HEIGHT * 0.1;
    var radius = WIDTH*0.2;
    for(var i=0;i<this.config.CARD_COUNT;++i) {
      var angle = ((i % 10) / 10) * 2 * Math.PI;
      var x = Math.cos(angle) * radius + start_x;
      var z = Math.sin(angle) * radius;
      var y = Math.floor(i / 10) * 1.2 * this.config.CARD_HEIGHT + start_y;
      positions.push({
        position: [x, y, z],
        rotation: [0, Math.PI/2 + angle, 0],
      });
    }
    this.rotate_container();
    return positions;
  };
   

  CardViz.prototype.init = function() {
      this.update_sizes();
      this.Deck.reset();
      this.build_formation(this.pile_positions());
      this.build_formation(this.cylinder_positions());
  };
 
  return CardViz;
});