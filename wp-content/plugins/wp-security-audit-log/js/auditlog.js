var WsalData;

window['WsalAuditLogRefreshed'] = function () {
	// fix pagination links causing form params to get lost
	// jQuery('span.pagination-links a').click(function (ev) {
	// 	ev.preventDefault();
	// 	var deparam = function (url) {
	// 		var obj = {};
	// 		var pairs = url.split('&');
	// 		for (var i in pairs) {
	// 			var split = pairs[i].split('=');
	// 			obj[decodeURIComponent(split[0])] = decodeURIComponent(split[1]);
	// 		}
	// 		return obj;
	// 	};
	// 	const viewer = jQuery('#audit-log-viewer');
	// 	const url_params = deparam(this.href);
	// 	const param_keys = [ 'paged', 'orderby', 'order' ];
	// 	for ( let index in param_keys ) {
	// 		const param_name = param_keys[ index ];
	// 		let param_value = url_params[param_name];
	// 		if (typeof param_value === 'undefined' && param_name === 'paged') {
	// 			param_value = 1;
	// 		}
	// 		const input_elm = viewer.find('input[name="' + param_name + '"]');
	// 		if ( input_elm.length === 0 ) {
	// 			viewer.append('<input type="hidden" name="' + param_name + '" value="' + param_value + '"/>');
	// 		} else {
	// 			input_elm.val( param_value );
	// 		}

	// 	}

	// 	viewer.submit();
	// });

	var modification_alerts = ['1002', '1003', '6007', '6023'];

	jQuery('.log-disable').each(function () {
		if (-1 == modification_alerts.indexOf(this.innerText)) {
			// Tooltip Confirm disable alert.
			if (jQuery(this).attr('data-disabled')) {
				jQuery(this).darkTooltip({
					animation: 'fadeIn',
					size: 'small',
					gravity: 'west',
				});
			} else
			jQuery(this).darkTooltip({
				animation: 'fadeIn',
				size: 'small',
				gravity: 'west',
				confirm: true,
				yes: 'Disable',
				no: '',
				onYes: function (elem, tooltip) {
					WsalDisableByCode(elem.attr('data-alert-id'), elem.data('disable-alert-nonce'));
					elem.attr('data-disabled', 'disabled');

					jQuery('#darktooltip-'+elem.attr('id')+' .confirm').remove();
					var { __ } = wp.i18n;
					jQuery('#darktooltip-'+elem.attr('id')+' strong').text(__( 'This event is disabled.', 'wp-security-audit-log' ),);

					// delete jQuery(elem)['tooltip'];

					//console.log(jQuery(elem).darkTooltip());

					//elem.removeAttribute('data-disabled', 'disabled');

					// delete elem['darkTooltip'];

					// jQuery(elem).darkTooltip({
					// 	animation: 'fadeIn',
					// 	size: 'small',
					// 	gravity: 'west',
					// 	confirm: false,
					// });
				}
			});
		} else {
			// Tooltip Confirm disable alert.
			jQuery(this).darkTooltip({
				animation: 'fadeIn',
				size: 'small',
				gravity: 'west',
				confirm: true,
				yes: 'Disable',
				no: '<span>Modify</span>',
				onYes: function (elem) {
					WsalDisableByCode(elem.attr('data-alert-id'), elem.data('disable-alert-nonce'));
				},
				onNo: function (elem) {
					window.location.href = elem.attr('data-link');
				}
			});
		}
	});

	// tooltip severity type
	jQuery('.tooltip').darkTooltip({
		animation: 'fadeIn',
		gravity: 'west',
		size: 'medium',
	});

	jQuery('.tooltip').on('click', function(e) {
		e.preventDefault();
	});

	// Data inspector tooltip.
	jQuery('.more-info').darkTooltip({
		animation: 'fadeIn',
		gravity: 'east',
		size: 'medium'
	});
};

