(function ($$) {
    (function ($) {
            
        $('body').append('<div id="'+helperLib.idGenerator('win')+'" class="easyui-window" title="Basic Window" data-options="iconCls:\'icon-save\'" style="width:500px;height:200px;padding:10px;">  The window content.  </div>  ');
        

    } (jQuery));
} (Prototype));


function createEditor() {
    var editor, html = '';
			if ( editor )
				return;
              
			// Create a new editor inside the <div id="editor">, setting its value to html
			var config = {};
			editor = CKEDITOR.appendTo( 'editor', config, html );
		}

		function removeEditor() {
			if ( !editor )
				return;

			// Retrieve the editor contents. In an Ajax application, this data would be
			// sent to the server or used in any other way.
			document.getElementById( 'editorcontents' ).innerHTML = html = editor.getData();
			document.getElementById( 'contents' ).style.display = '';

			// Destroy the editor.
			editor.destroy();
			editor = null;
		}﻿