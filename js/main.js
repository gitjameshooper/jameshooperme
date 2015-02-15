$(function(){
  var HomeView = Backbone.View.extend({
        tagName: 'article',
        id: 'home',
        initialize: function() {
          $("section").html('');
           
        } 
    });
  var AboutView = Backbone.View.extend({
        tagName: 'article',
        id: 'about',
        initialize: function() {
          $("section").html(this.el).hide().fadeIn(3000);
          this.render();
        },
        render: function() {
          this.$el.html("<h1>This is the about page</h1>");
        },
        close: function(){
          this.remove();
        }
    });
  var PortfolioView = Backbone.View.extend({
        tagName: 'article',
        id: 'portfolio',
        initialize: function() {
          $("section").html(this.el).hide().fadeIn(3000);
          this.render();
        },
        render: function() {
          this.$el.html("<h1>This is the portfolio page</h1>");
        },
        close: function(){
          this.remove();
        }
    });
  var ContactView = Backbone.View.extend({
        tagName: 'article',
        id: 'contact',
        initialize: function() {
          $("section").html(this.el).hide().fadeIn(3000);
          this.render();
        },
        render: function() {
          this.$el.html("<h1>This is the contact page</h1>");
        },
        close: function(){
          this.remove();
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