function WsalAuditLogInit(_WsalData) {
	// WsalData = _WsalData;
	// var WsalTkn = WsalData.autorefresh.token;

	// // List refresher.
	// var WsalAjx = null;

	// /**
	//  * Check & Load New Alerts.
	//  */
	// var WsalChk = function () {
	// 	if (WsalAjx) WsalAjx.abort();
	// 	WsalAjx = jQuery.post(WsalData.ajaxurl, {
	// 		action: 'AjaxRefresh',
	// 		logcount: WsalTkn
	// 	}, function (data) {
	// 		data = data.toString();
	// 		data = data.trim();
	// 		WsalAjx = null;
	// 		if (data && data !== 'false') {
	// 			WsalTkn = data;
	// 			jQuery('#audit-log-viewer').load(
	// 				location.href + ' #audit-log-viewer-content',
	// 				window['WsalAuditLogRefreshed']
	// 			);
	// 		}
	// 	});
	// };

	// If audit log auto refresh is enabled.
	// if ( WsalData.autorefresh.enabled ) {
	// 	// Check for new alerts every 30 secs.
	// 	setInterval( WsalChk, 30000 );
	// }

	// WsalSsasInit();
}

var WsalIppsPrev;

function WsalIppsFocus(value) {
	WsalIppsPrev = value;
}

