require(["c1","c2"],
    function () {
        
        var ins = new Customer("saeid ghoreshi", 10);
        var name = ins.name;
        console.log("Customer name = " + name);

        
        var aniIns = new Animal("Deer", 150);
        var name = aniIns.name;
        console.log("animal name = " + name);
    }
    );