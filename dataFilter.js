'use strict';
var dataFilter = {
	init: function(options){
		var options = options || {};
		options.filterClass = options.filterclass || 'filter';
		options.dataParent = options.dataParent || 'dataParent';
		options.sortAttr =	options.sortAttr || 'data-sort';
		options.dataCount = options.dataCount || 'dataCount';
		options.parent = document.getElementById(options.dataParent);

		var filterEls = Array.prototype.slice.call( document.getElementsByClassName(options.filterClass) );
		filterEls.forEach(function(el){
			el.addEventListener('click', dataFilter.eventFilter, false);
		});
		dataFilter.options = options;
		document.getElementById(options.dataCount).innerHTML = parent.children.length;

	},

	eventFilter: function(){
		var options = dataFilter.options;
		var attr = this.getAttribute('data-attr');
		var value = this.getAttribute('data-value');
		var parent = options.parent;
		if(window.filterView == undefined){window.filterView = new Array();}
		if(window.filterCache == undefined){window.filterCache = new Array();}
		if(filterCache.length + filterView.length > 0) {
		    var items = filterView.concat(filterCache);
		    filterView = new Array();
		    filterCache = new Array();
		} else {
		    var items = parent.children;
		    items = Array.prototype.slice.call(items);       
		}

		items.forEach(function(el){    
		    if(el.getAttribute('data-'+attr) == value || value == '') {
		        filterView.push(el);
		    } else {
		        filterCache.push(el);
		    }           
		});
		filterView.sort(function sortfunction(a, b){
		    return (b.getAttribute(options.sortAttr) - a.getAttribute(options.sortAttr) );
		});
		parent.innerHTML = '';
		for(var i=0;i<filterView.length;i++){
		    parent.appendChild(filterView[i]);
		} 	
		document.getElementById(options.dataCount).innerHTML = parent.children.length;	
	}
};