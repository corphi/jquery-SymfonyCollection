;(
/**
 * @param {jQuery} $
 */
function($) {
	var events = {
		/**
		 * @this {HTMLElement}
		 * @param {jQuery.Event} event
		 */
		clickAdd: function(event) {
			var $holder = $(this).closest('ul, table, tbody');
			var counter = $holder.data('counter');
			var handler = $holder[0].collectionHandler;

			var row = $holder.data('prototype').replace(new RegExp(handler.options.name, 'g'), counter);
			row = $(row).each(handler.initItem);

			var addevent = new jQuery.Event(src, props);
			$holder.trigger(event);
			if (!addevent.isPropagationStopped()) {
				handler.add($holder, row);
				$holder.data('counter', ++counter);
			}

			event.stopPropagation();
		},
		/**
		 * @this {HTMLElement}
		 * @param {jQuery.Event} event
		 */
		clickRemove: function(event) {
			var removeevent = new jQuery.Event(src, props);
			$(this).trigger(removeevent);
			if (!removeevent.isPropagationStopped()) {
				// FIXME
				handler.remove(
					$(this).closest('ul > *, table > *, tbody > *')
				);
			}

			event.stopPropagation();
		}
	};

	/**
	 * @constructor
	 * @extends {Object}
	 * @this {CollectionHandler}
	 * @param {Object} options
	 */
	var CollectionHandler = function(options) {
		this.options = options;
	};
	/**
	 * @param {HTMLElement} elem
	 * @return {boolean}
	 */
	CollectionHandler.protoype.match = function(elem) {
		return true;
	};
	/**
	 * @this {CollectionHandler}
	 * @param {HTMLElement} collection
	 */
	CollectionHandler.prototype.initCollection = function(collection) {
		$(collection)
			.addClass(this.options.classes.list)
			.append(this.options.buttons.add);
	};
	/**
	 * @this {CollectionHandler}
	 * @param {HTMLElement} item
	 */
	CollectionHandler.prototype.initItem = function(item) {
		$(item)
			.addClass(this.options.classes.item)
			.append(this.options.buttons.remove);
	};
	/**
	 * @this {CollectionHandler}
	 * @param {HTMLElement} collection
	 * @param {jQuery} item
	 */
	CollectionHandler.prototype.add = function(collection, item) {
		$(collection)
			.children().last()
				.insertBefore(item);
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
	 * @param {HTMLElement} elem
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
		 * @extends {CollectionHandler}
		 * @this {TableHandler}
		 */
		var TableHandler = function(options) {
			CollectionHandler.apply(this, arguments);
		};
		$.extend(TableHandler.prototype, CollectionHandler.prototype);
		/**
		 * @override
		 * @this {TableHandler}
		 * @param {HTMLElement} collection
		 * @returns {jQuery}
		 */
		TableHandler.prototype.initCollection = function(collection) {
			return CollectionHandler.prototype.initCollection.apply(this, arguments)
				.children().last() // The new button
					.wrap('<tfoot><tr><td colspan="0"></td></tr></tfoot>').closest('tfoot');
		};
		/**
		 * @override
		 * @this {TableHandler}
		 * @param {HTMLElement} item
		 */
		TableHandler.prototype.initItem = function(item) {
			$(item).append(
				$(this.options.buttons.remove).wrap('<tr><td rowspan="0"></td></tr>').closest('tr')
			);
		};
		/**
		 * @override
		 * @this {TableHandler}
		 * @param {HTMLElement} collection
		 * @param {HTMLElement} item
		 */
		TableHandler.prototype.add = function(collection, item) {
			$(collection)
				.children().append(item);
		};

		/**
		 * @constructor
		 * @extends {CollectionHandler}
		 * @this {TBodyHandler}
		 */
		var TBodyHandler = function(options) {
			CollectionHandler.apply(this, arguments);
		};
		$.extend(TBodyHandler.prototype, CollectionHandler.prototype);
		/**
		 * @override
		 * @this {TableHandler}
		 * @param {HTMLElement} collection
		 * @returns {jQuery}
		 */
		TBodyHandler.prototype.initCollection = function(collection) {
			return CollectionHandler.prototype.initCollection.apply(this, arguments)
				.children().last() // The new button
					.wrap('<tr><td colspan="0"></td></tr>').closest('tr');
		};
		/**
		 * @override
		 * @this {TBodyHandler}
		 * @param {HTMLElement} item
		 */
		TBodyHandler.prototype.initItem = function(item) {
			$(item)
				.addClass('collection-item')
				.append(
					$('<td></td>').append(this.options.buttons.remove)
				);
		};

		/**
		 * @constructor
		 * @extends {CollectionHandler}
		 * @this {UlHandler}
		 */
		var UlHandler = function(options) {
			CollectionHandler.apply(this, arguments);
		};
		$.extend(UlHandler.prototype, CollectionHandler.prototype);
		/**
		 * @override
		 * @this {UlHandler}
		 * @param {HTMLElement} collection
		 */
		UlHandler.prototype.initCollection = function(collection) {
			return CollectionHandler.prototype.initCollection.apply(this, arguments)
				.children().last() // The new button
					.wrap('<li></li>').parent();
		};
	})(handlers, CollectionHandler);


	var methods = {
		/**
		 * @this {HTMLElement}
		 * @param {Object} options
		 */
		init: function(options) {
			var handler = handlers.findFor(this);
			handler = new handler(options);

			for (var child in this.children) {
				handler.initItem(child);
			}
			handler.initCollection(this);

			$(this).addClass(options.classes.list);
			this.collectionHandler = handler;
		},
		/**
		 * @this {HTMLElement}
		 * @param where
		 */
		add: function(where) {
			if (typeof where === 'integer') {
				
			}

			var counter = $holder.data('counter');
			var item = $(this).data('prototype').trim();
			item = item.replace(
				new RegExp(this.collectionHandler.options.name, 'g'),
				counter
			);
			item = $(item);

			var event = $.Event('itemadd', {});
			$(this).trigger(event);
			if (!event.isDefaultPrevented()) {
				
			}
		},
		/**
		 * @this {HTMLElement}
		 * @param where
		 */
		remove: function(where) {
			if (typeof where === 'integer') {
				
			}

			var event = $.Event('itemadd', {});
			$(this).trigger(event);
			if (!event.isDefaultPrevented()) {
				
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
			args = Array.prototype.slice.call(arguments, 1);
		} else {
			method = methods.init;
			args = [$.extend({}, $.fn.SymfonyCollection.defaults, options)];
		}
		return this.each(
			/**
			 * @this {HTMLElement}
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
		classes: {
			item: 'collection-item',
			list: 'collection'
		},
		name: '__name__'
	};

	SymfonyCollection.handlers = handlers;
	SymfonyCollection.CollectionHandler = CollectionHandler;

	$(document)
		.on('click.SymfonyCollection', '.collection .collection-add',    events.clickAdd)
		.on('click.SymfonyCollection', '.collection .collection-remove', events.clickRemove);

	$.fn.SymfonyCollection = SymfonyCollection;

})(jQuery);
