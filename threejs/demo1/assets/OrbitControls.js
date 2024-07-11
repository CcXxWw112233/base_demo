/**
 * Minified by jsDelivr using Terser v3.14.1.
 * Original file: /npm/three-orbitcontrols@2.110.3/OrbitControls.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
(THREE.OrbitControls = function (e, t) {
	var o, n, a, i, c;
	void 0 === t &&
		console.warn(
			'THREE.OrbitControls: The second parameter "domElement" is now mandatory.'
		),
		t === document &&
			console.error(
				'THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'
			),
		(this.object = e),
		(this.domElement = t),
		(this.enabled = !0),
		(this.target = new THREE.Vector3()),
		(this.minDistance = 0),
		(this.maxDistance = 1 / 0),
		(this.minZoom = 0),
		(this.maxZoom = 1 / 0),
		(this.minPolarAngle = 0),
		(this.maxPolarAngle = Math.PI),
		(this.minAzimuthAngle = -1 / 0),
		(this.maxAzimuthAngle = 1 / 0),
		(this.enableDamping = !1),
		(this.dampingFactor = 0.05),
		(this.enableZoom = !0),
		(this.zoomSpeed = 1),
		(this.enableRotate = !0),
		(this.rotateSpeed = 1),
		(this.enablePan = !0),
		(this.panSpeed = 1),
		(this.screenSpacePanning = !1),
		(this.keyPanSpeed = 7),
		(this.autoRotate = !1),
		(this.autoRotateSpeed = 2),
		(this.enableKeys = !0),
		(this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 }),
		(this.mouseButtons = {
			LEFT: THREE.MOUSE.ROTATE,
			MIDDLE: THREE.MOUSE.DOLLY,
			RIGHT: THREE.MOUSE.PAN,
		}),
		(this.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }),
		(this.target0 = this.target.clone()),
		(this.position0 = this.object.position.clone()),
		(this.zoom0 = this.object.zoom),
		(this.getPolarAngle = function () {
			return p.phi;
		}),
		(this.getAzimuthalAngle = function () {
			return p.theta;
		}),
		(this.saveState = function () {
			r.target0.copy(r.target),
				r.position0.copy(r.object.position),
				(r.zoom0 = r.object.zoom);
		}),
		(this.reset = function () {
			r.target.copy(r.target0),
				r.object.position.copy(r.position0),
				(r.object.zoom = r.zoom0),
				r.object.updateProjectionMatrix(),
				r.dispatchEvent(s),
				r.update(),
				(m = l.NONE);
		}),
		(this.update =
			((o = new THREE.Vector3()),
			(n = new THREE.Quaternion().setFromUnitVectors(
				e.up,
				new THREE.Vector3(0, 1, 0)
			)),
			(a = n.clone().inverse()),
			(i = new THREE.Vector3()),
			(c = new THREE.Quaternion()),
			function () {
				var e = r.object.position;
				return (
					o.copy(e).sub(r.target),
					o.applyQuaternion(n),
					p.setFromVector3(o),
					r.autoRotate &&
						m === l.NONE &&
						w(((2 * Math.PI) / 60 / 60) * r.autoRotateSpeed),
					r.enableDamping
						? ((p.theta += d.theta * r.dampingFactor),
						  (p.phi += d.phi * r.dampingFactor))
						: ((p.theta += d.theta), (p.phi += d.phi)),
					(p.theta = Math.max(
						r.minAzimuthAngle,
						Math.min(r.maxAzimuthAngle, p.theta)
					)),
					(p.phi = Math.max(r.minPolarAngle, Math.min(r.maxPolarAngle, p.phi))),
					p.makeSafe(),
					(p.radius *= b),
					(p.radius = Math.max(
						r.minDistance,
						Math.min(r.maxDistance, p.radius)
					)),
					!0 === r.enableDamping
						? r.target.addScaledVector(T, r.dampingFactor)
						: r.target.add(T),
					o.setFromSpherical(p),
					o.applyQuaternion(a),
					e.copy(r.target).add(o),
					r.object.lookAt(r.target),
					!0 === r.enableDamping
						? ((d.theta *= 1 - r.dampingFactor),
						  (d.phi *= 1 - r.dampingFactor),
						  T.multiplyScalar(1 - r.dampingFactor))
						: (d.set(0, 0, 0), T.set(0, 0, 0)),
					(b = 1),
					!!(
						O ||
						i.distanceToSquared(r.object.position) > h ||
						8 * (1 - c.dot(r.object.quaternion)) > h
					) &&
						(r.dispatchEvent(s),
						i.copy(r.object.position),
						c.copy(r.object.quaternion),
						(O = !1),
						!0)
				);
			})),
		(this.dispose = function () {
			r.domElement.removeEventListener("contextmenu", $, !1),
				r.domElement.removeEventListener("mousedown", F, !1),
				r.domElement.removeEventListener("wheel", K, !1),
				r.domElement.removeEventListener("touchstart", q, !1),
				r.domElement.removeEventListener("touchend", J, !1),
				r.domElement.removeEventListener("touchmove", Q, !1),
				document.removeEventListener("mousemove", B, !1),
				document.removeEventListener("mouseup", G, !1),
				r.domElement.removeEventListener("keydown", W, !1);
		});
	var r = this,
		s = { type: "change" },
		u = { type: "start" },
		E = { type: "end" },
		l = {
			NONE: -1,
			ROTATE: 0,
			DOLLY: 1,
			PAN: 2,
			TOUCH_ROTATE: 3,
			TOUCH_PAN: 4,
			TOUCH_DOLLY_PAN: 5,
			TOUCH_DOLLY_ROTATE: 6,
		},
		m = l.NONE,
		h = 1e-6,
		p = new THREE.Spherical(),
		d = new THREE.Spherical(),
		b = 1,
		T = new THREE.Vector3(),
		O = !1,
		f = new THREE.Vector2(),
		R = new THREE.Vector2(),
		g = new THREE.Vector2(),
		H = new THREE.Vector2(),
		v = new THREE.Vector2(),
		y = new THREE.Vector2(),
		P = new THREE.Vector2(),
		N = new THREE.Vector2(),
		A = new THREE.Vector2();
	function L() {
		return Math.pow(0.95, r.zoomSpeed);
	}
	function w(e) {
		d.theta -= e;
	}
	function j(e) {
		d.phi -= e;
	}
	var M,
		C =
			((M = new THREE.Vector3()),
			function (e, t) {
				M.setFromMatrixColumn(t, 0), M.multiplyScalar(-e), T.add(M);
			}),
		S = (function () {
			var e = new THREE.Vector3();
			return function (t, o) {
				!0 === r.screenSpacePanning
					? e.setFromMatrixColumn(o, 1)
					: (e.setFromMatrixColumn(o, 0), e.crossVectors(r.object.up, e)),
					e.multiplyScalar(t),
					T.add(e);
			};
		})(),
		k = (function () {
			var e = new THREE.Vector3();
			return function (t, o) {
				var n = r.domElement;
				if (r.object.isPerspectiveCamera) {
					var a = r.object.position;
					e.copy(a).sub(r.target);
					var i = e.length();
					(i *= Math.tan(((r.object.fov / 2) * Math.PI) / 180)),
						C((2 * t * i) / n.clientHeight, r.object.matrix),
						S((2 * o * i) / n.clientHeight, r.object.matrix);
				} else
					r.object.isOrthographicCamera
						? (C(
								(t * (r.object.right - r.object.left)) /
									r.object.zoom /
									n.clientWidth,
								r.object.matrix
						  ),
						  S(
								(o * (r.object.top - r.object.bottom)) /
									r.object.zoom /
									n.clientHeight,
								r.object.matrix
						  ))
						: (console.warn(
								"WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."
						  ),
						  (r.enablePan = !1));
			};
		})();
	function Y(e) {
		r.object.isPerspectiveCamera
			? (b /= e)
			: r.object.isOrthographicCamera
			? ((r.object.zoom = Math.max(
					r.minZoom,
					Math.min(r.maxZoom, r.object.zoom * e)
			  )),
			  r.object.updateProjectionMatrix(),
			  (O = !0))
			: (console.warn(
					"WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."
			  ),
			  (r.enableZoom = !1));
	}
	function D(e) {
		r.object.isPerspectiveCamera
			? (b *= e)
			: r.object.isOrthographicCamera
			? ((r.object.zoom = Math.max(
					r.minZoom,
					Math.min(r.maxZoom, r.object.zoom / e)
			  )),
			  r.object.updateProjectionMatrix(),
			  (O = !0))
			: (console.warn(
					"WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."
			  ),
			  (r.enableZoom = !1));
	}
	function x(e) {
		f.set(e.clientX, e.clientY);
	}
	function U(e) {
		H.set(e.clientX, e.clientY);
	}
	function V(e) {
		if (1 == e.touches.length) f.set(e.touches[0].pageX, e.touches[0].pageY);
		else {
			var t = 0.5 * (e.touches[0].pageX + e.touches[1].pageX),
				o = 0.5 * (e.touches[0].pageY + e.touches[1].pageY);
			f.set(t, o);
		}
	}
	function z(e) {
		if (1 == e.touches.length) H.set(e.touches[0].pageX, e.touches[0].pageY);
		else {
			var t = 0.5 * (e.touches[0].pageX + e.touches[1].pageX),
				o = 0.5 * (e.touches[0].pageY + e.touches[1].pageY);
			H.set(t, o);
		}
	}
	function X(e) {
		var t = e.touches[0].pageX - e.touches[1].pageX,
			o = e.touches[0].pageY - e.touches[1].pageY,
			n = Math.sqrt(t * t + o * o);
		P.set(0, n);
	}
	function _(e) {
		if (1 == e.touches.length) R.set(e.touches[0].pageX, e.touches[0].pageY);
		else {
			var t = 0.5 * (e.touches[0].pageX + e.touches[1].pageX),
				o = 0.5 * (e.touches[0].pageY + e.touches[1].pageY);
			R.set(t, o);
		}
		g.subVectors(R, f).multiplyScalar(r.rotateSpeed);
		var n = r.domElement;
		w((2 * Math.PI * g.x) / n.clientHeight),
			j((2 * Math.PI * g.y) / n.clientHeight),
			f.copy(R);
	}
	function Z(e) {
		if (1 == e.touches.length) v.set(e.touches[0].pageX, e.touches[0].pageY);
		else {
			var t = 0.5 * (e.touches[0].pageX + e.touches[1].pageX),
				o = 0.5 * (e.touches[0].pageY + e.touches[1].pageY);
			v.set(t, o);
		}
		y.subVectors(v, H).multiplyScalar(r.panSpeed), k(y.x, y.y), H.copy(v);
	}
	function I(e) {
		var t = e.touches[0].pageX - e.touches[1].pageX,
			o = e.touches[0].pageY - e.touches[1].pageY,
			n = Math.sqrt(t * t + o * o);
		N.set(0, n), A.set(0, Math.pow(N.y / P.y, r.zoomSpeed)), Y(A.y), P.copy(N);
	}
	function F(e) {
		if (!1 !== r.enabled) {
			switch (
				(e.preventDefault(),
				r.domElement.focus ? r.domElement.focus() : window.focus(),
				e.button)
			) {
				case 0:
					switch (r.mouseButtons.LEFT) {
						case THREE.MOUSE.ROTATE:
							if (e.ctrlKey || e.metaKey || e.shiftKey) {
								if (!1 === r.enablePan) return;
								U(e), (m = l.PAN);
							} else {
								if (!1 === r.enableRotate) return;
								x(e), (m = l.ROTATE);
							}
							break;
						case THREE.MOUSE.PAN:
							if (e.ctrlKey || e.metaKey || e.shiftKey) {
								if (!1 === r.enableRotate) return;
								x(e), (m = l.ROTATE);
							} else {
								if (!1 === r.enablePan) return;
								U(e), (m = l.PAN);
							}
							break;
						default:
							m = l.NONE;
					}
					break;
				case 1:
					switch (r.mouseButtons.MIDDLE) {
						case THREE.MOUSE.DOLLY:
							if (!1 === r.enableZoom) return;
							!(function (e) {
								P.set(e.clientX, e.clientY);
							})(e),
								(m = l.DOLLY);
							break;
						default:
							m = l.NONE;
					}
					break;
				case 2:
					switch (r.mouseButtons.RIGHT) {
						case THREE.MOUSE.ROTATE:
							if (!1 === r.enableRotate) return;
							x(e), (m = l.ROTATE);
							break;
						case THREE.MOUSE.PAN:
							if (!1 === r.enablePan) return;
							U(e), (m = l.PAN);
							break;
						default:
							m = l.NONE;
					}
			}
			m !== l.NONE &&
				(document.addEventListener("mousemove", B, !1),
				document.addEventListener("mouseup", G, !1),
				r.dispatchEvent(u));
		}
	}
	function B(e) {
		if (!1 !== r.enabled)
			switch ((e.preventDefault(), m)) {
				case l.ROTATE:
					if (!1 === r.enableRotate) return;
					!(function (e) {
						R.set(e.clientX, e.clientY),
							g.subVectors(R, f).multiplyScalar(r.rotateSpeed);
						var t = r.domElement;
						w((2 * Math.PI * g.x) / t.clientHeight),
							j((2 * Math.PI * g.y) / t.clientHeight),
							f.copy(R),
							r.update();
					})(e);
					break;
				case l.DOLLY:
					if (!1 === r.enableZoom) return;
					!(function (e) {
						N.set(e.clientX, e.clientY),
							A.subVectors(N, P),
							A.y > 0 ? Y(L()) : A.y < 0 && D(L()),
							P.copy(N),
							r.update();
					})(e);
					break;
				case l.PAN:
					if (!1 === r.enablePan) return;
					!(function (e) {
						v.set(e.clientX, e.clientY),
							y.subVectors(v, H).multiplyScalar(r.panSpeed),
							k(y.x, y.y),
							H.copy(v),
							r.update();
					})(e);
			}
	}
	function G(e) {
		!1 !== r.enabled &&
			(document.removeEventListener("mousemove", B, !1),
			document.removeEventListener("mouseup", G, !1),
			r.dispatchEvent(E),
			(m = l.NONE));
	}
	function K(e) {
		!1 === r.enabled ||
			!1 === r.enableZoom ||
			(m !== l.NONE && m !== l.ROTATE) ||
			(e.preventDefault(),
			e.stopPropagation(),
			r.dispatchEvent(u),
			(function (e) {
				e.deltaY < 0 ? D(L()) : e.deltaY > 0 && Y(L()), r.update();
			})(e),
			r.dispatchEvent(E));
	}
	function W(e) {
		!1 !== r.enabled &&
			!1 !== r.enableKeys &&
			!1 !== r.enablePan &&
			(function (e) {
				var t = !1;
				switch (e.keyCode) {
					case r.keys.UP:
						k(0, r.keyPanSpeed), (t = !0);
						break;
					case r.keys.BOTTOM:
						k(0, -r.keyPanSpeed), (t = !0);
						break;
					case r.keys.LEFT:
						k(r.keyPanSpeed, 0), (t = !0);
						break;
					case r.keys.RIGHT:
						k(-r.keyPanSpeed, 0), (t = !0);
				}
				t && (e.preventDefault(), r.update());
			})(e);
	}
	function q(e) {
		if (!1 !== r.enabled) {
			switch ((e.preventDefault(), e.touches.length)) {
				case 1:
					switch (r.touches.ONE) {
						case THREE.TOUCH.ROTATE:
							if (!1 === r.enableRotate) return;
							V(e), (m = l.TOUCH_ROTATE);
							break;
						case THREE.TOUCH.PAN:
							if (!1 === r.enablePan) return;
							z(e), (m = l.TOUCH_PAN);
							break;
						default:
							m = l.NONE;
					}
					break;
				case 2:
					switch (r.touches.TWO) {
						case THREE.TOUCH.DOLLY_PAN:
							if (!1 === r.enableZoom && !1 === r.enablePan) return;
							!(function (e) {
								r.enableZoom && X(e), r.enablePan && z(e);
							})(e),
								(m = l.TOUCH_DOLLY_PAN);
							break;
						case THREE.TOUCH.DOLLY_ROTATE:
							if (!1 === r.enableZoom && !1 === r.enableRotate) return;
							!(function (e) {
								r.enableZoom && X(e), r.enableRotate && V(e);
							})(e),
								(m = l.TOUCH_DOLLY_ROTATE);
							break;
						default:
							m = l.NONE;
					}
					break;
				default:
					m = l.NONE;
			}
			m !== l.NONE && r.dispatchEvent(u);
		}
	}
	function Q(e) {
		if (!1 !== r.enabled)
			switch ((e.preventDefault(), e.stopPropagation(), m)) {
				case l.TOUCH_ROTATE:
					if (!1 === r.enableRotate) return;
					_(e), r.update();
					break;
				case l.TOUCH_PAN:
					if (!1 === r.enablePan) return;
					Z(e), r.update();
					break;
				case l.TOUCH_DOLLY_PAN:
					if (!1 === r.enableZoom && !1 === r.enablePan) return;
					!(function (e) {
						r.enableZoom && I(e), r.enablePan && Z(e);
					})(e),
						r.update();
					break;
				case l.TOUCH_DOLLY_ROTATE:
					if (!1 === r.enableZoom && !1 === r.enableRotate) return;
					!(function (e) {
						r.enableZoom && I(e), r.enableRotate && _(e);
					})(e),
						r.update();
					break;
				default:
					m = l.NONE;
			}
	}
	function J(e) {
		!1 !== r.enabled && (r.dispatchEvent(E), (m = l.NONE));
	}
	function $(e) {
		!1 !== r.enabled && e.preventDefault();
	}
	r.domElement.addEventListener("contextmenu", $, !1),
		r.domElement.addEventListener("mousedown", F, !1),
		r.domElement.addEventListener("wheel", K, !1),
		r.domElement.addEventListener("touchstart", q, !1),
		r.domElement.addEventListener("touchend", J, !1),
		r.domElement.addEventListener("touchmove", Q, !1),
		r.domElement.addEventListener("keydown", W, !1),
		-1 === r.domElement.tabIndex && (r.domElement.tabIndex = 0),
		this.update();
}),
	(THREE.OrbitControls.prototype = Object.create(
		THREE.EventDispatcher.prototype
	)),
	(THREE.OrbitControls.prototype.constructor = THREE.OrbitControls),
	(THREE.MapControls = function (e, t) {
		THREE.OrbitControls.call(this, e, t),
			(this.mouseButtons.LEFT = THREE.MOUSE.PAN),
			(this.mouseButtons.RIGHT = THREE.MOUSE.ROTATE),
			(this.touches.ONE = THREE.TOUCH.PAN),
			(this.touches.TWO = THREE.TOUCH.DOLLY_ROTATE);
	}),
	(THREE.MapControls.prototype = Object.create(
		THREE.EventDispatcher.prototype
	)),
	(THREE.MapControls.prototype.constructor = THREE.MapControls),
	(THREE.OrbitControls);
//# sourceMappingURL=/sm/933261b8ca99d1e70b966e6b6f78f3c0b698b604a00ac408823a84bd5137f445.map