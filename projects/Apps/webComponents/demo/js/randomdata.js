var photoIndex = -1;
var photos = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];
function GetNextPhoto() {
	photoIndex += 1;

	if (photoIndex >= photos.length) {
		photoIndex = 0;
	}

	return "demo/images/photos/" + photos[photoIndex] + ".png";
}

function GetRandomPhone() {

	var result = "";

	result += "(" + getRandomInt(400, 500) + ")";
	result += " " + getRandomInt(100, 800) + "-" + getRandomInt(10, 99) + "-" + getRandomInt(10, 99);

	return result;
}

function GetRandomEmail(firstName, secondName) {
	var email = firstName.substr(0, getRandomInt(Math.ceil(firstName.length / 2), firstName.length))
		+ (secondName !== undefined ? "." + secondName.substr(0, getRandomInt(Math.ceil(secondName.length / 2), secondName.length)) : "")
		+ "@name.com";

	return email.toLowerCase().replace(" ", "");
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var colorIndex = -1;
var colors = [
	primitives.common.Colors.Indigo,
	"#C57F7F",
	primitives.common.Colors.Limegreen,
	primitives.common.Colors.Orange,
	"#E64848",
	primitives.common.Colors.Olive,
	primitives.common.Colors.DarkCyan,
	"#B800E6"

];
function GetNextColor() {
	colorIndex += 1;

	if (colorIndex >= colors.length) {
		colorIndex = 0;
	}

	return colors[colorIndex];
}

function getMatrixedLeaves() {

	var rootItem = new primitives.orgdiagram.ItemConfig("Title A", "Description A", "http://www.basicprimitives.com/demo/images/photos/a.png");
	rootItem.phone = GetRandomPhone();
	rootItem.email = GetRandomEmail(rootItem.title);

	var adviser1 = new primitives.orgdiagram.ItemConfig("Adviser 1", "Adviser Description", "http://www.basicprimitives.com/demo/images/photos/z.png");
	adviser1.itemType = primitives.orgdiagram.ItemType.Adviser;
	adviser1.adviserPlacementType = primitives.orgdiagram.AdviserPlacementType.Right;
	adviser1.phone = GetRandomPhone();
	adviser1.email = GetRandomEmail(adviser1.title);
	adviser1.groupTitle = "Audit";
	rootItem.items.push(adviser1);

	var Assistant11 = new primitives.orgdiagram.ItemConfig("Assistant 1", "Assistant 1 Description", "http://www.basicprimitives.com/demo/images/photos/y.png");
	Assistant11.itemType = primitives.orgdiagram.ItemType.Assistant;
	Assistant11.adviserPlacementType = primitives.orgdiagram.AdviserPlacementType.Right;
	Assistant11.phone = GetRandomPhone();
	Assistant11.email = GetRandomEmail(Assistant11.title);
	Assistant11.groupTitle = "Audit";
	adviser1.items.push(Assistant11);

	var Assistant12 = new primitives.orgdiagram.ItemConfig("Regular", "Regular Description", "http://www.basicprimitives.com/demo/images/photos/y.png");
	Assistant12.itemType = primitives.orgdiagram.ItemType.Regular;
	Assistant12.adviserPlacementType = primitives.orgdiagram.AdviserPlacementType.Right;
	Assistant12.phone = GetRandomPhone();
	Assistant12.email = GetRandomEmail(Assistant12.title);
	Assistant12.groupTitle = "Audit";
	adviser1.items.push(Assistant12);

	var adviser2 = new primitives.orgdiagram.ItemConfig("Adviser 2", "Adviser Description", "http://www.basicprimitives.com/demo/images/photos/z.png");
	adviser2.itemType = primitives.orgdiagram.ItemType.Adviser;
	adviser2.adviserPlacementType = primitives.orgdiagram.AdviserPlacementType.Left;
	adviser2.phone = GetRandomPhone();
	adviser2.email = GetRandomEmail(adviser2.title);
	adviser2.groupTitle = "Contract";
	rootItem.items.push(adviser2);

	var Assistant1 = new primitives.orgdiagram.ItemConfig("Assistant 1", "Assitant Description", "http://www.basicprimitives.com/demo/images/photos/y.png");
	Assistant1.itemType = primitives.orgdiagram.ItemType.Assistant;
	Assistant1.adviserPlacementType = primitives.orgdiagram.AdviserPlacementType.Right;
	Assistant1.phone = GetRandomPhone();
	Assistant1.email = GetRandomEmail(Assistant1.title);
	Assistant1.groupTitle = "Administration";
	rootItem.items.push(Assistant1);

	var Assistant21 = new primitives.orgdiagram.ItemConfig("Assistant 1", "Assistant 1 Description", "http://www.basicprimitives.com/demo/images/photos/y.png");
	Assistant21.itemType = primitives.orgdiagram.ItemType.Assistant;
	Assistant21.adviserPlacementType = primitives.orgdiagram.AdviserPlacementType.Right;
	Assistant21.phone = GetRandomPhone();
	Assistant21.email = GetRandomEmail(Assistant21.title);
	Assistant21.groupTitle = "Administration";
	Assistant1.items.push(Assistant21);

	var Assistant22 = new primitives.orgdiagram.ItemConfig("Assistant 2", "Assistant 2 Description", "http://www.basicprimitives.com/demo/images/photos/y.png");
	Assistant22.itemType = primitives.orgdiagram.ItemType.Regular;
	Assistant22.adviserPlacementType = primitives.orgdiagram.AdviserPlacementType.Right;
	Assistant22.phone = GetRandomPhone();
	Assistant22.email = GetRandomEmail(Assistant22.title);
	Assistant22.groupTitle = "Administration";
	Assistant1.items.push(Assistant22);

	var groups = { "E": 25, "V": 57, "U": 37, "O": 12, "P": 24, "L": 18 };
	for (var groupKey in groups) {
		var groupSize = groups[groupKey];
		var manager = new primitives.orgdiagram.ItemConfig("Manager " + groupKey, "Managers " + groupKey + " description ", "http://www.basicprimitives.com/demo/images/photos/" + groupKey.toLowerCase() + ".png");
		manager.email = GetRandomEmail(manager.title);
		manager.phone = GetRandomPhone();
		rootItem.items.push(manager);
		for (var index = 0; index < groupSize; index += 1) {
			var memberItem = new primitives.orgdiagram.ItemConfig(index.toString() + " member of " + groupKey, "Description of member" + index.toString(), "http://www.basicprimitives.com/demo/images/photos/" + groupKey.toLowerCase() + ".png");
			memberItem.email = GetRandomEmail(memberItem.title);
			memberItem.phone = GetRandomPhone();
			manager.items.push(memberItem);
		}
	}

	return rootItem;
}