require.config({
    paths: {
        templates:      '../templates',
        Handlebars:     'handlebars',
        text:           'text',
        hbars:          'hbars',
        json :          'json'
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
});
require(['jquery',"underscore", "backbone","modernizer", "cards", "hbars!templates/about", "hbars!templates/portfolio", "hbars!templates/contact", "hbars!templates/modal"], 
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
          "click #email-btn": "sendEmail"
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
            this.$el.fadeIn(2000, function(){
                var cards = new Cards;
                cards.init();
            });
            
          },
          events :{
            "click .close-modal": "close"
          },
          close: function(){
            this.$el.fadeOut(1000, function(){
              this.remove();
            });
            
          }
  });
   
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

 


