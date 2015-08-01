(function() {
	slice = Array.prototype.slice;
	$ = function(expr, con) {
		var el = typeof expr === "string"? (con || document).querySelector(expr) : expr || null;
		return el || document.createElement("div");
	}

	$$ = function(expr, con) {
		return slice.call((con || document).querySelectorAll(expr));
	}
})();
var app = {
	initialize: function() {

		this.assignValues();
		document.addEventListener("deviceready", this.onDeviceReady(), false);
	},
	assignValues: function() {
		 output = $("#output");
			teil1 = $("#n1");
			teil2 = $("#n2");
			flaschengroesse = $$(".flaschengroesse input");
			inputMix = $$(".inputMix input");
			updateEventList = ["change", "keyup", "paste", "input", "propertychange"];
	},
	onDeviceReady: function() {
		console.log("device ready");
		this.bindEvents();
	},
	bindEvents: function() {
		flaschengroesse.forEach(function(self) {
			self.addEventListener("change", function(_self) {
				app.calculateDilution();
			}, false);
		});
		inputMix.forEach(function(self) {
			for(event of updateEventList) {
				self.addEventListener(event, function() {
					app.calculateDilution();
				});
			};
		});
	},
	getFlaschenGroesse: function() {
		var flascheVal = $('input[name="flaschengroesse"]:checked').value;
		return flascheVal || undefined;
	},
	getMixValue: function(id) {
		return (id === 1) ? parseInt(teil1.value) : parseInt(teil2.value);
	},
	updateOutput: function(res) {
		output.innerHTML = res;
	},
	calculateDilution: function() {
		var teil1Value = this.getMixValue(1),
			teil2Value = this.getMixValue(2),
			flaschengroesse = this.getFlaschenGroesse();
		if(teil1Value && teil2Value && flaschengroesse) {
			var step = flaschengroesse / (teil1Value + teil2Value);
			var res1 = Math.round(step * teil1Value).toFixed(2).split(".");
			var res2 = Math.round(step * teil2Value).toFixed(2).split(".");
			var res = res1[0] + ":" + res2[0];
			this.updateOutput(res);
		}
	}
};