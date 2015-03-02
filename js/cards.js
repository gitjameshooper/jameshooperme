define(["jquery","snabbt", "json!cardData.json"], function($, snabbt, cardData)
{
   
  function Deck(cardData){

    this.cards = [];
    this.card_index = [];
    this.$container = $('#surface');

    this.create_card = function(index){
      var $card = $('<div class="card"><a href="'+cardData.cards[index].link+'"><img src="'+cardData.cards[index].imgUrl+'"></a></div>');
      this.$container.append($card);
      return $card;
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
    for(var i=0;i<cardData.cards.length;++i) {
      this.cards.push(this.create_card(i));
    }
    return this;
  }
  
 
  function CardViz(){
    this.Deck = new Deck(cardData);
    this.$CONTAINER = $('#cylinder-wrapper');
    this.$SURFACE = $('#surface');
    this.config = {
        CARD_HEIGHT : 120,
        CARD_WIDTH : 300,
        CARD_COUNT : cardData.cards.length,
        WIDTH : this.$CONTAINER.width(),
        HEIGHT : this.$CONTAINER.height() 
    }
    return this;
  }

  CardViz.prototype.update_sizes = function() {
        
      CARD_WIDTH = this.config.WIDTH * 0.20;
      CARD_HEIGHT = this.config.HEIGHT * 0.25;
       
      for(var i=0;i<this.Deck.cards.length;++i) {
        
        this.Deck.card_at(i).height(CARD_HEIGHT + 'px');
        this.Deck.card_at(i).width(CARD_WIDTH + 'px');
      }
  };
  
 
  CardViz.prototype.build_formation = function(positions) {
     this.Deck.reset();
      
    for(i=0;i<positions.length;++i) {
      snabbt(this.Deck.next_card(), {
        position: positions[i].position,
        rotation: positions[i].rotation,
        easing: 'ease',
        delay: i * 75
      }); 
    }
     
  };
   
  CardViz.prototype.rotate_container = function() {
     
    snabbt(this.$SURFACE, {
      rotation: [0, 2*Math.PI, 0],
      duration: 30000,
      perspective: 2000,
      loop: Infinity
    });
    this.$SURFACE.hover(function(){
      snabbt(this.$SURFACE, 'stop');
    });
  };
  
  CardViz.prototype.cylinder_positions = function() {
    var positions = [];
    var start_x = this.config.WIDTH / 2.5;
    var start_y = this.config.HEIGHT * 0.1;
    var radius = this.config.WIDTH*0.4;
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
      this.build_formation(this.cylinder_positions());
  };
 
  return CardViz;
});