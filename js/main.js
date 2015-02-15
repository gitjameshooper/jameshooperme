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
  var ResumeView = Backbone.View.extend({
        tagName: 'article',
        id: 'resume',
        initialize: function() {
          $(".video-overlay.darker").fadeIn(2000);
          $("section").html(this.el).hide().fadeIn(2000);
          this.render();
        },
        render: function() {
          var template = _.template($('#resume-template').html());
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

  var PageRouter = Backbone.Router.extend({
        routes: {
            "home": "homeRoute",
            "about": "aboutRoute",
            "resume": "resumeRoute",
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
        resumeRoute : function() {
          this.loadView(new ResumeView());
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

