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

	/**
	 * @constructor
	 * @this {CollectionHandler}
	 * @extends {Object}
	 */
	var CollectionHandler = function(options) {
		this.options = options;
	};
	/**
	 * @param {Element} elem
	 * @return {boolean}
	 */
	CollectionHandler.protoype.match = function(elem) {
		return true;
	};
	/**
	 * @this {CollectionHandler}
	 * @param {Element} collection
	 */
	CollectionHandler.prototype.initCollection = function(collection) {
		$(collection)
			.append(this.options.buttons.add);
	};
	/**
	 * @this {CollectionHandler}
	 * @param {Element} item
	 */
	CollectionHandler.prototype.initItem = function(item) {
		$(item)
			.addClass('collection-item')
			.append(this.options.buttons.remove);
	};
	/**
	 * @this {CollectionHandler}
	 * @param {Element} collection
	 * @param {jQuery} item
	 */
	CollectionHandler.prototype.add = function(collection, item) {
		$(collection)
			.children().last()
				.insertBefore(newItem);
	};
	/**
	 * @this {CollectionHandler}
	 * @param {jQuery} item
	 */
	CollectionHandler.prototype.remove = function(item) {
		$(item).remove();
	};

	var handlers = new Array();
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
		/**
		 * @constructor
		 * @extends {CollecionHandler}
		 * @this {TableHandler}
		 */
		var TableHandler = function(options) {
			CollectionHandler.apply(this, arguments);
		};
		TableHandler.prototype = Object.create(CollectionHandler.prototype);
		/**
		 * @override
		 * @this {TableHandler}
		 * @param {Element} collection
		 * @returns {jQuery}
		 */
		TableHandler.prototype.initCollection = function(collection) {
			return CollectionHandler.prototype.initCollection.apply(this, arguments)
				.children().last() // The new button
					.wrap('<tfoot><tr><td colspan="0"></td></tr></tfoot>').closest('tfoot');
		};

		/**
		 * @constructor
		 * @extends {CollectionHandler}
		 * @this {TBodyHandler}
		 */
		var TBodyHandler = function(options) {
			CollectionHandler.apply(this, arguments);
		};
		TBodyHandler.prototype = Object.create(CollectionHandler.prototype);
		/**
		 * @override
		 * @this {TableHandler}
		 * @param {Element} collection
		 * @returns {jQuery}
		 */
		TBodyHandler.prototype.initCollection = function(collection) {
			return CollectionHandler.prototype.initCollection.apply(this, arguments)
				.children().last() // The new button
					.wrap('<tr><td colspan="0"></td></tr>').closest('tr');
		};

		/**
		 * @constructor
		 * @extends {CollectionHandler}
		 * @this {UlHandler}
		 */
		var UlHandler = function(options) {
			CollectionHandler.apply(this, arguments);
		};
		UlHandler.prototype = Object.create(CollectionHandler.prototype);
		/**
		 * @override
		 * @this {UlHandler}
		 * @param {Element} collection
		 */
		UlHandler.prototype.initCollection = function(collection) {
			return CollectionHandler.prototype.initCollection.apply(this, arguments)
				.children().last() // The new button
					.wrap('<li></li>').parent();
		};
	})(handlers, CollectionHandler);


	var methods = {
		/**
		 * @this {Element}
		 * @param {Object} options
		 */
		init: function(options) {
			$(this).addClass('collection');
			var handler = handlers.findFor(this);
			for (var child in this.children) {
				handler.initItem(child);
			}
			handler.initCollection(this);
			
		},
		/**
		 * @this {Element}
		 * @param where
		 */
		add: function(where) {
			if (typeof where === 'integer') {
				
			}
		},
		/**
		 * @this {Element}
		 * @param where
		 */
		remove: function(where) {
			if (typeof where === 'integer') {
				
			}
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
			method = methods[options] || $.noop();
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
			add:    '<button class="btn btn-success collection-add" title="Add" type="button"><i class="icon-plus icon-white"></i></button>',
			remove: '<button class="btn btn-danger collection-remove" title="Remove" type="button"><i class="icon-minus icon-white"></i></button>'
		},
	};

	SymfonyCollection.handlers = handlers;
	SymfonyCollection.CollectionHandler = CollectionHandler;

	$(document)
		.on('click.SymfonyCollection', '.collection .collection-add',    events.clickAdd)
		.on('click.SymfonyCollection', '.collection .collection-remove', events.clickRemove);

	$.fn.SymfonyCollection = SymfonyCollection;

})(jQuery);
