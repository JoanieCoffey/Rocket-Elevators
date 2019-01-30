$("#residential").show();
$("#commercial").hide();
$("#corporative").hide();
$("#hybrid").hide();

price();

$("#buildingType").change(function() {
    var index = this.selectedIndex;
    if (index === 0)
    {
        // Show Residential
        $("#residential").show();
        $("#commercial").hide();
        $("#corporative").hide();
        $("#hybrid").hide();
    }
    else if (index === 1)
    {
        // Show Commercial
        $("#residential").hide();
        $("#commercial").show();
        $("#corporative").hide();
        $("#hybrid").hide();
    }
    else if (index === 2)
    {
        // Show Corporative
        $("#residential").hide();
        $("#commercial").hide();
        $("#corporative").show();
        $("#hybrid").hide();
    }
    else if (index === 3)
    {
        // Show Hybrid
        $("#residential").hide();
        $("#commercial").hide();
        $("#corporative").hide();
        $("#hybrid").show();
    }
});

$("#residential input").change(function() {
    residential();
    price();
});

$("#commercial input").change(function() {
    commercial();
    price();
});

$("#corporative input").change(function() {
    corporative();
    price();
});

$("#hybrid input").change(function() {
    hybrid();
    price();
});

$("input[type=radio][name=elevatorType]").change(function() {
    price();
});

function residential()
{
    var appartementNumber = $("#residential #appartementNumber").val();
    var floorNumber = $("#residential #floorNumber").val();

    // Combien d'appartements par étage en moyenne
    var averageAppartementPerFloor = Math.ceil(appartementNumber / floorNumber);

    // Tout les 6 appartements : 1 cage d'ascenceur
    var elevatorToDeployNumber = Math.ceil(averageAppartementPerFloor / 6);

    // Si il y'a plus de 20 étages, doubler le nombre de cage d'ascenceur
    if (floorNumber > 20)
    {
        elevatorToDeployNumber = elevatorToDeployNumber * 2;
    }

    $("#estimatedElevatorToDeploy").val(elevatorToDeployNumber);
}

function commercial()
{
    // Le nombre de cage d'ascenceur estimé est simplement le même que ce que la personne a écrit.
    var elevatorToDeployNumber = $("#commercial #elevatorToDeployNumber").val();
    $("#estimatedElevatorToDeploy").val(elevatorToDeployNumber);
}

    //  		occupantNumber * (floorNumber + basementNumber) = occupantNumberTotal
    //          estimatedElevatorToDeply =  occupantNumberTotal / 1000
    //          (floorNumber + basementNumber) /20 = requiredColum 
    //            estimatedElevatorToDeploy = elevatorToDeploy / RequiredColum


function corporative()
{
    var occupantNumber = $("#corporative #occupantNumber").val();
    var floorNumber = $("#corporative #floorNumber").val();
    var basementNumber =$("#corporative #basementNumber").val();

    // On multiplie le nombre d’occupants maximum par étage par le nombre d’étages (incluant le nombre de sous-sols) pour obtenir le nombre d’occupants total.
    var occupantNumberTotal = (parseInt(basementNumber) + parseInt(floorNumber)) * occupantNumber

    // Le nombre d'ascenseurs requis est déterminé par le nombre d’occupants divisé par 1000.
    var elevatorToDeployNumber = Math.ceil (occupantNumberTotal / 1000)

    // On divise le nombre d’étages (incluant le nombre de sous-sols) par 20 pour obtenir le nombre de colonnes
    var requiredColumn = Math.ceil ((parseInt(basementNumber) + parseInt(floorNumber)) / 20)

    // Le nombre d'ascenseurs requis est déterminé par le nombre d'ascenseurs *DIVISÉ* par le nombre de colonnes. 
    var something = Math.ceil (elevatorToDeployNumber / requiredColumn)
    var estimatedElevatorToDeploy = requiredColumn * something

    
    $("#estimatedElevatorToDeploy").val(estimatedElevatorToDeploy);
}

function hybrid()
{
    var occupantNumber = $("#hybrid #occupantNumber").val();
    var floorNumber = $("#hybrid #floorNumber").val();
    var basementNumber =$("#hybrid #basementNumber").val();

    // On multiplie le nombre d’occupants maximum par étage par le nombre d’étages (incluant le nombre de sous-sols) pour obtenir le nombre d’occupants total.
    var occupantNumberTotal = (parseInt(basementNumber) + parseInt(floorNumber)) * occupantNumber
    console.log(occupantNumberTotal);
    // Le nombre d'ascenseurs requis est déterminé par le nombre d’occupants divisé par 1000.
    var elevatorToDeployNumber = Math.ceil (occupantNumberTotal / 1000)

    // On divise le nombre d’étages (incluant le nombre de sous-sols) par 20 pour obtenir le nombre de colonnes
    var requiredColumn = Math.ceil ((parseInt(basementNumber) + parseInt(floorNumber)) / 20)

    // Le nombre d'ascenseurs requis est déterminé par le nombre d'ascenseurs *DIVISÉ* par le nombre de colonnes. 
    var something = Math.ceil (elevatorToDeployNumber / requiredColumn)
    console.log(requiredColumn);
    var estimatedElevatorToDeploy = requiredColumn * something
    console.log(requiredColumn);

    $("#estimatedElevatorToDeploy").val(estimatedElevatorToDeploy);
}

function price()
{
    var estimatedElevatorToDeploy = $("#estimatedElevatorToDeploy").val();
    var elevatorType = $('input[name=elevatorType]:checked').val();

    if (elevatorType === "standard")
    {
        var unitPrice = 7565;
        var installationPercent = 10;
    }
    else if (elevatorType === "premium")
    {
        var unitPrice = 12345;
        var installationPercent = 13;
    }
    else if (elevatorType === "excelium")
    {
        var unitPrice = 15400;
        var installationPercent = 16;
    }

    var elevatorPrice = unitPrice * estimatedElevatorToDeploy;
    var installationPrice = (elevatorPrice * installationPercent) / 100;
    var totalPrice = elevatorPrice + installationPrice;

    $("#elevatorsPrice").val(elevatorPrice.toFixed(2) + ' $');
    $("#installationPrice").val(installationPrice.toFixed(2) + ' $');
    $("#totalPrice").val(totalPrice.toFixed(2) + ' $');
}