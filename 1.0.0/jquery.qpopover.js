(function($)
			{
				var  defaultoptions = {
		              selector      : this.selector
		   		};
				var plugname="qpopover";
				
				$.fn[plugname]=function()
				{
					var isMethodCall=arguments.length>0 && typeof arguments[0] === "string";
					if(isMethodCall)
					{
						//
						var methodname=arguments[0];
						var args = Array.prototype.slice.call(arguments,1);
						this.each(function() {
							var instance = $.data( this,plugname);
							if(instance && $.isFunction( instance[methodname] ))
							{
								var method=instance[methodname];
								method.apply(instance,args);
							}
						});
					}else{
						var inputoptions = arguments;
						$(this).each(
								function ()
								{
									var optionsnew = $.extend( {}, defaultoptions);
									if(inputoptions.length>0)
									{
											optionsnew=$.extend(optionsnew,inputoptions[0]);
									}
									var instance=$(this).data(plugname);
									if(instance)
									{
										instance.init(optionsnew);
									}else
									{
										var target=$(this);
										instance=new PluginObject(target);
										instance.init(optionsnew);
										$(this).data(plugname,instance);
									}
								}
							);
							return this;
					};
				}
				
				function renderTpl(tpl, op) {
						    return tpl.replace(/\{(\w+)\}/g, function(e1, e2) {   
						       return op[e2] != null ? op[e2]:"";   
						    });
				};
				
				function PluginObject(target)
				{
						this.options;
						this.poppanel;
						this.templ;
						this.value;
						this.render=function()
						{
							this.templ=this.options.poppanel.get(0).outerHTML;
							var poppanel;
							if(this.value)
							{
								var aaa=renderTpl(this.templ,this.value);
								poppanel=$(aaa);
							}else{
								poppanel=this.options.poppanel;
							}
							poppanel.hide().css("position","absolute");
							var vleft=target.offset().left-(poppanel.outerWidth()-target.outerWidth())/2;
							poppanel.offset(({ top: target.offset().top+target.outerHeight(), left:vleft }));
							this.poppanel=poppanel;
							$("body").append(this.poppanel);
						};
						
						this.show=function(val)
						{
							if(val)
							{
								this.value=val;
							}
							this.render();
							this.poppanel.show();
						};
						
						this.hide=function()
						{
							this.poppanel.hide();
						};
						
						this.init=function(initoptions)
						{
							this.options=initoptions;
							this.value=this.options.data;
							this.render();
						};
				}
		}
	)(jQuery);