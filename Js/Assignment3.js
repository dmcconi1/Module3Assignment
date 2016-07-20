function MenuChoice(selection)
{
    
    document.getElementById("customerlist").style.visibility = "hidden";
    document.getElementById("currentorders").style.visibility = "hidden";
    document.getElementById("updateorders").style.visibility = "hidden";
    
    switch (selection)
    {
        case "customerlist":
            document.getElementById("customerlist").style.visibility = "visible";
            GetAllCustomers();
            break;
        case "currentorders":
            document.getElementById("currentorders").style.visibility = "visible";
            break;
        case "updateorders":
            document.getElementById("updateorders").style.visibility = "visible";
            break;
        case "None":
            break;
        default:
            alert("Please select a different menu option");
    }
}

function GetAllCustomers()
{
    var xmlhttp = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/GetAllCustomers";
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
        {
            var output = JSON.parse(xmlhttp.responseText);
            GenerateOutput(output);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    function GenerateOutput(result)
    {
            var display ="<table><tr><th></th><th>Customer ID</th><th>Customer Name</th><th>Customer City</th></tr>";
            var count = 0;
            var customername = "";
            var customerid = "";
            var customercity = "";
            for (count = 0; count < result.GetAllCustomersResult.length; count ++)
            {
               customerid = result.GetAllCustomersResult[count].CustomerID;
               customername = result.GetAllCustomersResult[count].CompanyName;
               customercity = result.GetAllCustomersResult[count].City;
                              
               display += '<tr><td><button onclick="CurrentOrders(' + "'" + customerid + "')" + '">Retrieve Order Info</button></td><td>' + customerid + "</td><td>" + customername + "</td><td>" + customercity + "</td></tr>"; 
            }
            display +="</table>";
            document.getElementById("customerinfo").innerHTML = display;
            
    }
}

function CurrentOrders(customerid)
{
    var xmlhttp = new XMLHttpRequest();
    var url= "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/GetOrdersForCustomer/";
    url += customerid;
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var output = JSON.parse(xmlhttp.responseText);
            GenerateOutput(output);
        }
    }       
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    
    function GenerateOutput(result)
    {
            var count = 0;            
            var display = customerid + "<table><thead> :Customer ID </thead><tr><th></th><th>Order ID</th><th>Shipping Address</th><th>Ship to City</th><th>Ship to Name</th><th>Shipping Post Code</th></tr>";
            for (count = 0; count < result.GetOrdersForCustomerResult.length; count++)
            {
               var orderid = result.GetOrdersForCustomerResult[count].OrderID;
               var shipaddress = result.GetOrdersForCustomerResult[count].ShipAddress;
               var shipcity = result.GetOrdersForCustomerResult[count].ShipCity;
               var shipname = result.GetOrdersForCustomerResult[count].ShipName;
               var shipzip = result.GetOrdersForCustomerResult[count].ShipPostcode;
                              
               display += '<tr><td><button onclick="OrderInfo(' + "'" + orderid + "')" + '">Update Order Info</button></td><td>' + orderid + "</td><td>" + shipaddress + "</td><td>"+ shipcity + "</td><td>"+ shipname+ "</td><td>" + shipzip + "</td></tr>";
            }
            display +="</table>";
            document.getElementById("customerorder").innerHTML = display;
            document.getElementById("customerid").value = customerid
            MenuChoice("currentorders");
            
    }
        
};


function CurrentOrdersbyInput(customerid)
{
    customerid = document.getElementById("customerid").value
    var xmlhttp = new XMLHttpRequest();
    var url= "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/GetOrdersForCustomer/";
    url += customerid;
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var output = JSON.parse(xmlhttp.responseText);
            GenerateOutput(output);
        }
    }       
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    
    function GenerateOutput(result)
    {
            var count = 0;            
            var display = customerid + "<table><thead> :Customer ID </thead><tr><th></th><th>Order ID</th><th>Shipping Address</th><th>Ship to City</th><th>Ship to Name</th><th>Shipping Post Code</th></tr>";
            for (count = 0; count < result.GetOrdersForCustomerResult.length; count++)
            {
               var orderid = result.GetOrdersForCustomerResult[count].OrderID;
               var shipaddress = result.GetOrdersForCustomerResult[count].ShipAddress;
               var shipcity = result.GetOrdersForCustomerResult[count].ShipCity;
               var shipname = result.GetOrdersForCustomerResult[count].ShipName;
               var shipzip = result.GetOrdersForCustomerResult[count].ShipPostcode;
                              
               display += '<tr><td><button onclick="OrderInfo(' + "'" + orderid + "')" + '">Update Order Info</button></td><td>' + orderid + "</td><td>" + shipaddress + "</td><td>"+ shipcity + "</td><td>"+ shipname+ "</td><td>" + shipzip + "</td></tr>";
            }
            display +="</table>";
            document.getElementById("customerorder").innerHTML = display;
            MenuChoice("currentorders");
            
    }
        
};


function OrderInfo(orderid)
{
    var xmlhttp = new XMLHttpRequest();
        var url= "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getCustomerOrderInfo/";
        url += orderid;
        
        xmlhttp.onreadystatechange = function()
        {
            if (xmlhttp.readyState ==4 && xmlhttp.status==200)
            {
                var output = JSON.parse(xmlhttp.responseText);
                document.getElementById("orderId").value = output[0].OrderID;
                document.getElementById("shipAddress").value = output[0].ShipAddress;
                document.getElementById("shipCity").value = output[0].ShipCity;
                document.getElementById("shipName").value = output[0].ShipName
                document.getElementById("shipZip").value = output[0].ShipPostcode;
                MenuChoice("updateorders");
            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
        
}

function UpdateOrder()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function()
    {
        if(xmlhttp.readyState ==4 && xmlhttp.status == 200)
        {
            var result = JSON.parse(xmlhttp.responseText);
            OperationResult(result);
            MenuChoice("currentorders");
        }
    }
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/UpdateOrderAddress";
    var orderid = Number(document.getElementById("orderId").value)
    var shipaddress = document.getElementById("shipAddress").value;
    var shipcity = document.getElementById("shipCity").value;
    var shipname = document.getElementById("shipName").value;
    var shipzip = document.getElementById("shipZip").value;
    
    var parameters = '{"OrderID":' + orderid + ',"ShipAddress":"' + shipaddress + '", "ShipCity":"' + shipcity + '", "ShipName":"' + shipname + '", "ShipPostcode":"' + shipzip + '"}';
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(parameters);
}

function OperationResult(success, exception)
{
    switch (success)
    {
        case 1:
            alert("The operation was successful");
            CurrentOrdersbyInput(customerid);
            break;
        case 0:
            alert("The operation was not successful:/" + exception);
            break;
        case -2:
            alert("The operation was not successful because the data string supplied could not be deserialized into the service object.");
            break;
        case -3:
            alert("The operation was not successful because a recod with the supplied Order ID could not be found.");
            break;
        default:
            alert("The operation code returned is not identifiable.");
    }
}