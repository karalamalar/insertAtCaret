/*!
 * jQuery insertAtCaret 1.0
 * http://www.karalamalar.net/
 *
 * Copyright (c) 2013 İzzet Emre Erkan
 * Licensed under Creative Commons Attribution-Share Alike 3.0 Unported License
 * http://creativecommons.org/licenses/by-sa/3.0/
 *
 */
(function ($, document, window, undefined) {
  $.fn.insertAtCaret = function (text) {
    return this.each(function () {
      var input = this, scrollPos, strPos = 0, before, after, range;
      if( !( ( input.tagName && input.tagName.toLowerCase() === "textarea") || ( input.tagName && input.tagName.toLowerCase() === "input" && input.type.toLowerCase() === "text" ) ) ) {
        return;
      }
      scrollPos = input.scrollTop;
      
      if ($.browser.msie) {
        input.focus();
        range = document.selection.createRange();
        range.moveStart('character', -input.value.length);
        strPos = range.text.length;
      } else {
        strPos = input.selectionStart;
      }

      before = (input.value).substring(0, strPos);
      after = (input.value).substring(strPos, input.value.length);
      input.value = before + text + after;
      strPos = strPos + text.length;
      if ($.browser.msie) {
        range = document.selection.createRange();
        range.moveStart('character', strPos);
        range.moveEnd('character', 0);
        range.select();
      } else {
        input.selectionStart = strPos;
        input.selectionEnd = strPos;
      }
      input.scrollTop = scrollPos;
    });
  };
})(jQuery, document, window);