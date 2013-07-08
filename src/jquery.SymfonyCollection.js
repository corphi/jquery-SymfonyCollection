;(
/**
 * @param {jQuery} $
 */
function($) {
	var prepareItem = function() {
		var $button = $($.fn.SymfonyCollection.buttons.remove);
		if (this.tagName.toLowerCase() === 'tbody') {
			$(this).addClass('collection-item')
				.children()
				.first()
				.append($('<td><td>').append($button));
		} else {
			$(this).addClass('collection-item').append($button);
		}
	};

	var events = {
		/**
		 * @param {jQuery.Event} event
		 * @this {Element}
		 */
		clickAdd: function(event) {
			var $holder = $(this).closest('ul, table, tbody');
			var counter = $holder.data('counter');

			var row = $holder.data('prototype').replace(/__name__/g, counter);
			row = $(row).each(prepareItem);
			$holder.append(row);

			$holder.data('counter', ++counter);
			event.stopPropagation();
		},
		/**
		 * @param {jQuery.Event} event
		 * @this {Element}
		 */
		clickRemove: function(event) {
			$(this).closest('ul > *, table > *, tbody > *').remove();

			event.stopPropagation();
		}
	};

	var wrapper = {
		add: {
			/**
			 * @param {string} html
			 * @returns {jQuery}
			 */
			ul: function(html) {
				return $('<li></li>').append(html);
			},
			/**
			 * @param {string} html
			 * @returns {jQuery}
			 */
			table: function(html) {
				return $('<tfoot></tfoot>').append(html).wrapInner('<tr><td colspan="0"></td></tr>');
			},
			/**
			 * @param {string} html
			 * @returns {jQuery}
			 */
			tbody: function(html) {
				return $('<tr></tr>').append(html).wrapInner('<td colspan="0"></td>');
			}
		},
	};

	var CollectionHandler = SymfonyCollection.CollectionHandler = function() {
		
	};
	CollectionHandler.match = function(elem) {
		return false;
	};
	$.fn.SymfonyCollection.CollectionHandler.initCollection = function() {
		
	};
	$.fn.SymfonyCollection.CollectionHandler.initRow = function() {
		
	};
	$.fn.SymfonyCollection.CollectionHandler.add = function() {
		
	};
	$.fn.SymfonyCollection.CollectionHandler.remove = function() {
		
	};

	var handlers = $.fn.SymfonyCollection.handlers = new Array();
	/**
	 * Browse the handlers for one that fits the given element.
	 * @this {Array}
	 * @param {Element} elem
	 * @returns {CollectionHandler}
	 */
	handlers.findFor = function(elem) {
		for (var i = this.length - 1; i >= 0; --i) {
			if (this[i].matches(elem)) {
				return this[i];
			}
		}
		return null;
	};

	(function() {
		var tableHandler = new CollectionHandler();
		handlers.push(tableHandler);

		var tbodyHandler = new CollectionHandler();
		handlers.push(tbodyHandler);

		var ulHandler = new CollectionHandler();
		handlers.push(ulHandler);
	})(handlers, CollectionHandler);


	var methods = {
		/**
		 * @this {Element}
		 * @param options
		 */
		init: function(options) {
			handlers.findFor(this);
		},
		/**
		 * @this {Element}
		 * @param where
		 */
		add: function(where) {
			
		},
		/**
		 * @this {Element}
		 * @param where
		 */
		remove: function(where) {
			
		}
	};

	/**
	 * @this {jQuery}
	 * @param {Object} options A hash containing values to override the default options.
	 * @return {jQuery}
	 */
	var SymfonyCollection = function(options) {
		var method, args;
		if (typeof options === 'string') {
			method = methods[options] || $.K();
			args = [].slice.call(arguments, 1);
		} else {
			method = methods.init;
			args = [$.extend({}, $.fn.SymfonyCollection.defaults, options)];
		}
		return this.each(
			/**
			 * @this {Element}
			 */
			function() {
				method.apply(this, args);
			}
		);

		return this;
	};

	SymfonyCollection.defaults = {
		buttons: {
			add:    '<button class="btn btn-success collection-add" title="" type="button"><i class="icon-plus icon-white"></i> Hinzufügen</button>',
			remove: '<button class="btn btn-danger collection-remove" title="" type="button"><i class="icon-minus icon-white"></i> Entfernen</button>'
		},
	};

	$(document)
		.on('click.SymfonyCollection', '.collection .collection-add',    events.clickAdd)
		.on('click.SymfonyCollection', '.collection .collection-remove', events.clickRemove);

	$.fn.SymfonyCollection = SymfonyCollection;

})(jQuery);
