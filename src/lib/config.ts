/**
 * Configuration constants for the application
 */

// CMS Base URL - can be overridden with environment variable
export const CMS_BASE_URL =
	import.meta.env.PUBLIC_CMS_BASE_URL || 'https://cms.serg.paris';

// Site URL
export const SITE_URL = import.meta.env.PUBLIC_SITE_URL || 'https://serg.paris';

