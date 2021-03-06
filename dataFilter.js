'use strict';
Number.isFinite = Number.isFinite || function(value) {return typeof value === "number" && isFinite(value);}
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
		    switch(el.tagName) {
		        case 'SELECT':
		            var childEls = Array.prototype.slice.call(el.children);
		            childEls.forEach(function(childEl){
		              childEl.addEventListener('click', dataFilter.eventFilter, false);
		            });
		            break;
		        default:
		          el.addEventListener('click', dataFilter.eventFilter, false);
		    }
		});
		dataFilter.options = options;
		dataFilter.filterElements();
		dataFilter.sortElements();   
		dataFilter.setElements();   
	},

	eventFilter: function(){
		var attr = this.getAttribute('data-attr');
		var value = this.getAttribute('data-value');		
		dataFilter.filterElements(attr, value);
		dataFilter.sortElements();
		dataFilter.setElements();
	},
	filterElements: function(attr, value){
		var options = dataFilter.options;
		var parent = options.parent;
		if(window.filterView == undefined){window.filterView = Array.prototype.slice.call(options.parent.children);}
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
	},
	setElements: function() {
		var parent = dataFilter.options.parent;
		while (parent.firstChild) {
		  parent.removeChild(parent.firstChild);
		}
		for(var i=0;i<filterView.length;i++){
		    parent.appendChild(filterView[i]);
		} 
	},
	sortElements: function(){
		window.filterView.sort(function sortfunction(a, b){
			var aVal = a.getAttribute(dataFilter.options.sortAttr) || a.innerHTML.toLowerCase();
			var bVal = b.getAttribute(dataFilter.options.sortAttr) || b.innerHTML.toLowerCase();
			if(aVal.isFinite && bVal.isFinite) {
				return (bVal - aVal);
			}else {
				return aVal > bVal ? 1 : -1;
			}
		    
		});		
	},

};

window.dataFilter = dataFilter;