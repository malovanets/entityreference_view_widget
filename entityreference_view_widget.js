(function($) {
Drupal.behaviors.entityreferenceViewWidget = {
  attach: function(context, settings) {
    var widget_settings = JSON.parse($('#entityreference-view-widget-field-settings').val());
    
    console.log(context);
    console.log(settings);
    
    $('table[id^=field-entity-reference-view-test-values] tbody tr').each(function(e,i){
      //alert(e);
    });
    
    //alert(settings.url);
    $('.field-widget-entityreference-view-widget .field-add-more-submit:not(.modal-trigger-processed)', context).each(function(i, obj) {             
      // Create a drupal ajax object
      $(this).click(function(){ alert('!!!!!!');
        Drupal.CTools.Modal.clickAjaxLink;        // This is to pop up the modal as soon as the user clicks the element.
      });
      var element_settings = {};
      element_settings.url = widget_settings.url;        
      element_settings.event = 'click';
      element_settings.progress = { type: 'throbber' };
      var base = widget_settings.url;
      Drupal.ajax[base] = new Drupal.ajax(base, obj, element_settings);
      $(obj).addClass('modal-trigger-processed');           // Add a class to flag that this element has already been processed.
    });
  }
}
})(jQuery);