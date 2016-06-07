
var getSkuId = 1000 ;  /* Id produst Sale History */
var unSortedObj = [];  /* Temp array for sorted. */
var nds = 18;           /* Looks like its a default value  */

$(document).ready(function(){
        /*set the picture */   
//    document.getElementById('pict').src = imagePath;
setPicture()
function setPicture(){
    var getPicInDoc = document.getElementById('pict');

    switch(+getSkuId){
        case 3000: getPicInDoc.src = "img/prost_cottCheese_0_.jpg";
            break;
        case 2000: getPicInDoc.src = "img/prost_cottCheese_5_.jpg";
            break;
        default: getPicInDoc.src = imagePath;
            }
}
        
grabAttrib()
            /* Grab an attribute */   
function grabAttrib(){
    var grAtt = 0; 
    /* Find out index of element in array by ID */
    $.each(sku, function(index, val) {
    if(val.id == getSkuId){
      grAtt = index;  
    }
});  
            /* Set element to DOM*/
    $.each(sku, function(index, val) {
    if(grAtt == index){
    $('.articul').eq(0).append(val.unit);
    $('.articul').eq(1).append(val.weight);
    $('.articul').eq(2).append(val.group);
    $('.articul').eq(3).append(nds);
    }
});
} 
 /*  Grab Sale History  */ 
    /* Find out Index by ID */
findId(salesDate)

function findId(obj){
$.each(obj, function(index, val) {
    if(val.skuId == getSkuId){
    getSaledProduct(index);
    }
 }); 
}
  /*  Take product from all by ID  */
function getSaledProduct(skuID){
    $.each(salesDate, function(index, val) {
        if(skuID == index){ 
            unSortedObj.push({
                "date": val.date, 
                "guantity": val.guantity
            });
        }
    });
}

     /*  Sorting obj and show to html DOM  */
putSortedSales()
function putSortedSales(){
    
    /* Sort our tmp onj */
    var saleSorted = unSortedObj.sort(function(a,b){
    var c = new Date(a.date);
    var d = new Date(b.date); 
    return c-d > 0 ? -1 : 1;
});
    
    
    /*  Show our sorted obj  */
$.each(saleSorted, function(index, val) { 
    var formatDate = convertDate(val.date);
    var guantity = val.guantity;
    $('#saleHistByDate').append('<div class="saledProducts"><span class="slider"> &or; </span>'
                                + formatDate + ' <span class="guantity">'
                                + val.guantity +' Ед.</span></div>');
    /*  adding block with saling list by calling  selingList func */
    $.each(skuName, function(index, val) { 
        if(val.id == getSkuId){
        selingList(guantity, index);
        }
    });
});
}
        /* Seling List  */
function selingList(guantityVal, ind){      
    $.each(skuName, function(index, val) { 
    if(ind == index){
     $('#saleHistByDate').append('<div class="saledList">'
                                + val.name + ' <span class="saledProduct">'
                                + guantityVal +' Ед.</span></div>');
    }
 });
}

    /*   Show sales history     */ 

$('#showHist').on('click', function(){
    var showHideHistory =  $(this).filter('#showHist').children();
    var opasityEffct = $(this).filter('#showHist');
    var backgrdEff = $(this).parent(),                          //
            x = 300,                                            //
                orgColor = backgrdEff.css('background');        //
                                                                //  Visual effect
    backgrdEff.css({'background-color' : '#F9F9F9'});           //  when click
    setTimeout(function(){                                      //  on button
        backgrdEff.css('background', orgColor)                  //
    }, x);                                                      //
    
        /*  Show History sorted by date   */
    if($(this).next('#saleHistByDate').is(':visible')){   
        opasityEffct.fadeTo( "fast", 0.4 );
        showHideHistory.replaceWith('<h2>ПОКАЗАТЬ ИСТОРИЮ ПРОДАЖ</h2>');
        opasityEffct.fadeTo( "fast", 1 );
    }else{
        opasityEffct.fadeTo( "fast", 0.4 );
        showHideHistory.replaceWith('<h2>СКРЫТЬ ИСТОРИЮ ПРОДАЖ</h2>');
        opasityEffct.fadeTo( "fast", 1 );
    }
    $(this).next('#saleHistByDate').slideToggle();
    
    
      /*  Close saled product list in history if it dosent  */
    if($('.saledList').is(':visible')){    $('#saleHistByDate').find('.saledList:visible').prev().find('.slider').replaceWith('<span class="slider"> &or; </span>');
    $('.saledList').slideUp();
    }
      
});    

    /*    Slider show saledProducts      */
showSaledProducts()
function showSaledProducts(){
$('.saledProducts').on('click', function(){
    var slider = $(this).find('.slider');
    

    if($(this).next('.saledList').is(':visible')){
    slider.replaceWith('<span class="slider"> &or; </span>');
    slider.replaceWith('<span class="slider"> &and; </span>'); 
    }else{
    slider.replaceWith('<span class="slider"> &and; </span>');
    slider.replaceWith('<span class="slider"> &or; </span>'); 
    }
      
    $(this).next('.saledList').slideToggle();
});   
}
    /*   Choose fat value   */
    /* Func for add fatValue menu */
function makeBloclFatValue(){
    $('#fatParrent').append(
        '<div class="fatValue"><label><input type="radio" name="cotCheeseFatValue" value="3000">  0 %</label> </div>'
    ).slideDown();
    $('#fatParrent').append(
        '<div class="fatValue"><label><input type="radio" name="cotCheeseFatValue" value="2000"> 5 % </label></div>'
    ).slideDown();
    $('#fatParrent').append(
        '<div class="fatValue"><label><input type="radio" name="cotCheeseFatValue" value="1000"> 9 % <label></div>'
    ).slideDown(); 
}
   /* Click listener for fatChooser */ 
$('#fatChoser').on('click', function(){
    
    /*  Show variand of fatValue  */
   if( $('.fatValue').is(':visible')){
        $('.fatValue').slideUp();
   }else{ 
       makeBloclFatValue();
        }
    
    /* Set radio tu current value */
    RadionButtonSelectedValueSet(getSkuId);
    function RadionButtonSelectedValueSet(SelectdValue) {
    $('input[name="cotCheeseFatValue"][value="' + SelectdValue + '"]').prop('checked', true);
}
        /*  Find out witch radio is selected  */
    $('.fatValue input').on('change', function(){
        getSkuId =   $('input[name=cotCheeseFatValue]:checked','.fatValue').val(); 

        /* Closing all list if it open  */
    if($('#showHist').next('#saleHistByDate').is(':visible')){
            setTimeout(function(){
            $('#showHist').trigger('click');
            }, 100);        
    }
        /* other Faa value selected so we set the new parameters */
    /* Clean existing values */    
eraseSaleHistByDate()
eraseAttrib()
grabAttrib()
        
        /* adding new Value */
findId(salesDate)
putSortedSales()
showSaledProducts()
setPicture()
});
});

function eraseSaleHistByDate(){
    $('#saleHistByDate div').remove();
    unSortedObj.splice(0, unSortedObj.length); 
}
function eraseAttrib(){
    $('.articul').eq(0).html('');
    $('.articul').eq(1).html('');
    $('.articul').eq(2).html('');
    $('.articul').eq(3).html('');
}
    
 
function convertDate(inputValue) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputValue);
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('.');
}   
});