$(function(){
  var HomeView = Backbone.View.extend({
        tagName: 'article',
        id: 'home',
        initialize: function() {
          $("section").html('');
          $(".video-overlay.darker").fadeOut(2000);
           
        } 
    });
  var AboutView = Backbone.View.extend({
        tagName: 'article',
        id: 'about',
        initialize: function() {
          $(".video-overlay.darker").fadeIn(2000);
          $("section").html(this.el).hide().fadeIn(2000);
          this.render();
        },
        render: function() {
          var template = _.template($('#about-template').html());
          this.$el.html(template);
        },
        close: function(){
          this.remove();
        }
    });
   
  var PortfolioView = Backbone.View.extend({
        tagName: 'article',
        id: 'portfolio',
        initialize: function() {
          $(".video-overlay.darker").fadeIn(2000);
          $("section").html(this.el).hide().fadeIn(2000);
          this.render();
        },
        render: function() {
          var template = _.template($('#portfolio-template').html());
          this.$el.html(template);
        },
        events:{
            "click .website-list li": "getMedia"
        },
        getMedia: function(e){

             new MediaView({ collection: albumCollection, sid: e.currentTarget.id });
        },
        close: function(){
          this.remove();
        }
    });
  var ContactView = Backbone.View.extend({
        tagName: 'article',
        id: 'contact',
        initialize: function() {
          $(".video-overlay.darker").fadeIn(2000);
          $("section").html(this.el).hide().fadeIn(2000);
          this.render();
        },
        render: function() {
          var template = _.template($('#contact-template').html());
          this.$el.html(template);
        },
        close: function(){
          this.remove();
        },
        events: {
          'click #email-btn': 'sendEmail'
        },
        sendEmail: function(){
          $("#contact-form").submit(function(e){
            return false;
          });
       
          $.ajax({
            type: "POST",
            url: "email.php",
            data: $('#contact-form').serialize(),
            success: function(){
              $('#form-name').val('');
              $('#form-email').val('');
              $('#form-text').val('');
              $('.success').fadeIn(2000 , function(){
              $('.success').fadeOut(4000);
              }); 
            },
            error: function(){
              $('.no-success').fadeIn(2000 , function(){
                   $('.no-success').fadeOut(4000);
              }); 
            }
          });
        }
    });
   
  var MediaView = Backbone.View.extend({
          tagName: 'div',
          id: 'media',
           
          initialize: function(){
             
              this.render();
          },

          render: function(){
           
            $('.viewport').append(this.$el);
            window.console.log(this.collection);

              
          }
  });
 
  var MediaModel = Backbone.Model.extend({
          defaults :{
            "id": "",
            "imgSrc": "",
            "url": ""
          },
          initialize: function(){
             
          }
  });

  var MediaCollection = Backbone.Collection.extend({
        model: MediaModel
    });

    var song1 = new MediaModel({ id: "wafresh", imgSrc: "wafresh.jpg", url: "http://www.wafresh.com.au/" });
    var song2 = new MediaModel({ id: "wajim", imgSrc: "wafresh.jpg", url: "http://www.wafresh.com.au/" });
    var song3 = new MediaModel({ id: "wafsh", imgSrc: "wafresh.jpg", url: "http://www.wafresh.com.au/" });
    var albumCollection = new MediaCollection([ song1, song2, song3]);
    
     

  var PageRouter = Backbone.Router.extend({
        routes: {
            "home": "homeRoute",
            "about": "aboutRoute",
            "portfolio": "portfolioRoute",
            "contact": "contactRoute",
            "*actions": "homeRoute",
        },
        homeRoute : function() {
          this.loadView(new HomeView());
        },
        aboutRoute : function() {
          this.loadView(new AboutView());
        },
        portfolioRoute : function() {
          this.loadView(new PortfolioView());
          
        },
        contactRoute : function() {
          this.loadView(new ContactView());
        },
        loadView : function(view) {
          this.view && (this.view.close ? this.view.close() : this.view.remove());
          this.view = view;
        }
        
    });
     
    var pageRouter = new PageRouter;
 
    Backbone.history.start();

 
    

     
    
  var hoverInterval;

    function doStuff() {
        
        $(".viewport").animate({ left: "+=500px", bottom: "+=500px"}, 10000);
    }

    
        $(".viewport").hover(
            function() {
                // call doStuff every 100 milliseconds
                hoverInterval = setInterval(doStuff, 1000);
            },
            function() {
                // stop calling doStuff
                clearInterval(hoverInterval);
            }
        );
    
  
});

 


