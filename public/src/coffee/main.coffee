$ ()->
	$(".expand").on("click", ()->
		$(".hide", $(this).parent()).toggleClass("hide")
	)