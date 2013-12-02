(function($) {
Drupal.behaviors.entityreferenceViewWidget = {
  attach: function(context, settings) {
    $('#entityreference-view-widget-modal-submit').click(function(){
      var field_name = $('#entityreference-view-widget-field-name').val();
      var field_frontend_name = field_name.replace(/\_/g, '-');
      var widget_settings = JSON.parse($('#entityreference-view-widget-' + field_frontend_name + '-settings').val());
      var offset = $('#' + widget_settings.table_id + ' tbody tr').length;
      var entity_ids = $('input[name="entity_ids[]"]').serialize();
      var query_string = entity_ids + '&field_name=' + field_name + '&langcode=' + widget_settings.langcode + '&target_type=' + widget_settings.target_type;
      
      $('#' + widget_settings.table_id + ' input[type=checkbox]:checked').each(function(){
        query_string += '&default_entity_ids[' + $(this).data('delta') + ']=' + $(this).val();
      });

      $.ajax({
        'url': '/?q=entityreference_view_widget/ajax',
        'type': 'POST',
        'dataType': 'html',
        'data': query_string,
        'success': function(data) {
          data && $('#' + widget_settings.table_id + ' tbody').html($('tbody', data).html());          
          $('#' + widget_settings.table_id + ' tbody tr').each(function(){
            var el = $(this);
            if (!el.find('.tabledrag-handle').length) {
              Drupal.tableDrag[widget_settings.table_id].makeDraggable(el.get(0));
              el.find('td:last').addClass('tabledrag-hide');
              if ($.cookie('Drupal.tableDrag.showWeight') == 1) {
                el.find('.tabledrag-handle').hide();
              }
              else {
                el.find('td:last').hide();
              }
            }
          });  
        }
      });
    });
  }
}
})(jQuery);