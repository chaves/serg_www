<script>
	import logo_hal from '$lib/assets/images/HAL_logotype-rvb_fond-clair_fr.png?enhanced&w=400;200';
</script>

<svelte:head>
	<title>Sustainable Economy Research Group (SERG) - Publications</title>
</svelte:head>

<h1>Publications</h1>

<a href="https://centralesupelec.hal.science/LGI">
	<enhanced:img
		src={logo_hal}
		alt="HAL archives ouvertes"
		sizes="(min-width:1080px) 400px, (min-width:768px) 200px"
		class="mx-auto -my-9"
	/>
</a>

<div class="space-y-6">
	<iframe
		title="Publications LGI"
		frameborder="0"
		height="1500"
		src="https://haltools.archives-ouvertes.fr/Public/afficheRequetePubli.php?typdoc=('ART','COMM','POSTER','OUV','COUV','DOUV','PATENT','THESE','HDR')&amp;collection_exp=LGI-ED&amp;CB_auteur=oui&amp;CB_titre=oui&amp;CB_article=oui&amp;langue=Anglais&amp;tri_exp=annee_publi&amp;tri_exp2=typdoc&amp;tri_exp3=date_publi&amp;ordre_aff=TA&amp;CB_rubriqueDiv=oui&amp;Fen=Aff&amp;css=../css/VisuOmbreVignettes.css"
		width="100%"
	></iframe>
</div>
