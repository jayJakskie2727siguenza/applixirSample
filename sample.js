var startMode = 3;
const initApplixirVideoUnit = (t) => {
		t.verbosity > 3 && console.log("initApplixirVideoUnit"),
			(startMode = 1),
			invokeApplixirVideoUnit(t);
	},
	playApplixirVideoUnit = (t) => {
		t.verbosity > 3 && console.log("playApplixirVideoUnit"),
			(startMode = 2),
			invokeApplixirVideoUnit(t);
	},
	invokeApplixirVideoUnit = (t) => {
		const e = void 0 !== t.yOffs ? t.yOffs : -1;
		if (((t.startMode = startMode), 2 === startMode))
			return void (startMode = 0);
		(t.isMobile = window.mobilecheck()),
			t.isMobile &&
				((/Apple/.test(navigator.vendor) &&
					!/CriOS/.test(navigator.userAgent) &&
					!/FxiOS/.test(navigator.userAgent)) ||
					/iPad/.test(navigator.userAgent)) &&
				"max" === t.vSize &&
				(t.vSize = "640x480"),
			t.verbosity > 3 &&
				3 === t.startMode &&
				console.log("invokeApplixirVideoUnit");
		const o = () =>
				window.innerWidth
					? window.innerWidth
					: document.documentElement.clientWidth
					? document.documentElement.clientWidth
					: screen.width,
			a = () =>
				window.innerHeight
					? window.innerHeight
					: document.documentElement.clientHeight
					? document.documentElement.clientHeight
					: screen.height;
		let i = "max" === t.vSize ? 0 : 50;
		null != t.vtos && (i += t.vtos);
		let r = "max" === t.vSize ? 0 : 50;
		null != t.htos && (r += t.htos),
			"max" === t.vSize
				? t.isMobile
					? ((t.targetW = o()),
					  o() > a() ? (t.targetH = a()) : (t.targetH = a() * (o() / a())))
					: ((t.targetW = o()), (t.targetH = a()))
				: ((t.targetW = 640), (t.targetH = "640x360" === t.vSize ? 360 : 480));
		var s;
		(t.curW = Math.max(t.targetW, o())), (t.curH = Math.max(t.targetH, a()));
		if (
			((t.pageUrl = window.location.protocol + "//" + window.location.hostname),
			t.pageUrl.includes("localhost") &&
				(t.pageUrl = t.pageUrl + ":" + window.location.port),
			null != t.z2url &&
				navigator.userAgent &&
				navigator.vendor &&
				((/Google Inc/.test(navigator.vendor) &&
					/Chrome/.test(navigator.userAgent)) ||
					/Android/.test(navigator.userAgent) ||
					/OPR/.test(navigator.userAgent) ||
					(/Apple/.test(navigator.vendor) &&
						!/CriOS/.test(navigator.userAgent) &&
						!/FxiOS/.test(navigator.userAgent)) ||
					/iPad/.test(navigator.userAgent)))
		) {
			let a,
				i,
				r,
				s,
				l,
				d = 0;
			if (
				(t.verbosity > 3 && console.log("Launching: " + t.z2url),
				/Google Inc/.test(navigator.vendor) &&
				/Chrome/.test(navigator.userAgent)
					? ((a = t.targetW + 32), (i = t.targetH + 24), (t.vtos = -3))
					: ((a = t.targetW + 32), (i = t.targetH + 24), (t.vtos = -1)),
				(t.htos = -1),
				null == t.z2opts)
			) {
				let t = null != window.screenLeft ? window.screenLeft : window.screenX,
					n = null != window.screenTop ? window.screenTop : window.screenY,
					c = o(),
					p = screen.height;
				(r = c / 2 - a / 2 + t),
					(s = -1 == e ? p / 2 - i / 2 + n : e),
					(l = "left=" + r.toString() + ",top=" + s.toString() + ","),
					(d = "width=" + a.toString() + ",height=" + i.toString() + ",");
			} else
				"max" === t.z2opts &&
					((l = "left=0,top=0,"),
					(d =
						"width=" +
						(screen.width + 32).toString() +
						",height=" +
						(screen.height + 12).toString() +
						","));
			let c =
				"scrollbars=0,resizable=0,status=0,location=0,toolbar=0,menubar=0," +
				d +
				l;
			t.verbosity > 3 && console.log("Params: " + c);
			let p = window.open(t.z2url, "Applixir", c, !1);
			if (null != p) return void p.focus();
			var n = "z2";
			t.isMobile ? (n += "m") : (n += "w"),
				/Google Inc/.test(navigator.vendor) &&
				/Chrome/.test(navigator.userAgent)
					? (n += "C")
					: /Android/.test(navigator.userAgent)
					? (n += "A")
					: !/Apple/.test(navigator.vendor) ||
					  /CriOS/.test(navigator.userAgent) ||
					  /FxiOS/.test(navigator.userAgent)
					? /iPad/.test(navigator.userAgent)
						? (n += "i")
						: /OPR/.test(navigator.userAgent)
						? (n += "o")
						: (n += "?")
					: (n += "S"),
				(t.gameId += "-" + n),
				console.log("Z2 Load bypass. errstr: " + n);
		}
		return new Promise((e, o) => {
			t.zoneId || o(5);
			let a = new XMLHttpRequest();
			(a.onerror = function (e) {
				t.verbosity > 3 &&
					console.log("Invalid browser status 1: ", e.statusText),
					o(1);
			}),
				(a.onreadystatechange = function () {
					4 === a.readyState &&
						(200 === a.status
							? a.responseText.indexOf("foobar") >= 0
								? e()
								: o(4)
							: (t.verbosity > 3 && console.log("xhr status: ", a.status),
							  0 === a.status ? o(2) : 401 === a.status ? o(3) : o(4)));
				});
			try {
				a.open(
					"GET",
					"https://ssd.appprizes.com/adcentral/openx/www/delivery/foobar.html",
					!0
				),
					a.send();
			} catch (t) {
				console.log("open/send error"), o(4);
			}
		})
			.then((n) => {
				let l = document.getElementById("applixir_vanishing_div"),
					d = document.getElementById("applixir_parent");
				if (null === d)
					return void console.log(
						"applixir_parent problem, check Applixir anchor"
					);
				switch (
					(t.verbosity > 2 && console.log("Current page: " + t.pageUrl),
					(t.isPortrait = t.curH >= t.curW),
					t.isMobile &&
						((t.prebid = !1),
						null != t.vposM && (t.vpos = t.vposM),
						(t.targetW = t.curW),
						t.isPortrait && "max" !== t.vSize
							? (t.targetH = t.curH = t.curW)
							: (t.targetH = t.curH)),
					(d.className = "applixir_iframe"),
					(l.scrolling = "no"),
					(l.style.position = "absolute"),
					(l.style.border = "none"),
					(l.style.left = "-300%"),
					(l.style.margin = "margin: 0%"),
					(l.style.transition = "left 1.0s ease"),
					(l.style.width = "1px"),
					(l.style.height = "1px"),
					(d.style.textAlign = "center"),
					(d.scrolling = "no"),
					(d.frameBorder = "0px"),
					(d.style.position = "absolute"),
					(d.style.left = "max" === t.vSize ? 0 : -t.targetW / 2 + "px"),
					(d.style.width =
						("max" === t.vSize ? t.targetW : t.targetW + 32) + "px"),
					(d.style.height =
						("max" === t.vSize ? t.targetH : t.targetH + 24) + "px"),
					(l.style.top = l.style.bottom = d.style.top = d.style.bottom = ""),
					t.vpos)
				) {
					case "top":
						d.style.top = l.style.top = "0px";
						break;
					case "bottom":
						d.style.bottom = l.style.bottom = "0px";
						break;
					default:
						-1 == e
							? ((d.style.verticalAlign = "middle"),
							  (l.style.top = i + "%"),
							  (d.style.top =
									"max" === t.vSize ? 0 : (t.isMobile, -t.targetH / 2 + "px")))
							: (t.verbosity > 3 && console.log("Setting yOffset to: " + e),
							  (d.style.top = "auto"),
							  (l.style.top = e + "px"),
							  (d.style.verticalAlign = "top"));
				}
				const c = () => {
					(() => {
						"max" === t.vSize
							? t.isMobile
								? ((t.targetW = o()),
								  o() > a()
										? (t.targetH = a())
										: (t.targetH = a() * (o() / a())))
								: ((t.targetW = o()), (t.targetH = a()))
							: ((t.targetW = 640),
							  (t.targetH = "640x360" === t.vSize ? 360 : 480));
						let e = document.getElementById("applixir_vanishing_div");
						(e.style.position = "absolute"),
							(s = Math.min(Math.min(o() / t.targetW, a() / t.targetH), 1)),
							(e.style.transform = "scale(" + s + ")"),
							(e.style.transformOrigin = "top left"),
							t.verbosity > 3 && console.log("resize: " + s);
					})();
				};
				window.addEventListener("resize", c),
					l.removeAttribute("hidden"),
					t.pageUrl.includes("localhost")
						? (d.src = "./applixir.iframe.html")
						: (d.src = "https://cdn.applixir.com/applixir.iframe.html"),
					(d.onload = void (
						t.verbosity > 2 && console.log("Referrer: " + document.referrer)
					));
				var p = t.pageUrl.includes("localhost")
					? t.pageUrl
					: "https://cdn.applixir.com";
				const g = (e) => {
					switch (e.data) {
						case "applixirIframeReady":
							e.source.postMessage(
								"videoOptionsDataSet=" + JSON.stringify(t),
								p
							),
								1 === startMode &&
									(void 0 !== t.adStatusCb &&
										"function" == typeof t.adStatusCb &&
										t.adStatusCb("ad-initready"),
									(startInterval = setInterval(() => {
										0 === startMode &&
											(clearInterval(startInterval),
											e.source.postMessage("initApplixirAd", p));
									}, 250)));
							break;
						case "videoInitialized":
							(document.getElementById("applixir_vanishing_div").style.left =
								r + "%"),
								c(),
								t.verbosity > 3 &&
									console.log(
										"positioning: " +
											l.style.left +
											" " +
											l.style.top +
											" " +
											d.offsetTop +
											" " +
											s +
											" " +
											d.style.width +
											" " +
											d.style.height +
											" " +
											o() +
											" " +
											a() +
											" " +
											t.curW +
											" " +
											t.curH +
											" " +
											t.targetW +
											" " +
											t.targetH
									),
								e.source.postMessage("displayApplixirAd", p);
							break;
						case "videoInitReady":
							1 === startMode &&
								void 0 !== t.adStatusCb &&
								"function" == typeof t.adStatusCb &&
								t.adStatusCb("ad-ready");
							break;
						case "videoStarted":
							void 0 !== t.adStatusCb &&
								"function" == typeof t.adStatusCb &&
								t.adStatusCb("ad-started");
							break;
						case "fallbackStarted":
							void 0 !== t.adStatusCb &&
								"function" == typeof t.adStatusCb &&
								t.adStatusCb("fb-started");
							break;
						case "videoWatched":
							void 0 !== t.adStatusCb &&
								"function" == typeof t.adStatusCb &&
								t.adStatusCb("ad-watched");
							break;
						case "rewardGranted":
							void 0 !== t.adStatusCb &&
								"function" == typeof t.adStatusCb &&
								t.adStatusCb("ad-rewarded");
							break;
						case "videoNotWatched":
							void 0 !== t.adStatusCb &&
								"function" == typeof t.adStatusCb &&
								t.adStatusCb("ad-interrupted");
							break;
						case "videoNotFound":
							void 0 !== t.adStatusCb &&
								"function" == typeof t.adStatusCb &&
								t.adStatusCb("ads-unavailable");
							break;
						case "videoFallbackBanner":
							void 0 !== t.adStatusCb &&
								"function" == typeof t.adStatusCb &&
								t.adStatusCb("fb-watched");
							break;
						case "closeApplixirPlayer":
							((t) => {
								t.style.left = "-300%";
							})(document.getElementById("applixir_vanishing_div")),
								window.removeEventListener("resize", c),
								window.removeEventListener("message", g, !1),
								void 0 !== t.adStatusCb &&
									"function" == typeof t.adStatusCb &&
									t.adStatusCb("sys-closing");
					}
				};
				window.addEventListener("message", g, !1);
			})
			.catch((e) => {
				console.log("Applixir load error:", e);
				let o =
					e < 3
						? "ad-blocker"
						: 3 == e
						? "cors-error"
						: 4 == e
						? "network-error"
						: "no-zoneId";
				void 0 !== t.adStatusCb &&
					"function" == typeof t.adStatusCb &&
					(t.adStatusCb(o),
					window.postMessage("closeApplixirPlayer", t.pageUrl));
			});
	};
(window.mobilecheck = function () {
	var t,
		e = !1;
	return (
		(t = navigator.userAgent || navigator.vendor || window.opera),
		(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
			t
		) ||
			/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
				t.substr(0, 4)
			)) &&
			(e = !0),
		e
	);
}),
	(window.invokeApplixirVideoUnit = invokeApplixirVideoUnit);
