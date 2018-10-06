/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function printDiv(divName) {
    var w = window.open();
    var printContents = document.getElementById(divName).innerHTML;
    var header = document.head.innerHTML;
    //var originalContents = document.body.innerHTML;
    
    //document.body.innerHTML = printContents;
    w.document.body.innerHTML = printContents;
    w.document.head.innerHTML = header;
    w.print();
    //window.print();

    //document.body.innerHTML = originalContents;

    
}

