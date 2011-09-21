$(document).ready(function() {
		
	var draw= false;
       
        var canvas = document.getElementById("can");
        var ctx = canvas.getContext("2d");
        //Initiate Variables for the canvas
        ctx.strokeStyle = 'black';
        var line_size = 1;
        $('#line_size').val(line_size);
        ctx.lineWidth = line_size;
        ctx.lineCap = "round";
        var x, y
        

        //set it true on mousedown
        $("#can").mousedown(function(){
          draw=true;
        
          x = e.pageX - $(ctx.canvas).offset().left;
          y = e.pageY - $(ctx.canvas).offset().top;
          // Store the current x, y positions
          ctx.oldX = x;
          ctx.oldY = y;
        
        });

        //reset it on mouseup
        $("#can").mouseup(function(){draw=false;});

        $("#can").mousemove(function(e) {
          x = e.pageX - $(ctx.canvas).offset().left;
          y = e.pageY - $(ctx.canvas).offset().top;		
        		
	  var pageCoords = "( " + x + ", " + y + " )";
	  $("span#coords").text("( e.pageX, e.pageY ) - " + pageCoords);
        		
            if(draw==true){
                    ctx.beginPath();
                    ctx.moveTo(ctx.oldX,ctx.oldY);
                    ctx.lineTo(x,y);
                    ctx.stroke();
            }    
            
           ctx.oldX = x; 
           ctx.oldY = y;
            
       });

	
       //code for color pallete
        $("#clr > div").click(function(){
               ctx.strokeStyle = $(this).css("background-color");
               $("#clr > div").removeClass('color_selected');
               $(this).addClass('color_selected');
               
               bs = $(".button_selected").attr('id');
               if(bs == 'eraser'){
               	  $("#eraser").removeClass('button_selected');
                  $("#pen").addClass('button_selected');     
               }
        });
     
        $(".buttons div").click(function(){
            bs = $(this).attr('id');		
        		
            if(bs != 'clear' && bs != 'save'){		
              $(".buttons div").removeClass('button_selected');
              $(this).addClass('button_selected');	
            }
        });
        
        //pen
        $("#pen").click(function(){
            ctx.strokeStyle = $("#clr").find('div.color_selected').css("background-color");
        });
        
        //Eraser
        $("#eraser").click(function(){
            ctx.strokeStyle = '#fff';
        });

        //Code for save the image
        $("#save").click(function(){ 
            $("#result").append("<br /><br /><img src="+
            canvas.toDataURL()+ 
           " /><br /><a href="+canvas.toDataURL()+ 
           " target='_blank'>show</a>");
        });
     
        //Clear 
        $("#clear").click(function(){
                 ctx.fillStyle = "#fff";
                 ctx.fillRect(0, 0, canvas.width, canvas.height);
                 ctx.strokeStyle = "red";
                 ctx.fillStyle = "red";
            }
         ); 
        
        //set the line size
        $('#line_size').keyup(function(){
        	line_value = $(this).val().replace(/[^0-9]/g, "");
        	if(line_value == '0'){
        	  line_value = 1;	
        	}
        	
        	$(this).val(line_value);
        	
        	if(line_value == ''){
        	  line_value = 1;	
        	}
        	
          	ctx.lineWidth = line_value;	
        });
        
});
