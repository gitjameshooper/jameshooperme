require({
    paths: {
        templates:      '../templates',
        Handlebars:     'handlebars',
        text:           'text',
        hbars:          'hbars'
    },
    shim: {
        Handlebars: {
            exports: 'Handlebars'
        }
    },

    onBuildWrite : function(moduleName, path, content){

        // replace handlebars with the runtime version
        if (moduleName === 'Handlebars') {
            path = path.replace('handlebars.js','handlebars.runtime.js');
            content = fs.readFileSync(path).toString();
            content = content.replace(/(define\()(function)/, '$1"handlebars", $2');
        }
        return content;
    }

},['jquery',"underscore", "backbone","modernizer", "cards", "hbars!templates/about", "hbars!templates/portfolio", "hbars!templates/contact", "hbars!templates/modal"], 
  function($, _, Backbone, Modernizer, Cards, aboutTemp, portfolioTemp, contactTemp, modalTemp)
{

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
          this.$el.html(aboutTemp);
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
          this.$el.html(portfolioTemp);
 
        },
        events:{
            "click button.getModal": "getModal"
        },
        getModal: function(){
             new ModalView();
              
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
          this.$el.html(contactTemp);
        },
        close: function(){
          this.remove();
        },
        events:{
            "click span.getModal": "getModal"
        },
        getModal: function(){
             new ModalView();
              
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
  var ModalView = Backbone.View.extend({
          tagName: 'div',
          id: 'modal',

          initialize: function(){
            this.render();
          },
          render: function(){
             
            $('body').prepend(this.$el.html(modalTemp));
            var cards = new Cards;
            cards.init();
          },
          events :{
            "click .close-modal": "close"
          },
          close: function(){
            this.remove();
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

  
    
  
});

 


