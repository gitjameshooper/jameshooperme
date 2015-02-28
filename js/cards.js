define(["jquery","snabbt", "json!cardData.json"], function($, snabbt, cardData)
{
   
   
  function Deck(cardData){

    this.cards = [];
    this.card_index = [];
    this.$container = $('#surface');

    
    this.create_card = function(index){
       
      var card = document.createElement('div');
      var imgEl = document.createElement('img');
      var aHref = document.createElement('a');
      card.className = 'card';
      aHref.setAttribute('href',cardData.cards[index].link);
      imgEl.setAttribute('src',cardData.cards[index].imgUrl);
      aHref.appendChild(imgEl);
      card.appendChild(aHref);
        
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
    for(var i=0;i<cardData.cards.length;++i) {
      
      this.cards.push(this.create_card(i));
    }
    return this;
  }
  
 
  function CardViz(){
    this.Deck = new Deck(cardData);
    this.config = {
        CARD_HEIGHT : 125,
        CARD_WIDTH : 300,
        CARD_COUNT : cardData.cards.length,
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
        delay: i * 75
      });
    }
  };
   
  CardViz.prototype.rotate_container = function() {
    var container = document.getElementById('surface');
    snabbt(container, {
      rotation: [0, 2*Math.PI, 0],
      duration: 8000,
      perspective: 2000,
      loop: Infinity
    });
    $('.card').hover(function(){
      snabbt(container, 'stop');
      snabbt(container, {
        rotation: [0, 2*Math.PI, 0],
        duration: 30000,
        perspective: 2000,
        loop: Infinity
      });
    },function(){
       snabbt(container, 'stop');
        snabbt(container, {
          rotation: [0, 2*Math.PI, 0],
          duration: 8000,
          perspective: 2000,
          loop: Infinity
        });

    });
     
    
     
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
     
      this.build_formation(this.cylinder_positions());
  };
 
  return CardViz;
});