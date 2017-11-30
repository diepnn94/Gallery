function openModal(){
  document.getElementById("myModal").style.display = "block";
}

function closeModal(){
  $("#modalContent").children().remove();
  $("#slideShow").children().remove();
  document.getElementById("myModal").style.display="none";
}


function loadSlideShow(index, length){
    var col = $("<div class = 'col'></div>").html("");
      var i;
      var increment = 0;
      var slideLimit = 5;
      if (length < slideLimit){
        slideLimit = length
      }
      for (i =index; increment < slideLimit ; i++, increment++){
        if (i == length){
          i = 0;
        }
        var image_slides = $('<img class="slidesImg" src="'+ $("#gallery img").eq(i).attr("src")+'">');
        $(col).append(image_slides);
      }
      
      $(col).append("<br><br>");
      $("#slideShow").append(col);
      $("#slideShow img").eq(0).css("opacity", "1");
      $("#slideShow img").click(function(){
        var slideIndex = $("#slideShow img").index(this);
        $("#gallery img").eq((slideIndex+index)%length).click();
      })
}

function previousImage(index, length){
  prevIndex = index-1;
  if (prevIndex < 0){
    prevIndex = length-1;
  }
  $("#gallery img").eq(prevIndex).click();
}

function nextImage(index, length){
  nextIndex = index+1;
  if (nextIndex == length){
    nextIndex = 0;
  }
  $("#gallery img").eq(nextIndex).click();
}



function galleryActive(){
  $("#gallery img").click(function(){
    // remove the pic on current display
    $("#modalContent").children().remove();
    // remove the 5 preview pics
    $("#slideShow").children().remove();

    var img_src = $(this).attr("src");
    var caption = $(this).attr("alt");
    var index = $("#gallery img").index(this);
    var length = $("#gallery img").length;

    var div = $("<div class='mySlides'></div>").html("");
    var img_file = $("<img  src = '"+ img_src + "' class='slideOnView'>");
    var caption = $("<center><div  class = 'caption' style='color:white;background-color:black;padding:2vmax;'>" + caption + "</div></center>");
    var prev = $('<a class="prev">&#10094;</a>');
    var next = $('<a class="next">&#10095;</a>');

    // loadSlideShow(index, length);

    $(div).append(img_file);
    $(div).append(caption);
    $(div).append(prev);
    $(div).append(next);
    $("#modalContent").append(div);
    // load the next 5 preview pics
    if (length>1){
      loadSlideShow(index, length);
      $(".prev").click(function(){
        previousImage(index, length);
      })
      $(".next").click(function(){
        nextImage(index, length);
      })
    }

    openModal();
  })
}


function loadImages(dir){
  $.ajax({
    url:dir,
    success: function(data){
      $("#gallery").children().remove();
      $(data).find("a").attr("href", function(i, val){
        if( val.match(/\.(jpe?g|png|gif)$/) ){
          var imageList = $('<div class="col-lg-3 col-md-3 col-sm-3 col-xs-4"></div>').html("");
          var images = $("<img class='thumbnail galleryImg' src='"+ dir + val +"' alt='Lorem ipsum donec id elit non mi porta gravida at eget metus.'>");
          $(imageList).append(images);
          $("#gallery").append(imageList);
      }
      })
      galleryActive();
    }
  })
}
