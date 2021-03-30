//  intergrated Twitter and LinkedIn
function init() {
	'use strict';

	function lnShare(fs) { // function to render the script that renders the LinkedIn button

		const ln = document.createElement('script');
		ln.id = "LN";
		ln.type = "IN/Share";

		ln.setAttribute("data-url", fs); //changed from fs.href to just fs to get working

		return ln;
	}
	//include function for twitter widgets supplied by Twitter
	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if(!d.getElementById(id)) {
			js = d.createElement(s);
			js.id = id;
			js.src = "https://platform.twitter.com/widgets.js";
			fjs.parentNode.insertBefore(js, fjs);
		}
	}(document, "script", "twitter-wjs"));//end code for twitter widgets
	document.getElementById('twitter-wjs').addEventListener('load', function() {
		const root = "https://www.onetonline.org/link/summary/";
		//const twt = "https://twitter.com/intent/tweet?url=";
		const fs = document.createElement('a'); // creates the anchor for the link to the functional skills page
		fs.id = "FS";
		const linkText = document.createTextNode("functional skills");
		fs.appendChild(linkText);
		fs.classList.add("hide");
		fs.title = "functional skills";
		fs.href = "https://www.onetonline.org/link/summary/";
		fs.target = "_blank";

	  document.getElementById("p1").appendChild(fs);
		document.getElementById("container").addEventListener("click", function(e) {
			const tgt = e.target;
			const isSummary = tgt.tagName === "SUMMARY";
			const code = tgt.dataset.code;
			const job = tgt.textContent;
			fs.classList.toggle("hide", !isSummary || !code); // show only if summary AND code exists
			if(isSummary && code) { // start if statement block
				fs.href = root + code;
				document.getElementById("p2").innerHTML = ""; // clear the previous tweet button
				twttr.widgets.createShareButton(root + code, document.getElementById('p2'), {
					text: job
				});
				document.getElementById("p3").innerHTML = ""; // clear the previous LinkedIn button
				const ln = lnShare(fs.href);

				document.getElementById("p3").appendChild(ln);
				IN.parse();
			} // end if
		});
	});
} // End of init() function.
window.onload = init;
