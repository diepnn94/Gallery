function loadImages(dir, section) {
  $.ajax({
    url: dir,
    success: function(data) {
      var section_target = "#" + section;
      var count = 0;
      $(data).find("a").attr("href", function(i, val) {
        if (val.match(/\.(jpe?g|png|gif)$/)) {
          var previewList = $('<div class="item"></div>').html("");
          var images = $("<img src='" + dir + val + "'>");
          $(previewList).append(images);
          $(section_target).append(previewList);
          count++;
        }
      });
      // if there is no image, remove the carousel class and say "comming soon"
      if (count == 0) {
        var parent = $(section_target).parent().parent();
        $(section_target).parent().remove().removeClass();
        var description = $("<br><p>Comming Soon....</p>");
        $(parent).append(description);
      }
      // if there is any image, create next/prev to slide image
      else if (count > 0) {
        var parent = $(section_target).parent().attr('id');
        var leftCarouselControl = $("<a class='left carousel-control' href='#" + parent + "' data-slide='prev'>").html("");
        var leftSpan = $('<span class="glyphicon glyphicon-chevron-left"></span>');
        $(leftCarouselControl).append(leftSpan);
        var rightCarouselControl = $("<a class='right carousel-control' href='#" + parent + "' data-slide='prev'>").html("");
        var rightSpan = $('<span class="glyphicon glyphicon-chevron-right"></span>');
        $(rightCarouselControl).append(rightSpan);
        $(section_target).parent().append(rightCarouselControl);
        $(section_target).parent().append(leftCarouselControl);
        $(section_target).children().eq(0).addClass('active');
      }
    }
  })
}
