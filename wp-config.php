<?php
/**
 * As configurações básicas do WordPress
 *
 * O script de criação wp-config.php usa esse arquivo durante a instalação.
 * Você não precisa usar o site, você pode copiar este arquivo
 * para "wp-config.php" e preencher os valores.
 *
 * Este arquivo contém as seguintes configurações:
 *
 * * Configurações do banco de dados
 * * Chaves secretas
 * * Prefixo do banco de dados
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Configurações do banco de dados - Você pode pegar estas informações com o serviço de hospedagem ** //
/** O nome do banco de dados do WordPress */
define( 'DB_NAME', 'db_ouviai' );

/** Usuário do banco de dados MySQL */
define( 'DB_USER', 'root' );

/** Senha do banco de dados MySQL */
define( 'DB_PASSWORD', '' );

/** Nome do host do MySQL */
define( 'DB_HOST', 'localhost' );

/** Charset do banco de dados a ser usado na criação das tabelas. */
define( 'DB_CHARSET', 'utf8mb4' );

/** O tipo de Collate do banco de dados. Não altere isso se tiver dúvidas. */
define( 'DB_COLLATE', '' );

/**#@+
 * Chaves únicas de autenticação e salts.
 *
 * Altere cada chave para um frase única!
 * Você pode gerá-las
 * usando o {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org
 * secret-key service}
 * Você pode alterá-las a qualquer momento para invalidar quaisquer
 * cookies existentes. Isto irá forçar todos os
 * usuários a fazerem login novamente.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'T|y?% jhGH%:MMeOt+BvN$Nv.Dj$CdzWq[;@%R$S]^62_-84e[ACDpWp&8(.X7rc' );
define( 'SECURE_AUTH_KEY',  '}wXqAb<&JcLZw3BAXCs BC!TPC[#UxcU+z:%#}?-h2Y*TKDe!gI!QaKRfy<dYc;x' );
define( 'LOGGED_IN_KEY',    '9S;AIgZcVAdz6C2X[nlR7|M0,!rtNpa5%LVrwB{-)&+[:0-2`GN1Ki3K+#?/Dwh-' );
define( 'NONCE_KEY',        'v@3WZ0Vz>BrGHAmPST+#h`loSyg=|FTXLJY-=fta~ZN&_~6F/CW98eN#FKQ4]9Kn' );
define( 'AUTH_SALT',        '1YmvuJtzySl#<PyJmrj/ WV%^.kd1)#AqL?Xf5|aCmH8uv:si,F^kSV$j,v?7xMl' );
define( 'SECURE_AUTH_SALT', 'T-g8R>8:uNyTe#G}>~-M7z}=0dC5#ajkAbme>!a}6B%vI0XjaK8LpGq{Aw=N,.?P' );
define( 'LOGGED_IN_SALT',   'y0;]+To:6 #(.76T29o)H;QC8<PaVI_cr@e;z>wRFrOl[t>0@M@s_HV+F^h0QAn ' );
define( 'NONCE_SALT',       'J7i/P)[;x)2-J;C&c8R5&&|3:cCI/SOVK.&fmoscnF}[s=MOn![$IdtiMp>+!+!`' );

/**#@-*/

/**
 * Prefixo da tabela do banco de dados do WordPress.
 *
 * Você pode ter várias instalações em um único banco de dados se você der
 * um prefixo único para cada um. Somente números, letras e sublinhados!
 */
$table_prefix = 'wp_';

/**
 * Para desenvolvedores: Modo de debug do WordPress.
 *
 * Altere isto para true para ativar a exibição de avisos
 * durante o desenvolvimento. É altamente recomendável que os
 * desenvolvedores de plugins e temas usem o WP_DEBUG
 * em seus ambientes de desenvolvimento.
 *
 * Para informações sobre outras constantes que podem ser utilizadas
 * para depuração, visite o Codex.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Adicione valores personalizados entre esta linha até "Isto é tudo". */



/* Isto é tudo, pode parar de editar! :) */

/** Caminho absoluto para o diretório WordPress. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Configura as variáveis e arquivos do WordPress. */
require_once ABSPATH . 'wp-settings.php';
