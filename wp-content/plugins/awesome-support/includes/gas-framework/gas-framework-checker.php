<?php
/**
 * This script is not used within GAS Framework itself.
 *
 * This script is meant to be used with your Gas Framework-dependent theme or plugin,
 * so that your theme/plugin can verify whether the framework is installed.
 *
 * If Gas is not installed, then the script will display a notice with a link to
 * Gas. If Gas is installed but not activated, it will display the appropriate notice as well.
 *
 * To use this script, just copy it into your theme/plugin directory then add this in the main file of your project:
 *
 * require_once( 'gas-framework-checker.php' );
 *
 * Changelog:
 * v1.9
 *      * Simplified class
 * v1.7.4
 *		* Now integrates with TGM Plugin Activation - uses TGM instead of displaying
 *			our own admin notice
 * v1.7.7
 *		* Added filters to notices
 *
 * @package GAS Framework
 */

if ( ! defined( 'ABSPATH' ) ) { exit; // Exit if accessed directly.
}

if ( ! class_exists( 'GASFrameworkChecker' ) ) {

	/**
	 * Gas Framework Checker.
	 *
	 * @since 1.6
	 */
	class GASFrameworkChecker {


		const SEARCH_REGEX = '/gas-framework.php/i';
		const GASF_CLASS = 'GASFramework';
		const PLUGIN_SLUG = 'gas-framework';


		/**
		 * Constructor, add hooks for checking for Gas Framework.
		 *
		 * @since 1.6
		 */
		function __construct() {
			add_action( 'admin_notices', array( $this, 'display_install_or_active_notice' ), 2 );
			add_action( 'tgmpa_register', array( $this, 'tgm_plugin_activation_include' ) );
		}


		/**
		 * Checks the existence of Gas Framework and prompts the display of a notice.
		 *
		 * @since 1.6
		 */
		public function display_install_or_active_notice() {

			// Check for TGM use, if used, let TGM do the notice.
			// We do this here since perform_check() is too early.
			if ( function_exists( 'tgmpa' ) ) {
				return;
			}

			// If the plugin does not exist, throw admin notice to install.
			if ( ! $this->plugin_exists() ) {
				echo "<div class='error'><p><strong>"
					. esc_html( apply_filters( 'gas_checker_installation_notice', __( 'Gas Framework needs to be installed.', 'awesome-support' ) ) )
					. sprintf( " <a href='%s'>%s</a>",
						esc_url( admin_url( 'plugin-install.php?tab=search&type=term&s=gas+framework' ) ),
						esc_html( apply_filters( 'gas_checker_search_plugin_notice', __( 'Click here to search for the plugin.', 'awesome-support' ) ) )
					)
					. '</strong></p></div>';

				// If the class doesn't exist, the plugin is inactive. Throw admin notice to activate plugin.
			} else if ( ! class_exists( apply_filters( 'tf_framework_checker_gas_class', self::GASF_CLASS ) ) ) {
				echo "<div class='error'><p><strong>"
					. esc_html( apply_filters( 'gas_checker_activation_notice', __( 'Gas Framework needs to be activated.', 'awesome-support' ) ) )
					. sprintf( " <a href='%s'>%s</a>",
						esc_url( admin_url( 'plugins.php' ) ),
						esc_html( apply_filters( 'gas_checker_activate_plugin_notice', __( 'Click here to go to the plugins page and activate it.', 'awesome-support' ) ) )
					)
					. '</strong></p></div>';
			}
		}


		/**
		 * Checks the existence of Gas Framework in the list of plugins.
		 * It uses the slug path of the plugin for checking.
		 *
		 * @since 1.6
		 *
		 * @return boolean True if Gas Framework is installed (even if not activated).
		 */
		public function plugin_exists() {
			// Required function as it is only loaded in admin pages.
			require_once ABSPATH . 'wp-admin/includes/plugin.php';

			// Get all plugins, activated or not.
			$plugins = get_plugins();

			// Check plugin existence by checking if the name is registered as an array key. get_plugins collects all plugin path into arrays.
			foreach ( $plugins as $slug => $plugin ) {
				$search_regex = apply_filters( 'tf_framework_checker_regex', self::SEARCH_REGEX );
				if ( preg_match( $search_regex, $slug, $matches ) ) {
					return true;
				}
			}

			return false;
		}


		/**
		 * Includes GAS Framework in TGM Plugin Activation if it's available.
		 *
		 * @since	1.7.4
		 *
		 * @return	void
		 *
		 * @see		http://tgmpluginactivation.com/
		 *
		 * @codeCoverageIgnore
		 */
		public function tgm_plugin_activation_include() {
			if ( function_exists( 'tgmpa' ) ) {
			    tgmpa( array(
			        array(
			            'name' => 'GAS Framework',
			            'slug' => self::PLUGIN_SLUG,
			            'required' => true,
			        ),
			    ) );
			}
		}
	}

	new GASFrameworkChecker();


}
