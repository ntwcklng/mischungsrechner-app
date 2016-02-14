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
			flaschengroesseInput = $("#n3");
			inputMix = $$(".inputMix input");
			updateEventList = ["change", "keyup", "paste", "input", "propertychange"];
      radioActive = false;
	},
	onDeviceReady: function() {
		this.bindEvents();
	},
	bindEvents: function() {
		flaschengroesse.forEach(function(self) {
			self.addEventListener("change", function(_self) {
        radioActive = true;
				app.calculateDilution();
			}, false);
		});
    for(event of updateEventList) {
      inputMix.forEach(function($me) {
        $me.addEventListener(event, function() {
          app.calculateDilution();
        });
      });
      flaschengroesseInput.addEventListener(event, function() {
        radioActive = false;
        app.calculateDilution();
      });
    }
	},
	getFlaschenGroesse: function() {
    if(radioActive) flaschengroesseInput.value = parseInt($('input[name="flaschengroesse"]:checked').value)
		return flaschengroesseInput.value || undefined;
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
			var res = res1[0] + 'ml' + ":" + res2[0] + 'ml';
			this.updateOutput(res);
      output.style.display = 'block';
		}
	}
};