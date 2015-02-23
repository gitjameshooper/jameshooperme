define(["jquery","snabbt"], function($, snabbt)
{
  
  var imgdata = [
       'img/websites/ahha.jpg',
       'img/websites/caravan.jpg',
        'img/websites/construction.jpg',
        'img/websites/english.jpg',
        'img/websites/fudge.jpg',
        'img/websites/totelcom.jpg',
        'img/websites/wafresh.jpg',
        'img/websites/desires.jpg',
        'img/websites/dlprint.jpg',
        'img/websites/greensplus.jpg',
        'img/websites/halosleep.jpg',
        'img/websites/holycross.jpg',
        'img/websites/threeby.jpg',
        'img/websites/turtle.jpg',
        'img/websites/wildseed.jpg'
         
  ];
  function Deck(imgdata){
    this.cards = [];
    this.card_index = [];
    this.$container = $('#surface');

    
    this.create_card = function(index){
       
      var card = document.createElement('div');
      var imgEl = document.createElement('img');
      card.className = 'card';
      card.style.background = 'red';
       
      imgEl.setAttribute('src',imgdata[index]);
      card.appendChild(imgEl);
        
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
    for(var i=0;i<30;++i) {
      
      this.cards.push(this.create_card(i));
    }
    return this;
  }
  
 
  function CardViz(){
    this.Deck = new Deck(imgdata);
    this.config = {
        CARD_HEIGHT : 125,
        CARD_WIDTH : 300,
        CARD_COUNT : 30,
        WIDTH : 500,
        HEIGHT : 500, 
    }
     
    return this;
  }

  CardViz.prototype.update_sizes = function() {
        this.container = document.getElementById('cylinder-container');
        this.config.WIDTH = this.container.clientWidth;
        this.config.HEIGHT = this.container.clientHeight;
        CARD_WIDTH = this.config.WIDTH * 0.10;
        CARD_HEIGHT = this.config.HEIGHT * 0.15;
         
        
        for(var i=0;i<this.Deck.cards.length;++i) {
          this.Deck.card_at(i).style.height = CARD_HEIGHT + 'px';
          this.Deck.card_at(i).style.width = CARD_WIDTH + 'px';
        }
  };
  
 
  CardViz.prototype.build_formation = function(positions) {
     this.Deck.reset();
      
    for(i=0;i<positions.length;++i) {
      snabbt(this.Deck.next_card(), {
        position: positions[i].position,
        rotation: positions[i].rotation,
        easing: 'ease',
        delay: i * 100
      });
    }
  };
   
  CardViz.prototype.rotate_container = function() {
    var container = document.getElementById('surface');
    var it = snabbt(container, {
      rotation: [0, 2*Math.PI, 0],
      duration: 20000,
      perspective: 2000,
      loop: Infinity
    });
    
     
  };
  CardViz.prototype.pile_positions = function() {
     this.Deck.reset();
      var positions = [];

      var i = 0;
      var card = this.Deck.next_card();
      var center = (this.config.WIDTH - this.config.CARD_WIDTH)/2;
      var y = this.config.HEIGHT - this.config.HEIGHT*0.2;
      while(card) {
        positions.push({
          position: [center, y - i*0.5, this.config.WIDTH*0.1],
          rotation: [Math.PI/2, 0, 0],
        });
        ++i;
        card = this.Deck.next_card();
      }
      return positions;
  };
  CardViz.prototype.cylinder_positions = function() {
    var positions = [];
    var start_x = this.config.WIDTH / 2.2;
    var start_y = this.config.HEIGHT * 0.1;
    var radius = this.config.WIDTH*0.2;
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