function WsalSsasInit() {
	var SsasAjx = null;
	var SsasInps = jQuery("input.wsal-ssas");
	SsasInps.after('<div class="wsal-ssas-dd" style="display: none;"/>');
	SsasInps.click(function () {
		jQuery(this).select();
	});
	window['WsalAuditLogRefreshed']();
	SsasInps.keyup(function () {
		var SsasInp = jQuery(this);
		var SsasDiv = SsasInp.next();
		var SsasVal = SsasInp.val();
		if (SsasAjx) SsasAjx.abort();
		SsasInp.removeClass('loading');

		// do a new search
		if (SsasInp.attr('data-oldvalue') !== SsasVal && SsasVal.length > 2) {
			SsasInp.addClass('loading');
			SsasAjx = jQuery.post(WsalData.ajaxurl, {
				action: 'AjaxSearchSite',
				search: SsasVal
			}, function (data) {
				if (SsasAjx) SsasAjx = null;
				SsasInp.removeClass('loading');
				SsasDiv.hide();
				SsasDiv.html('');
				if (data && data.length) {
					var SsasReg = new RegExp(SsasVal.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1'), 'gi');
					for (var i = 0; i < data.length; i++) {
						var link = jQuery('<a href="javascript:;" onclick="WsalSsasChange(' + data[i].blog_id + ')"/>')
							.text(data[i].blogname + ' (' + data[i].domain + ')');
						link.html(link.text().replace(SsasReg, '<u>$&</u>'));
						SsasDiv.append(link);
					}
				} else {
					SsasDiv.append(jQuery('<span/>').text(WsalData.tr8n.searchnone));
				}
				SsasDiv.prepend(jQuery('<a href="javascript:;" onclick="WsalSsasChange(0)" class="allsites"/>').text(WsalData.tr8n.searchback));
				SsasDiv.show();
			}, 'json');
			SsasInp.attr('data-oldvalue', SsasVal);
		}

		// handle keys
	});
	SsasInps.blur(function () {
		setTimeout(function () {
			var SsasInp = jQuery(this);
			var SsasDiv = SsasInp.next();
			SsasInp.attr('data-oldvalue', '');
			SsasDiv.hide();
		}, 200);
	});
}

function WsalSsasChange(value) {
	jQuery('div.wsal-ssas-dd').hide();
	jQuery('input.wsal-ssas').attr('disabled', true);
	jQuery('#wsal-cbid').val(value);
	jQuery('#audit-log-viewer').submit();
}

function WsalDisableCustom(link, meta_key) {
	var linkElm = jQuery(link);
	linkElm.hide();
	jQuery.ajax({
		type: 'POST',
		url: ajaxurl,
		async: false,
		data: {
			action: 'AjaxDisableCustomField',
			notice: meta_key,
			disable_nonce: linkElm.data('disable-custom-nonce'),
			object_type: linkElm.data('object-type')
		},
		success: function (data) {
			var notice = jQuery('<div class="updated" data-notice-name="notifications-extension"></div>').html(data);
			jQuery("h2:first").after(notice);
		}
	});
}

function WsalDBChange(value, nonce) {
	jQuery.ajax({
		type: 'POST',
		url: ajaxurl,
		async: true,
		data: {
			action: 'AjaxSwitchDB',
			nonce: nonce,
			selected_db: value
		},
		success: function () {
			location.reload();
		}
	});
}

function WsalDisableByCode(code, nonce) {
	jQuery.ajax({
		type: 'POST',
		url: ajaxurl,
		async: true,
		data: { action: 'AjaxDisableByCode', code: code, disable_nonce: nonce },
		success: function (data) {
			var notice = jQuery('<div class="updated" data-notice-name="disabled"></div>').html(data);
			jQuery("h2:first").after(notice);
		}
	});
}

/**
 * Create and download a temporary file.
 *
 * @param {string} filename - File name.
 * @param {string} text - File content.
 */
function download(filename, text) {
	// Create temporary element.
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	// Set the element to not display.
	element.style.display = 'none';
	document.body.appendChild(element);

	// Simlate click on the element.
	element.click();

	// Remove temporary element.
	document.body.removeChild(element);
}

/**
 * Onclick event handler to download failed login log file.
 *
 * @param {object} element - Current element.
 */
function download_failed_login_log(element) {
	var nonce = jQuery(element).data('download-nonce'); // Nonce.
	alert = jQuery(element).closest( '[id^="Event"]' ).attr('id').substring(5);

	jQuery.ajax({
		type: 'POST',
		url: ajaxurl,
		async: true,
		data: {
			action: 'wsal_download_failed_login_log',
			download_nonce: nonce,
			alert_id: alert
		},
		success: function (data) {
			data = data.replace(/,/g, '\n');
			// Start file download.
			download('failed_logins.log', data);
		}
	});
}

/**
 * Onclick event handler to implement user's choice to either
 * opt in or out of freemius.
 *
 * @param {string} element - Current element.
 */
function wsal_freemius_opt_in( element ) {
	var nonce  = jQuery( '#wsal-freemius-opt-nonce' ).val(); // Nonce.
	var choice = jQuery( element ).data( 'opt' ); // Choice.

	jQuery.ajax( {
		type: 'POST',
		url: ajaxurl,
		async: true,
		data: {
			action: 'wsal_freemius_opt_in',
			opt_nonce: nonce,
			choice: choice
		},
		success: function( data ) {
			location.reload();
		},
		error: function( xhr, textStatus, error ) {
			console.log( xhr.statusText );
			console.log( textStatus );
			console.log( error );
		}
	} );
}

/**
 * Onclick event handler to dismiss advert.
 *
 * @since 3.2.4
 *
 * @param {string} element - Current element.
 */
function wsal_dismiss_advert(element) {
	var advertNonce   = jQuery( '#wsal-dismiss-advert' ).val(); // Nonce.
	var dismissAdvert = jQuery( element ).data( 'advert' ); // Advert to be dismissed.

	jQuery.ajax( {
		type: 'POST',
		url: ajaxurl,
		async: true,
		dataType: 'json',
		data: {
			action: 'wsal_dismiss_advert',
			nonce: advertNonce,
			advert: dismissAdvert
		},
		success: function( data ) {
			if ( data.success ) {
				var advertNotice = jQuery( element ).parents( 'div.wsal_notice' );
				advertNotice.fadeOut();
			} else {
				console.log( data.message );
			}
		},
		error: function( xhr, textStatus, error ) {
			console.log( xhr.statusText );
			console.log( textStatus );
			console.log( error );
		}
	} );
}

/**
 * Onclick event handler to dismiss the setup modal.
 *
 * @since 4.1.4
 */
function wsal_dismiss_setup_modal() {
	jQuery.ajax( {
		type: 'POST',
		url: ajaxurl,
		async: true,
		dataType: 'json',
		data: {
			action: 'wsal_dismiss_setup_modal',
			nonce: jQuery( '#wsal-dismiss-setup-modal' ).val()
		}
	} );
}

jQuery( document ).ready( function() {

	/**
	 * Dismiss addon-available notice.
	 */
	jQuery( '.notice-addon-available .notice-dismiss' ).click( function() {
		var addonToDismiss = jQuery( this ).parent().attr( 'data-addon' );
		jQuery.ajax({
			type: 'POST',
			url: ajaxurl,
			async: true,
			data: {
				action: 'wsal_dismiss_notice_addon_available',
				nonce: jQuery( '#wsal-dismiss-notice-addon-available-' + addonToDismiss ).val(),
				addon: addonToDismiss
			},
			success: function( data ) {
				console.log( data );
			},
			error: function( xhr, textStatus, error ) {
				console.log( xhr.statusText );
				console.log( textStatus );
				console.log( error );
			}
		});
	});

	/**
	 * Trigger to attempt to install a missing addon.
	 */
	jQuery( '.wsal-addon-install-trigger' ).click(
		function() {
			var button = this;
			wsal_addon_installer_ajax( button );
			// disable this button.
			jQuery( '.wsal-addon-install-trigger' ).attr( 'disabled', true );
			jQuery( '.wsal-addon-install-trigger:not([data-addon-name="' + jQuery( this ).data( 'addon-name' ) + '"])' ).text( wsalAuditLogArgs.installAddonStrings.otherInstalling );
			jQuery( button ).text( wsalAuditLogArgs.installAddonStrings.installingText );
			var spinner = document.createElement( 'span' );
			jQuery( spinner ).addClass( 'spinner is-active' );
			jQuery( spinner ).css(
				{
					'float':'none',
					'margin': '0',
					'margin-left': '5px'
				}
			);
			jQuery( button ).after( spinner );
		}
	);
});

function wsal_addon_installer_ajax( button ) {
	jQuery.ajax(
		{
			type: 'POST',
			url: ajaxurl,
			async: true,
			data: {
				action: 'wsal_run_addon_install',
				_wpnonce: jQuery( button ).data( 'nonce' ),
				addon_for: jQuery( button ).data( 'addon-name' )
			},
			success: function( data ) {
				console.log( data );
				jQuery( button ).next( '.spinner' ).remove();
				if ( data.success === 'undefined' || data.success === false ) {
					jQuery( button ).after( wsalAuditLogArgs.installAddonStrings.errorInstalling );
				} else {
					jQuery( '.wsal-addon-install-trigger[data-addon-name="' + jQuery( button ).data( 'addon-name' ) + '"]' ).text( wsalAuditLogArgs.installAddonStrings.addonInstalled );
					jQuery( '.wsal-addon-install-trigger:not([data-addon-name="' + jQuery( button ).data( 'addon-name' ) + '"])' ).attr( 'disabled', false );
					jQuery( button ).text( wsalAuditLogArgs.installAddonStrings.installedReload );
					jQuery( button ).attr( 'disabled', true );
					location.reload();
				}

			},
			error: function( xhr, textStatus, error ) {
				jQuery( button ).after( wsalAuditLogArgs.installAddonStrings.errorInstalling );
				jQuery( button ).next( '.spinner' ).remove();
				console.log( xhr.statusText );
				console.log( textStatus );
				console.log( error );
			}
		}
	);
}

jQuery( document ).ready( function() {

    jQuery( document ).on( 'click', '[data-shortened-text]', function(event) {
        event.preventDefault();
		var elm = jQuery( this );
		var full_text = elm.data( 'shortened-text' );
		elm.parent().find( 'span' ).text( full_text );
		elm.remove();
	} );

	// Data inspector WSAL 4.6+
	jQuery( document ).on( 'click', '.data-event-inspector-link:not(.inspector-active)', function(event) {
        event.preventDefault();
		let count = jQuery( '.event-data-panel' ).length;
		var origText = jQuery( this ).text();
		jQuery( this ).attr( 'data-orig-text', origText );
		jQuery( this ).attr( 'data-panel-number', count );
		let colspan = (jQuery( this ).closest( 'tr' ).children('td').length)+1;
		jQuery( this ).closest( 'tr' ).after( '<tr class="event-data-panel row-detail-'+ count +'"><td colspan="'+colspan+'" class="panel-'+ count +'"><div class="panel-'+ count +'-fill"></div></td></tr>' );

		jQuery( jQuery( '.panel-'+ count ) ).load( jQuery( this ).attr( 'href' ), function() {
			jQuery( '.panel-'+ count + ' .event-content-wrapper' ).slideDown( 300 );
		});

		jQuery( this ).attr( 'data-' );
		jQuery( this ).addClass( 'inspector-active' ).text( wsalAuditLogArgs.closeInspectorString );
		return true;
	} );

	jQuery( document ).on( 'click', '.data-event-inspector-link.inspector-active', function(event) {
        event.preventDefault();
		var targetRow = '.row-detail-' + jQuery( this ).attr( 'data-panel-number');
		var targetPanel = '.panel-' + jQuery( this ).attr( 'data-panel-number');
		var origText =  jQuery( this ).attr( 'data-orig-text' );		
		jQuery( '.panel-'+ jQuery( this ).attr( 'data-panel-number') + ' .event-content-wrapper' ).slideUp( 200 );

		setTimeout(function() { 
			jQuery( targetRow ).remove();
			jQuery( targetPanel ).remove();
			jQuery( targetPanel + '-fill').remove();
		}, 300);

		jQuery( this ).removeClass( 'inspector-active' ).text( origText );
		return true;
	} );

	
});
